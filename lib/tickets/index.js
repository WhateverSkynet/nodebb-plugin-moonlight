'use strict';
var async = require('async');
var plugins = require.main.require('./src/plugins');
var db = require.main.require('./src/database');
var Tickets = {};


Tickets.createApplication = function (uid, characters, questions, callback) {
  // This is an internal method, consider using Topics.post instead
		var timestamp = Date.now();
		var ticketData;
    console.log(characters, questions);
		async.waterfall([
    function (next) {
      db.incrObjectField('global', 'nextTicketId', next);
    },
    function (tid, next) {
      ticketData = {
        'tid': tid,
        'uid': uid,
        'type': 0,
      //  'mainPid': 0,
      //  'title': data.title,
      //  'slug': tid + '/' + (utils.slugify(mainCharacter.class) || 'topic'),
        'submitted': timestamp,
        'status': 0,
        'characters': JSON.stringify(characters),
        'questions': JSON.stringify(questions)
      };

      // if (data.thumb) {
      //   topicData.thumb = data.thumb;
      // }

      // plugins.fireHook('filter:topic.create', { topic: topicData }, next);
    },
    function (data, next) {
      ticketData = data.topic;
      db.setObject('ticket:' + ticketData.tid, ticketData, next);
    },
    function (next) {
      async.parallel([
        function (next) {
          db.sortedSetsAdd([
            'tickets:ticketId',
            'ticketType:' + ticketData.type + ':ticketId',
            'ticketStatus:' + ticketData.status + ':ticketId',
            'uid:' + ticketData.uid + ':ticketId'
          ], timestamp, ticketData.tid, next);
        },
        // function (next) {
        //   user.addTopicIdToUser(topicData.uid, topicData.tid, timestamp, next);
        // },
        // function (next) {
        //   db.incrObjectField('category:' + topicData.cid, 'topic_count', next);
        // },
        // function (next) {
        //   db.incrObjectField('global', 'topicCount', next);
        // },
        // function (next) {
        //   Topics.createTags(data.tags, topicData.tid, timestamp, next);
        // }
      ], next);
    },
    function (results, next) {
      plugins.fireHook('action:ticket.save', ticketData);
      next(null, ticketData.tid);
    }
		], callback);
}


module.exports = Tickets;