
var TicketSocket = require("./tickets");
var Roster = require("../roster");
var MoonlightSocket = {};

MoonlightSocket.tickets = TicketSocket;

MoonlightSocket.roster = {
    update: (socket, data, callback) => {      
        return Roster.updateRoster(socket.uid, callback);
    }
};

module.exports = MoonlightSocket;