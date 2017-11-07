'use strict'
var async = require('async')
var db = require.main.require('./src/database')
var privileges = require.main.require('./src/privileges')
var Recruitment = {}

const defaultList = [
  {
    'class': 'Hunter',
    'spec': 'Beast Mastery',
    'status': 'None'
  },
  {
    'class': 'Hunter',
    'spec': 'Marksmanship',
    'status': 'None'
  },
  {
    'class': 'Hunter',
    'spec': 'Survival',
    'status': 'None'
  },
  {
    'class': 'Hunter',
    'status': 'None'
  },
  {
    'class': 'Rogue',
    'spec': 'Assassination',
    'status': 'None'
  },
  {
    'class': 'Rogue',
    'spec': 'Combat',
    'status': 'None'
  },
  {
    'class': 'Rogue',
    'spec': 'Subtlety',
    'status': 'None'
  },
  {
    'class': 'Rogue',
    'status': 'None'
  },
  {
    'class': 'Warrior',
    'spec': 'Arms',
    'status': 'None'
  },
  {
    'class': 'Warrior',
    'spec': 'Fury',
    'status': 'None'
  },
  {
    'class': 'Warrior',
    'role': 'DPS',
    'status': 'None'
  },
  {
    'class': 'Warrior',
    'spec': 'Protection',
    'status': 'None'
  },
  {
    'class': 'Paladin',
    'spec': 'Holy',
    'status': 'None'
  },
  {
    'class': 'Paladin',
    'spec': 'Protection',
    'status': 'None'
  },
  {
    'class': 'Paladin',
    'spec': 'Retribution',
    'status': 'None'
  },
  {
    'class': 'Shaman',
    'spec': 'Elemental',
    'status': 'None'
  },
  {
    'class': 'Shaman',
    'spec': 'Enhancement',
    'status': 'None'
  },
  {
    'class': 'Shaman',
    'spec': 'Restoration',
    'status': 'None'
  },
  {
    'class': 'Mage',
    'spec': 'Arcane',
    'status': 'None'
  },
  {
    'class': 'Mage',
    'spec': 'Fire',
    'status': 'None'
  },
  {
    'class': 'Mage',
    'spec': 'Frost',
    'status': 'None'
  },
  {
    'class': 'Mage',
    'status': 'None'
  },
  {
    'class': 'Priest',
    'spec': 'Discipline',
    'status': 'None'
  },
  {
    'class': 'Priest',
    'spec': 'Holy',
    'status': 'None'
  },
  {
    'class': 'Priest',
    'role': 'Healer',
    'status': 'None'
  },
  {
    'class': 'Priest',
    'spec': 'Shadow',
    'status': 'None'
  },
  {
    'class': 'Death Knight',
    'spec': 'Blood',
    'status': 'None'
  },
  {
    'class': 'Death Knight',
    'spec': 'Frost',
    'status': 'None'
  },
  {
    'class': 'Death Knight',
    'spec': 'Unholy',
    'status': 'None'
  },
  {
    'class': 'Death Knight',
    'role': 'DPS',
    'status': 'None'
  },
  {
    'class': 'Druid',
    'spec': 'Balance',
    'status': 'None'
  },
  {
    'class': 'Druid',
    'spec': 'Feral',
    'status': 'None'
  },
  {
    'class': 'Druid',
    'spec': 'Guardian',
    'status': 'None'
  },
  {
    'class': 'Druid',
    'spec': 'Restoration',
    'status': 'None'
  },
  {
    'class': 'Warlock',
    'spec': 'Affliction',
    'status': 'None'
  },
  {
    'class': 'Warlock',
    'spec': 'Demonology',
    'status': 'None'
  },
  {
    'class': 'Warlock',
    'spec': 'Destruction',
    'status': 'None'
  },
  {
    'class': 'Warlock',
    'status': 'None'
  },
  {
    'class': 'Monk',
    'spec': 'Brewmaster',
    'status': 'None'
  },
  {
    'class': 'Monk',
    'spec': 'Mistweaver',
    'status': 'None'
  },
  {
    'class': 'Monk',
    'spec': 'Windwalker',
    'status': 'None'
  },
  {
    'class': 'Demon Hunter',
    'spec': 'Vengeance',
    'status': 'None'
  },
  {
    'class': 'Demon Hunter',
    'spec': 'Havoc',
    'status': 'None'
  }
]

Recruitment.getRecruitment = (cb) => {
  async.waterfall([
    (next) => {
      db.getObject('mnl:recruitment', next)
    },
    (data, next) => {
      if (data && data.classes) {
        next(null, JSON.parse(data.classes))
      } else {
        //
        next(null, defaultList)
      }
    }
  ], (err, result) => {
    if (err) {
      cb(err)
    } else {
      cb(null, result)
    }
  })
}

Recruitment.set = (uid, list, cb) => {
  async.waterfall([
    (next) => {
      privileges.users.isAdministrator(uid, next)
    },
    (isAdmin, next) => {
      if (isAdmin) {
        db.setObject('mnl:recruitment', { classes: JSON.stringify(list) }, next)
      } else {
        next(new Error('Unauthorized'))
      }
    }
  ], (err, results) => {
    console.log('Done!')
    if (err) {
      return cb(err)
    } else {
      return cb(null)
    }
  })
}

module.exports = Recruitment
