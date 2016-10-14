"use strict";

const async = require("async");
const BattleNet = require("battlenet-api");
const plugins = require.main.require("./src/plugins");
const privileges = require.main.require("./src/privileges");
const db = require.main.require("./src/database");
const meta = require.main.require("./src/meta");
const websockets = require.main.require('./src/socket.io/index').server.sockets;
const Application = {};


Application.getQuestions = (callback) => {
  async.waterfall([
    (next) => {
      db.getSortedSetRevRange("mnl:questions:qid", 0, -1, next);
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
        uid: uid,
        active: 0,
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
          websockets.in("admin").emit('event:mnl.application.question.created', questionData);
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
        uid: uid,
        active: data.active || 0,
        deleted: data.deleted || 0
      };
      db.setObject("mnl:question:" + questionData.qid, questionData, next);
    },
    (next) => {
      async.parallel([
        (next) => {
          websockets.in("admin").emit('event:mnl.application.question.updated', questionData);
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


module.exports = Application;
