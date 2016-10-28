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
      db.getObjectsFields(keys, ["qid", "text", "value"], next);
    }
  ], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, {
        appId: -1,
        characters: [{guid: 0}],
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

const getApplications = (ids, callback) => {
  const keys = ids.map(id => "mnl:application:" + id);
  async.waterfall([
    (next) => {
      db.getObjects(keys, next);
    },
    (apps, next) => {
      for (let app of apps) {
        if (!app) {
          continue;
        }
        app.questions = JSON.parse(app.questions);
        app.characters = JSON.parse(app.characters);
      }
      next(null, apps);
    }
  ], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

Application.getApplication = (uid, appId, callback) => {
  async.waterfall([
    (next) => {
      getApplications([appId], next);
    },
  ], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, {
        application: result[0]
      });
    }
  });
};


Application.getApplications = (uid, callback) => {
  async.waterfall([
    (next) => {
      db.getSortedSetRevRange("mnl:applications:appid", 0, -1, next);
    },
    (appIds, next) => {
      if (!Array.isArray(appIds) || !appIds.length) {
        next(null, []);
      } else {
        getApplications(appIds, next);
      }
    },
  ], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, {
        applications: result
      });
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

// Application statuses 
// 0 draft
// 1 new
// 2 pending
// 3 withdrawn
// 4 interview
// 5 accepted
// 6 declined

const createApplication = (uid, data, draft, callback) => {
  const timestamp = data.timestamp || Date.now();
  const status = draft ? 0 : 1;
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
        status,
        deleted: 0
      };
      db.setObject("mnl:application:" + appData.appId, appData, next);
    },
    (next) => {
      async.parallel([
        (next) => {
          db.sortedSetsAdd([
            "mnl:applications:appid",
            "mnl:applications:status:" + status,
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

const submitApp = (uid, data, callback) => {
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
        },
        (next) => {
          db.setObjectField("mnl:application:" + data.appId, "status", 1, next);
        },
        (next) => {
          db.sortedSetsRemove([
            "uid:" + uid + ":mnl:app:draftid",
            "mnl:applications:status:0"
          ], data.appId, next);
        },
        (next) => {
          db.sortedSetsAdd([
            "mnl:applications:status:1"
          ], data.appId, timestamp, next);
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

Application.saveApplication = (uid, data, draft, callback) => {
  const timestamp = data.timestamp || Date.now();
  let appData;
  if (!data.characters || !data.questions) {
    return callback(new Error("Bad data."));
  }
  if (!data.appId || data.appId === -1) {
    return createApplication(uid, data, draft, callback);
  } else if (draft) {
    return updateDraft(uid, data, callback);
  } else {
    return submitApp(uid, data, callback)
  }
};


module.exports = Application;
