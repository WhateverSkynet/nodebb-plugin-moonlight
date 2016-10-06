
var async = require('async');
var plugins = require.main.require('./src/plugins');
var db = require.main.require('./src/database');


var Tickets = require("../tickets/index");

var TicketSocket = {}

var test = function (uid, characters, questions, callback) {
  // This is an internal method, consider using Topics.post instead
		var timestamp = Date.now();
		var ticketData;

		async.waterfall([
    function (next) {
      db.incrObjectField('global', 'nextTicketId', next);
    },
    function (tid, next) {
      ticketData = {
        'tid': tid,
        'uid': uid,
        'type': "application",
        'mainPid': 0,
        // 'slug': tid + '/' + (utils.slugify(mainCharacter.class) || 'ticket'),
        'submitted': timestamp,
        'status': "new",
        'characters': JSON.stringify(characters),
        'questions': JSON.stringify(questions)
      };

      // if (data.thumb) {
      //   topicData.thumb = data.thumb;
      // }

       plugins.fireHook('filter:ticket.create', { ticket: ticketData }, next);
    },
    function (data, next) {
      ticketData = data.ticket;
      db.setObject('ticket:' + ticketData.tid, ticketData, next);
    },
    function (next) {
      async.parallel([
        // function (next) {
        //   db.sortedSetsAdd([
        //     'topics:tid',
        //     'cid:' + topicData.cid + ':tids',
        //     'cid:' + topicData.cid + ':uid:' + topicData.uid + ':tids'
        //   ], timestamp, topicData.tid, next);
        // },
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
};

TicketSocket.create = function (socket, data, callback) {
  test(socket.uid,  data.characters, data.questions, function(err){
    console.log(err);
    callback(null, "It worked!");
  });
  console.log("Working?");
  console.log(data);
 // callback(null, "It worked!");
}



module.exports = TicketSocket;