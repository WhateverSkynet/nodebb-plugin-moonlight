var async = require('async');
var BattleNet = require('battlenet-api');
var plugins = require.main.require('./src/plugins');
var db = require.main.require('./src/database');
var privileges = require.main.require('./src/privileges');
var meta = require.main.require("./src/meta");
var Roster = {};


var isValidRank = function (id) {
  switch (id) {
    case 0:
      return true;//"Guild Master";
    case 1:
      return true;//"Officer";
    case 2:
      return false;//"Officer Alt";
    case 3:
      return true;//"Raider";
    case 4:
      return true;//"Trial";
    case 5:
      return true;//"Raid Alt";
    case 6:
      return false;//"Alt";
    case 7:
      return false;//"Casual";
  }
  return false;
}

Roster.getRoster = function (callback) {

  db.getObject('roster', (err, data) => {
    callback(JSON.parse(data.members));
  });
};

Roster.updateRoster = function (uid, callback) {
		var timestamp = Date.now();
  var guild;
  var realm;
  var region;
  var bnet;
  var validCharacters;
  async.waterfall([
    (next) => {
      privileges.users.isAdministrator(uid, next);
    },
    (isAdmin, next) => {
       meta.settings.get("moonlight", next);
    },
    (settings, next) => {
      bnet = BattleNet(settings.key);
      region = settings.region;
      realm = settings.realm;
      guild = settings.guild;

      bnet.wow.guild.members({ origin: region, realm: realm, name: guild }, (err, data, res) => {
        next(null, data);
      });
    },
    (data, next) => {
      if (!data || !Array.isArray(data.members)) {
          return next(new Error(JSON.stringify(data)));
        }
        validCharacters = data.members.filter((x, i) => x.character.level === 110);//data.members.filter(x => isValidRank(x.rank));//
        console.log("Requesting details for " + validCharacters.length + " characters")
        var calls = validCharacters.map(x => {
          return (cb) => {
            bnet.wow.character.aggregate({ origin: region, realm: x.character.realm, name: x.character.name, fields: ["items", "achievements"] }, cb);
          }
        });
 
        console.log(calls.length);
        async.parallelLimit(calls, 50, next);
    },
    (data, next) => {
          var characterDetails = data.map(x => x[0]).filter(x => !!x && x.status !== "nok");
          var returnData = characterDetails.filter(x => !!x)
            .map((x, i) => {
              // RETRIEVE ACHIEVEMENT STATUS CLASS HALL BELT -> CRITERIA QUANTITS VALUE = TOTAL AP GAINED
              var totalAP = 0;
              if (x.achievements && x.achievements.criteria) {
                var classHallBeltAchIndex = x.achievements.criteria.indexOf(30103);
                totalAP = x.achievements.criteriaQuantity[classHallBeltAchIndex];
              }
              return {
                name: x.name,
                lastModified: x.lastModified,
                realm: x.realm,
                "class": x.class,
                race: x.race,
                level: x.level,
                thumbnail: x.thumbnail,
                rank: validCharacters[i].rank,
                averageItemLevelEquipped: x.items.averageItemLevelEquipped,
                audit: itemAudit(x.items),
                totalArtifactPower: totalAP
              };
            });
          db.setObject('roster', { members: JSON.stringify(returnData) }, next);
    }
  ], (err, results) => {
    console.log("Done!");
    if (err) {
      return callback(err);
    } else {
      return callback(null);
    }
  });

}

var hasGemSlot = function (item) {
  return item["tooltipParams"]["gem0"]
}

var itemAudit = function (items) {
  var finger1 = items["finger1"];
  var finger2 = items["finger2"];
  var back = items["back"];
  var neck = items["neck"];
  var mainHand = items["mainHand"];
  var offHand = items["offHand"];
  var missingEnchants = [];
  var missingGems = [];
  var socketCount = 0;
  var setItems = [];
  var missingUpgrades = [];

  for (i in items) {
    var item = items[i];
    if (item["tooltipParams"]) {
      var tooltip = item["tooltipParams"];
      if (tooltip["set"] && setItems.length == 0) {
        setItems = tooltip["set"];
      }

      var gem = hasGemSlot(item)
      if (gem) {
        socketCount++;
        if (!validGem(gem)) {
          missingGems.push(i);
        }
      }

      //   var upgradable = tooltip["upgrade"]
      //   if(upgradable){  
      //     if(!isUpgraded(upgradable)){
      //       missingUpgrades.push(i) 
      //     }
      //   }

    }
  }
  //   if (!enchant(finger1) || !validFingerEnchant(enchant(finger1))) {
  //     missingEnchants.push("finger1")
  //   }
  //   if (!enchant(finger2) || !validFingerEnchant(enchant(finger2))) {
  //     missingEnchants.push("finger2")
  //   }
  //   if (!enchant(back) || !validBackEnchant(enchant(back))) {
  //     missingEnchants.push("back")
  //   }
  //   if (!enchant(neck) || !validNeckEnchant(enchant(neck))) {
  //     missingEnchants.push("neck")
  //   }
  //   if (!enchant(mainHand) || !validWeaponEnchant(enchant(mainHand))) {
  //     missingEnchants.push("mainHand")
  //   }
  //   if (offHand && offHand["weaponInfo"] && (!enchant(offHand) || !validWeaponEnchant(enchant(offHand)))) {
  //     missingEnchants.push("offHand")
  //   }
  var enchantsPassed = "E:" + (missingEnchants.length == 0 || missingEnchants[0] == null ? "passed" : missingEnchants.join(','))
  var gemsPassed = "G:" + (missingGems.length == 0 || missingGems[0] == null ? "passed" : missingGems.join(','))
  var upgradesPassed = "U:" + (missingUpgrades.length == 0 || missingUpgrades[0] == null ? "passed" : missingUpgrades.join(','))

  var traitCount = 0;
  var artifactIlvl = 0;
  if (items.mainHand && items.mainHand.artifactTraits) {
    traitCount = items.mainHand.artifactTraits.reduce((sum, x) => sum + x.rank, 0);
    artifactIlvl = items.mainHand.itemLevel;
  }
  if (traitCount === 0 && items.offHand && items.offHand.artifactTraits) {
    //Check offhand for tanks
    traitCount = items.offHand.artifactTraits.reduce((sum, x) => sum + x.rank, 0);
    artifactIlvl = items.offHand.itemLevel;
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
  };
}

var validGem = function (id) {
  if (id > 0) {
    return true;
  }
  if ((id >= 127760 && id <= 127765)) {
    return true
  }
  return false
}

module.exports = Roster;

