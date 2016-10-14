'use strict';
var TicketSocket = require("./tickets");
var Roster = require("../roster");
var Recruitment = require("../recruitment");
var MoonlightSocket = {};

MoonlightSocket.tickets = TicketSocket;

MoonlightSocket.roster = {
    update: (socket, data, callback) => {
        return Roster.updateRoster(socket.uid, callback);
    }
};

MoonlightSocket.recruitment = {
    set: (socket, data, callback) => {
        return Recruitment.set(socket.uid, data.values, callback);
    }
}

module.exports = MoonlightSocket;