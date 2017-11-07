'use strict'
const async = require('async')
const BattleNet = require('battlenet-api')
const db = require.main.require('./src/database')
const privileges = require.main.require('./src/privileges')
const meta = require.main.require('./src/meta')
const Roster = {}

Roster.getRoster = function (callback) {
  db.getObject('roster', (err, data) => {
    if (err) {
      console.log(err)
    }
    callback(JSON.parse(data.members))
  })
}

Roster.updateRoster = function (uid, callback) {
  let guild
  let realm
  let region
  let bnet
  let validCharacters
  async.waterfall([
    (next) => {
      privileges.users.isAdministrator(uid, next)
    },
    (isAdmin, next) => {
      meta.settings.get('moonlight', next)
    },
    (settings, next) => {
      bnet = BattleNet(settings.key)
      region = settings.region
      realm = settings.realm
      guild = settings.guild

      bnet.wow.guild.members({ origin: region, realm: realm, name: guild }, (err, data, res) => {
        next(err, data)
      })
    },
    (data, next) => {
      if (!data || !Array.isArray(data.members)) {
        return next(new Error(JSON.stringify(data)))
      }
      validCharacters = data.members.filter((x, i) => x.character.level === 110)// data.members.filter(x => isValidRank(x.rank))//
      console.log('Requesting details for ' + validCharacters.length + ' characters')
      var calls = validCharacters.map(x => {
        return (cb) => {
          bnet.wow.character.aggregate({ origin: region, realm: x.character.realm, name: x.character.name, fields: ['items', 'achievements'] }, cb)
        }
      })

      console.log(calls.length)
      async.parallelLimit(calls, 10, next)
    },
    (data, next) => {
      var characterDetails = data.map(x => x[0]).filter(x => !!x && x.status !== 'nok')
      var returnData = characterDetails.filter(x => !!x)
        .map((x, i) => {
          // RETRIEVE ACHIEVEMENT STATUS CLASS HALL BELT -> CRITERIA QUANTITS VALUE = TOTAL AP GAINED
          var totalAP = 0
          if (x.achievements && x.achievements.criteria) {
            var classHallBeltAchIndex = x.achievements.criteria.indexOf(30103)
            totalAP = x.achievements.criteriaQuantity[classHallBeltAchIndex]
          }
          return {
            name: x.name,
            lastModified: x.lastModified,
            realm: x.realm,
            'class': x.class,
            race: x.race,
            level: x.level,
            thumbnail: x.thumbnail,
            rank: validCharacters[i].rank,
            averageItemLevelEquipped: x.items.averageItemLevelEquipped,
            audit: itemAudit(x.items),
            totalArtifactPower: totalAP
          }
        })
      db.setObject('roster', { members: JSON.stringify(returnData) }, next)
    }
  ], (err, results) => {
    console.log('Done!')
    if (err) {
      return callback(err)
    } else {
      return callback(null)
    }
  })
}

const hasGemSlot = function (item) {
  return item['tooltipParams']['gem0']
}

const itemAudit = function (items) {
  const missingGems = []
  let setItems = []
  let socketCount = 0
  let traitCount = 0
  let artifactIlvl = 0

  for (let i in items) {
    var item = items[i]
    if (item['tooltipParams']) {
      var tooltip = item['tooltipParams']
      if (tooltip['set'] && setItems.length === 0) {
        setItems = tooltip['set']
      }

      var gem = hasGemSlot(item)
      if (gem) {
        socketCount++
        if (!validGem(gem)) {
          missingGems.push(i)
        }
      }
    }
  }

  if (items.mainHand && items.mainHand.artifactTraits) {
    traitCount = items.mainHand.artifactTraits.reduce((sum, x) => sum + x.rank, 0) - 3 // This should reduce by number of relics instead of static 3
    artifactIlvl = items.mainHand.itemLevel
  }
  if (traitCount < 1 && items.offHand && items.offHand.artifactTraits) {
    // Check offhand for tanks && warlocks
    traitCount = items.offHand.artifactTraits.reduce((sum, x) => sum + x.rank, 0) - 3
    artifactIlvl = items.offHand.itemLevel
  }

  return {
    sockets: {
      count: socketCount
    },
    set: {
      parts: setItems
    },
    artifact: {
      traitCount: traitCount,
      itemLevel: artifactIlvl
    }
  }
}

var validGem = function (id) {
  if (id > 0) {
    return true
  }
  if ((id >= 127760 && id <= 127765)) {
    return true
  }
  return false
}

module.exports = Roster
