'use strict'
const MoonlightSocketEvents = {}
const ticketEvents = {}

MoonlightSocketEvents.ticket = ticketEvents
MoonlightSocketEvents.roster = {
  update: 'plugins.ml.roster.update'
}

ticketEvents.create = 'plugins.ml.ticket.create'

module.exports = MoonlightSocketEvents
