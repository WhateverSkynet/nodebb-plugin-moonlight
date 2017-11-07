"use strict";

const async = require("async");
const request = require('request');
const BattleNet = require("battlenet-api");
const plugins = require.main.require("./src/plugins");
const privileges = require.main.require("./src/privileges");
const db = require.main.require("./src/database");
const meta = require.main.require("./src/meta");
const websockets = require.main.require('./src/socket.io');
const groups = require.main.require('./src/groups');
const notifications = require.main.require('./src/notifications');
const user = require.main.require('./src/user');
const _ = require("lodash");
const { triggerApplicationSubmitted, triggerNewReplyFromApplicant } = require('./webhooks')

const Application = {};

const isOfficer = (uid, callback) => {
  if (Array.isArray(uid)) {
    groups.isMembers(uid, 'officers', callback);
  } else {
    groups.isMember(uid, 'officers', callback);
  }
};

const isRaider = (uid, callback) => {
  if (Array.isArray(uid)) {
    groups.isMembers(uid, 'raiders', callback);
  } else {
    groups.isMember(uid, 'raiders', callback);
  }
};

const isTrial = (uid, callback) => {
  if (Array.isArray(uid)) {
    groups.isMembers(uid, 'trials', callback);
  } else {
    groups.isMember(uid, 'trials', callback);
  }
};


const getMemberships = (uid, callback) => {
  async.series({
    isAdmin: (next) => {
      privileges.users.isAdministrator(uid, next);
    },
    isOfficer: (next) => {
      isOfficer(uid, next);
    },
    isRaider: (next) => {
      isRaider(uid, next);
    },
    isTrial: (next) => {
      isTrial(uid, next);
    },
  }, (err, membership) => {
    if (err) {
      callback(err)
    } else {
      Object.defineProperty(membership, "isMember", {
        get: () => {
          return membership.isRaider || membership.isOfficer;
        }
      })
      callback(null, membership);
    }
  });
};

Application.getQuestions = (callback) => {
  let templateQids;
  async.waterfall([
    (next) => {
      Application.getTemplateQuestions(next)
    },
    (qids, next) => {
      templateQids = qids;
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
      callback(null, result.map(q => {
        const qid = parseInt(q.qid, 10);
        return {
          qid,
          changed: parseInt(q.changed, 10),
          text: q.text,
          uid: parseInt(q.uid, 10),
          active: templateQids.indexOf(qid) !== -1,
          deleted: parseInt(q.deleted, 10)
        };
      }));
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
      db.getObjectFields("mnl:questions:template", ["qids"], next);
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
        characters: [{ guid: 0 }],
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
  async.waterfall([
    (next) => async.series({
      apps: (next) => {
        let apps;
        let uids;
        async.waterfall([
          (next) => {
            const keys = ids.map(id => "mnl:application:" + id);
            db.getObjects(keys, next);
          },
          (data, next) => {
            if (!data || !data.length || !data[0]) {
              return next(new Error("Not found!"));
            }
            apps = data.map(app => {
              app.questions = JSON.parse(app.questions);
              app.characters = JSON.parse(app.characters);
              app.status = parseInt(app.status, 10);
              app.appId = parseInt(app.appId, 10);
              app.uid = parseInt(app.uid, 10);
              app.deleted = parseInt(app.deleted, 10);
              app.changed = parseInt(app.changed, 10);
              app.submitted = parseInt(app.submitted, 10);
              return app;
            }).filter(app => app.deleted === 0);;
            uids = Object.keys(_.groupBy(apps, app => app.uid)).map(uid => parseInt(uid, 10));
            user.getUsersFields(uids, ['uid', 'username'], next);
          },
          (users, next) => {
            for (let app of apps) {
              const index = uids.indexOf(app.uid);
              app.author = users[index].username;
            }
            next(null, apps);
          }
        ], next);

      },
      replies: (next) => {
        let replies;
        let uids;
        async.waterfall([
          (next) => {
            db.getSortedSetRange("mnl:applications:replyid", 0, -1, next);
          },
          (replyIds, next) => {
            if (!Array.isArray(replyIds) || !replyIds.length) {
              next(null, []);
            } else {
              db.getObjects(replyIds.map(id => "mnl:application:reply:" + id), next);
            }
          },
          (data, next) => {
            replies = data

            uids = Object.keys(_.groupBy(replies, reply => reply.uid));
            user.getUsersFields(uids, ['uid', 'username'], next);
          },
          (users, next) => {
            for (let reply of replies) {
              const index = uids.indexOf(reply.uid);
              reply.author = users[index].username;
              reply.id = parseInt(reply.id, 10);
              reply.uid = parseInt(reply.uid, 10);
              reply.appId = parseInt(reply.appId, 10);
              reply.isApplicant = reply.isApplicant ? JSON.parse(reply.isApplicant) : false;
              if (reply.timestamp) {
                reply.timestamp = parseInt(reply.timestamp, 10);
              }
            }
            next(null, replies);
          }
        ], next);
      }
    }, next),
    (data, next) => {
      const repliesByAppId = _.groupBy(data.replies, reply => reply.appId);
      for (let app of data.apps) {
        if (!app) {
          continue;
        }
        app.replies = repliesByAppId[app.appId] || [];
      }
      next(null, data.apps);
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
  let hasAccesByGroup;
  let auth;
  async.waterfall([
    (next) => {
      getMemberships(uid, next);
    },
    (membership, next) => {
      auth = membership;
      hasAccesByGroup = membership.isMember || membership.isAdmin;
      next(null);
    },
    (next) => {
      db.isSortedSetMember("uid:" + uid + ":mnl:appid", appId, next);
    },
    (isAuthor, next) => {
      auth.isAuthor = isAuthor;
      if (hasAccesByGroup || isAuthor) {
        getApplications([appId], next);
      } else {
        next(new Error("Unauthorized."));
      }
    },
    (apps, next) => {
      if (!apps || apps.length == 0) {
        return next(new Error("Not Found."));
      }
      const application = apps[0];
      let actions = [];
      if (application.status !== 0) {
        if (auth.isOfficer) {
          actions = ["REPLY", "SCHEDULE_INTERVIEW", "ACCEPT", "DECLINE", "WITHDRAW"];
        } else if (auth.isAuthor && [3, 6].indexOf(application.status) === -1) {
          actions = ["REPLY", "WITHDRAW"];
        }
      }

      next(null, {
        application,
        actions
      })
    }
  ], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};


Application.getApplications = (uid, callback) => {
  let auth;
  async.waterfall([
    (next) => {
      getMemberships(uid, next);
    },
    (membership, next) => {
      auth = membership;
      if (membership.isMember || membership.isAdmin) {
        db.getSortedSetRevRange("mnl:applications:appid", 0, -1, next);
      } else {
        db.getSortedSetRevRange("uid:" + uid + ":mnl:appid", 0, -1, next);
      }
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
      // Only Officers can see drafts.
      callback(null, {
        applications: !auth.isOfficer ? result.filter(app => app.status !== 0 || app.uid === uid) : result
      });
    }
  });
};

Application.getApplicationTemplate = (uid, callback) => {
  async.waterfall([
    (next) => {
      getMemberships(uid, next);
    },
    (membership, next) => {
      if (membership.isMember || membership.isTrial) {
        return next(new Error("Is Member."));
      }
      next(null);
    },
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
          const sets = [
            "mnl:applications:appid",
            "mnl:applications:status:" + status,
            "uid:" + uid + ":mnl:appid",
          ]
          if (draft) {
            sets.push(`uid:${uid}:mnl:app:draftid`);
          }

          db.sortedSetsAdd(sets, timestamp, appData.appId, next);
        },
        (next) => {
          //      websockets.in("mnl.admin").emit('event:mnl.application.question.created', appData);
          next(null);
        },
        next => {
          if (draft) {
            return next();
          }
          triggerApplicationSubmitted(uid, appData.appId, next)
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
  const { appId } = data;
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
          db.setObjectField("mnl:application:" + data.appId, "submitted", timestamp, next);
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
        },
        (next) => {
          notifications.create({
            bodyShort: "New " + data.characters[0].class + " application.",
            appId: data.appId,
            path: '/application/' + data.appId,
            nid: 'appid:' + data.appId + ':uid:' + uid,
            from: uid
          }, (err, notification) => {
            async.parallel([
              (next) => {
                notifications.pushGroup(notification, "raiders", next);
              },
              (next) => {
                notifications.pushGroup(notification, "officers", next);
              },
            ], next)
          });
        },
        next => {
          triggerApplicationSubmitted(uid, appId, next)
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

Application.deleteApplication = (uid, appId, callback) => {
  async.waterfall([
    (next) => {
      privileges.users.isAdministrator(uid, next);
    },
    (isAdmin, next) => {
      if (!isAdmin) {
        return next(new Error("Unauthorized."));
      }
      next(null);
    },
    (next) => {
      async.parallel([
        (next) => {
          db.setObjectField("mnl:application:" + appId, "deleted", 1, next);
        }
      ], next);
    },
  ], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, {
        appId
      });
    }
  });
};


const createReply = (uid, appId, message, timestamp, isApplicant, callback) => {
  let reply;
  async.waterfall([
    (next) => {
      db.incrObjectField("mnl:global", "nextAppReplyId", next);
    },
    (id, next) => {
      reply = {
        id,
        uid,
        appId,
        message,
        timestamp,
        isApplicant
      };
      db.setObject("mnl:application:reply:" + reply.id, reply, next);
    },
    (next) => {
      async.parallel([
        (next) => {
          db.sortedSetsAdd([
            "mnl:applications:replyid",
            "mnl:applications:" + reply.appId + ":replyid",
            "uid:" + uid + ":mnl:replyid",
          ], timestamp, reply.id, next);
        },
        (next) => {
          if (isApplicant) {
            triggerNewReplyFromApplicant(uid, appId, message, next)
          } else {
            next();
          }
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
      callback(null, result);
    }
  });
};

const canChangeStatus = (auth, status) => {
  if (auth.isOfficer) {
    return true;
  }
  // Applicants can only withdraw application.
  if (auth.isApplicant && status === 3) {
    return true;
  }
  return false;
};

Application.createReply = (uid, data, callback) => {
  const message = data.message;
  let auth;
  const timestamp = Date.now();
  let application;
  async.waterfall([
    (next) => {
      async.series({
        isOfficer: (next) => {
          isOfficer(uid, next);
        },
        isApplicant: (next) => {
          db.getObjectField("mnl:application:" + data.appId, "uid", (err, authorId) => {
            authorId = parseInt(authorId, 10);
            next(err, authorId === uid)
          });
        }
      }, next);
    },
    (authData, next) => {
      auth = authData;
      if (!auth.isOfficer && !auth.isApplicant) {
        return next(new Error("Unauthorized."));
      } else {
        next(null);
      }
    },
    (next) => {
      db.getObjectFields("mnl:application:" + data.appId, ["status", "uid"], (err, app) => {
        next(err, {
          status: parseInt(app.status, 10),
          uid: parseInt(app.uid, 10)
        });
      });
    },
    (app, next) => {
      application = app;
      if (data.status && application.status !== data.status) {
        if (!canChangeStatus(auth, data.status)) {
          return next(new Error("Unauthorized."));
        }
        async.parallel([
          (next) => {
            if (data.status === 5) {
              groups.join("trials", app.uid, next);
            } else {
              next(null);
            }
          },
          (next) => {
            db.setObjectField("mnl:application:" + data.appId, "status", data.status, next);
          },
          (next) => {
            db.sortedSetsRemove([
              "mnl:applications:status:" + application.status
            ], data.appId, next);
          },
          (next) => {
            db.sortedSetsAdd([
              "mnl:applications:status:" + data.status
            ], data.appId, timestamp, next);
          }
        ], next);
      } else {
        next(null);
      }
    },
    (next) => {
      createReply(uid, data.appId, message, timestamp, uid === application.uid, callback);
    },
  ], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

module.exports = Application;
