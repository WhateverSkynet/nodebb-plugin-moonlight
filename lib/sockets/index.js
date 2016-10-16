'use strict';
var TicketSocket = require("./tickets");
var Roster = require("../roster");
var Recruitment = require("../recruitment");
var Application = require("../application");
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

MoonlightSocket.application = {
  getQuestions: (socket, data, callback) => {
    return Application.getQuestions(callback);
  },
  createQuestion: (socket, data, callback) => {
    return Application.createQuestion(socket.uid, data, callback);
  },
  updateQuestion: (socket, data, callback) => {
    return Application.updateQuestion(socket.uid, data, callback);
  },
  getTemplateQuestions: (socket, data, callback) => {
    return Application.getTemplateQuestions(callback);
  },
  updateTemplateQuestions: (socket, data, callback) => {
    return Application.updateTemplateQuestions(socket.uid, data, callback);
  },
  getApplicationTemplate: (socket, data, callback) => {
    return Application.getApplicationTemplate(socket.uid, callback);
  },
  saveApplication: (socket, data, callback) => {
    return Application.saveApplication(socket.uid, data, callback);
  }
}

module.exports = MoonlightSocket;