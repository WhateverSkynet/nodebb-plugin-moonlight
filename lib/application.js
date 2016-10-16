"use strict";

const async = require("async");
const BattleNet = require("battlenet-api");
const plugins = require.main.require("./src/plugins");
const privileges = require.main.require("./src/privileges");
const db = require.main.require("./src/database");
const meta = require.main.require("./src/meta");
const websockets = require.main.require('./src/socket.io');
const Application = {};


Application.getQuestions = (callback) => {
  async.waterfall([
    (next) => {
      db.getSortedSetRange("mnl:questions:qid", 0, -1, next);
    },
    (qids, next) => {
      if (!Array.isArray(qids) || !qids.length) {
        return next(null, []);
      }
      const keys = qids.map(function (quid) {
        return 'mnl:question:' + quid;
      });
      db.getObjectsFields(keys, ["qid", "text", "changed", "active"], next);
    }
  ], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

Application.createQuestion = (uid, data, callback) => {
  const timestamp = data.timestamp || Date.now();
  let questionData;
  async.waterfall([
    (next) => {
      privileges.users.isAdministrator(uid, next);
    },
    (isAdmin, next) => {
      if (isAdmin) {
        db.incrObjectField("mnl:global", "nextQid", next);
      } else {
        next(new Error("Unauthorized"));
      }
    },
    (qid, next) => {
      questionData = {
        qid,
        changed: timestamp,
        text: data.text,
        uid,
        active: -1,
        deleted: 0
      };
      db.setObject("mnl:question:" + questionData.qid, questionData, next);
    },
    (next) => {
      async.parallel([
        (next) => {
          db.sortedSetsAdd([
            "mnl:questions:qid",
          ], timestamp, questionData.qid, next);
        },
        (next) => {
          websockets.in("mnl.admin").emit('event:mnl.application.question.created', questionData);
          next(null);
        }
      ], next);
    },

  ], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, questionData);
    }
  });
};

Application.updateQuestion = (uid, data, callback) => {
  const timestamp = data.timestamp || Date.now();
  let questionData;
  async.waterfall([
    (next) => {
      privileges.users.isAdministrator(uid, next);
    },
    (isAdmin, next) => {
      if (isAdmin) {
        next(null);
      } else {
        next(new Error("Unauthorized"));
      }
    },
    (next) => {
      questionData = {
        qid: data.qid,
        changed: timestamp,
        text: data.text,
        uid,
        active: data.active >= 0 ? data.active : -1,
        deleted: data.deleted || 0
      };
      db.setObject("mnl:question:" + questionData.qid, questionData, next);
    },
    (next) => {
      async.parallel([
        (next) => {
          next(null);
        },
        (next) => {
          websockets.in("mnl.admin").emit('event:mnl.application.question.updated', questionData);
          next(null);
        }
      ], next);
    },

  ], (err, result) => {
    console.log(err);
    if (err) {
      callback(err);
    } else {
      callback(null, questionData);
    }
  });
};

Application.getTemplateQuestions = (callback) => {
  async.waterfall([
    (next) => {
      db.getObjectFields("mnl:questions:template", ["qids", "changed"], next);
    }
  ], (err, result) => {
    if (err) {
      callback(err);
    } else {
      if (result.qids) {
        result.qids = JSON.parse(result.qids);
      }
      callback(null, result.qids || []);
    }
  });
};

Application.updateTemplateQuestions = (uid, data, callback) => {
  const timestamp = data.timestamp || Date.now();
  let questionData;
  async.waterfall([
    (next) => {
      privileges.users.isAdministrator(uid, next);
    },
    (isAdmin, next) => {
      if (isAdmin) {
        next(null);
      } else {
        next(new Error("Unauthorized"));
      }
    },
    (next) => {
      questionData = {
        qids: JSON.stringify(data),
        changed: timestamp,
        uid
      };
      db.setObject("mnl:questions:template", questionData, next);
    },
    (next) => {
      async.parallel([
        (next) => {
          next(null);
        },
        (next) => {
          websockets.in("mnl.admin").emit('event:mnl.application.template.updated', data);
          next(null);
        }
      ], next);
    },

  ], (err, result) => {
    console.log(err);
    if (err) {
      callback(err);
    } else {
      callback(null, data || []);
    }
  });
};

const createNewTemplate = (callback) => {
  async.waterfall([
    (next) => {
      db.getObjectFields("mnl:questions:template", ["qids"], next);
    },
    (template, next) => {
      const qids = template.qids ? JSON.parse(template.qids) : [];
      if (!Array.isArray(qids) || !qids.length) {
        return next(null, []);
      }
      const keys = qids.map(function (quid) {
        return 'mnl:question:' + quid;
      });
      db.getObjectsFields(keys, ["qid", "text"], next);
    }
  ], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, {
        questions: result
      });
    }
  });
};

const getDraft = (appId, callback) => {
  async.waterfall([
    (next) => {
      db.getObject("mnl:application:" + appId, next);
    },
    (draft, next) => {
      draft.questions = JSON.parse(draft.questions);
      draft.characters = JSON.parse(draft.characters);
      console.log(draft);
      next(null, draft);
    }
  ], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

Application.getApplicationTemplate = (uid, callback) => {
  async.waterfall([
    (next) => {
      db.getSortedSetRevRange("uid:" + uid + ":mnl:app:draftid", 0, -1, next);
    },
    (appIds, next) => {
      if (!Array.isArray(appIds) || !appIds.length) {
        createNewTemplate(next);
      } else {
        getDraft(appIds[0], next);
      }
    },
  ], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const createApplication = (uid, data, callback) => {
  const timestamp = data.timestamp || Date.now();
  let appData;
  async.waterfall([
    (next) => {
      db.incrObjectField("mnl:global", "nextAppId", next);
    },
    (appId, next) => {
      appData = {
        appId,
        changed: timestamp,
        characters: JSON.stringify(data.characters),
        questions: JSON.stringify(data.questions),
        uid,
        status: 0,
        deleted: 0
      };
      db.setObject("mnl:application:" + appData.appId, appData, next);
    },
    (next) => {
      async.parallel([
        (next) => {
          db.sortedSetsAdd([
            "mnl:applications:appid",
            "uid:" + uid + ":mnl:appid",
            "uid:" + uid + ":mnl:app:draftid"
          ], timestamp, appData.appId, next);
        },
        (next) => {
          //      websockets.in("mnl.admin").emit('event:mnl.application.question.created', appData);
          next(null);
        }
      ], next);
    },

  ], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, appData);
    }
  });
};

const updateDraft = (uid, data, callback) => {
  const timestamp = data.timestamp || Date.now();
  async.waterfall([
    (next) => {
      db.isSortedSetMember("uid:" + uid + ":mnl:app:draftid", data.appId, next);
    },
    (hasValidDraft, next) => {
      if (!hasValidDraft) {
        return next(new Error("No drafts for user."));
      }

      next(null);
    },
    (next) => {
      async.parallel([
        (next) => {
          db.setObjectField("mnl:application:" + data.appId, "changed", timestamp, next);
        },
        (next) => {
          db.setObjectField("mnl:application:" + data.appId, "characters", JSON.stringify(data.characters), next);
        },
        (next) => {
          db.setObjectField("mnl:application:" + data.appId, "questions", JSON.stringify(data.questions), next);
        }
      ], next);
    },
  ], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

Application.saveApplication = (uid, data, callback) => {
  const timestamp = data.timestamp || Date.now();
  let appData;
  if (!data.characters || !data.questions) {
    return callback(new Error("Bad data."));
  }
  if (!data.appId) {
    return createApplication(uid, data, callback);
  } else {
    return updateDraft(uid, data, callback);
  }
  async.waterfall([
    (next) => {
      privileges.users.isAdministrator(uid, next);
    },
    (isAdmin, next) => {
      if (isAdmin) {
        db.incrObjectField("mnl:global", "nextAppId", next);
      } else {
        next(new Error("Unauthorized"));
      }
    },
    (appId, next) => {
      appData = {
        appId,
        changed: timestamp,
        text: data.text,
        uid,
        questions,
        status: 0,
        deleted: 0
      };
      db.setObject("mnl:question:" + appData.qid, appData, next);
    },
    (next) => {
      async.parallel([
        (next) => {
          db.sortedSetsAdd([
            "mnl:questions:qid",
          ], timestamp, appData.qid, next);
        },
        (next) => {
          // websockets.in("mnl.admin").emit('event:mnl.application.question.created', appData);
          next(null);
        }
      ], next);
    },

  ], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, appData);
    }
  });
};


module.exports = Application;
