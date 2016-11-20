'use strict';

var Roster = require("../roster");
var Recruitment = require("../recruitment");
var Application = require("../application");
var MoonlightSocket = {};

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
    return Application.saveApplication(socket.uid, data, true, callback);
  },
  submitApplication: (socket, data, callback) => {
    return Application.saveApplication(socket.uid, data, false, callback);
  },
  deleteApplication: (socket, data, callback) => {
    return Application.deleteApplication(socket.uid, data.appId, callback);
  },
  getApplications: (socket, data, callback) => {
    return Application.getApplications(socket.uid, callback);
  },
  createReply: (socket, data, callback) => {
    return Application.createReply(socket.uid, data, callback);
  }
}

module.exports = MoonlightSocket;