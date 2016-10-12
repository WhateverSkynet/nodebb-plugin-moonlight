var async = require('async');
var BattleNet = require('battlenet-api');
var plugins = require.main.require('./src/plugins');
var db = require.main.require('./src/database');
var privileges = require.main.require('./src/privileges');
var meta = require.main.require("./src/meta");
var Recruitment = {};

const defaultList = [
    {
      "name": "Hunter",
      "specs": [
        {
          "name": "Beast Mastery",
          "status": "None"
        },
        {
          "name": "Marksmanship",
          "status": "None"
        },
        {
          "name": "Survival",
          "status": "None"
        }
      ]
    },
    {
      "name": "Rogue",
      "specs": [
        {
          "name": "Assassination",
          "status": "None"
        },
        {
          "name": "Combat",
          "status": "None"
        },
        {
          "name": "Subtlety",
          "status": "None"
        }
      ]
    },
    {
      "name": "Warrior",
      "specs": [
        {
          "name": "Arms",
          "status": "None"
        },
        {
          "name": "Fury",
          "status": "None"
        },
        {
          "name": "Protection",
          "status": "None"
        }
      ]
    },
    {
      "name": "Paladin",
      "specs": [
        {
          "name": "Holy",
          "status": "None"
        },
        {
          "name": "Protection",
          "status": "None"
        },
        {
          "name": "Retribution",
          "status": "None"
        }
      ]
    },
    {
      "name": "Shaman",
      "specs": [
        {
          "name": "Elemental",
          "status": "None"
        },
        {
          "name": "Enhancement",
          "status": "None"
        },
        {
          "name": "Restoration",
          "status": "None"
        }
      ]
    },
    {
      "name": "Mage",
      "specs": [
        {
          "name": "Arcane",
          "status": "None"
        },
        {
          "name": "Fire",
          "status": "None"
        },
        {
          "name": "Frost",
          "status": "None"
        }
      ]
    },
    {
      "name": "Priest",
      "specs": [
        {
          "name": "Discipline",
          "status": "None"
        },
        {
          "name": "Holy",
          "status": "None"
        },
        {
          "name": "Shadow",
          "status": "None"
        }
      ]
    },
    {
      "name": "Death Knight",
      "specs": [
        {
          "name": "Blood",
          "status": "None"
        },
        {
          "name": "Frost",
          "status": "None"
        },
        {
          "name": "Unholy",
          "status": "None"
        }
      ]
    },
    {
      "name": "Druid",
      "specs": [
        {
          "name": "Balance",
          "status": "None"
        },
        {
          "name": "Feral",
          "status": "None"
        },
        {
          "name": "Guardian",
          "status": "None"
        },
        {
          "name": "Restoration",
          "status": "None"
        }
      ]
    },
    {
      "name": "Warlock",
      "specs": [
        {
          "name": "Affliction",
          "status": "None"
        },
        {
          "name": "Demonology",
          "status": "None"
        },
        {
          "name": "Destruction",
          "status": "None"
        }
      ]
    },
    {
      "name": "Monk",
      "specs": [
        {
          "name": "Brewmaster",
          "status": "None"
        },
        {
          "name": "Mistweaver",
          "status": "None"
        },
        {
          "name": "Windwalker",
          "status": "None"
        }
      ]
    },
    {
      "name": "Deamon Hunter",
      "specs": [
        {
          "name": "Vengeance",
          "status": "None"
        },
        {
          "name": "Havoc",
          "status": "None"
        }
      ]
    }
  ];

//TODO: Add class/spec loading form Blizzard Api
const getClasses = (cb) => {
  let bnet;
  async.waterfall([
    (next) => {
      db.getObject('blizzard:wow', next);
    },
    (data, next) => {
      if (data) {
        next("break", JSON.parse(data.characterClasses));
      } else {
        meta.settings.get("moonlight", next);
      }
    },
    (settings, next) => {
      if (!settings.key) {
        next(new Error("Missing Api Key."));
      } else if (!settings.region) {
        next(new Error("Missing region."));
      }
      let bnet = BattleNet(settings.key);
      let region = settings.region;
      bnet.wow.data.characterClasses({ origin: region }, (err, data, res) => {
        next(err, data);
      });
    },
    (data, next) => {
      if (!data.classes) {
        next(new Error("Bad response data."));
      } else {
        next(null, data.classes);
      }
    }
  ], (err, result) => {
    console.log(result);
    if (err && err !== "break") {
      cb(err);
    } else {
      cb(null, result);
    }
  });

};

Recruitment.getRecruitment = (cb) => {
  async.waterfall([
    (next) => {
      db.getObject('recruitment', next);
    },
    (data, next) => {
      let result;
      if (data && data.classes) {
        next(null, JSON.parse(data.classes));
      } else {
        next(null, defaultList);
      }
    }
  ], (err, result) => {
    console.log(result);
    if (err) {
      cb(err);
    } else {
      cb(null, result);
    }
  });
};

// Recruitment.updateRoster = function (uid, callback) {
// 		var timestamp = Date.now();
//   var guild;
//   var realm;
//   var region;
//   var bnet;
//   var validCharacters;
//   async.waterfall([
//     (next) => {
//       privileges.users.isAdministrator(uid, next);
//     },
//     (isAdmin, next) => {
//        meta.settings.get("moonlight", next);
//     },
//     (settings, next) => {
//       bnet = BattleNet(settings.key);
//       region = settings.region;
//       realm = settings.realm;
//       guild = settings.guild;

//       bnet.wow.guild.members({ origin: region, realm: realm, name: guild }, (err, data, res) => {
//         next(null, data);
//       });
//     },
//     (data, next) => {
//       if (!data || !Array.isArray(data.members)) {
//           return next(new Error(JSON.stringify(data)));
//         }
//         validCharacters = data.members.filter((x, i) => x.character.level === 110);//data.members.filter(x => isValidRank(x.rank));//
//         console.log("Requesting details for " + validCharacters.length + " characters")
//         var calls = validCharacters.map(x => {
//           return (cb) => {
//             bnet.wow.character.aggregate({ origin: region, realm: x.character.realm, name: x.character.name, fields: ["items", "achievements"] }, cb);
//           }
//         });

//         console.log(calls.length);
//         async.parallelLimit(calls, 50, next);
//     },
//     (data, next) => {
//           var characterDetails = data.map(x => x[0]).filter(x => !!x && x.status !== "nok");
//           var returnData = characterDetails.filter(x => !!x)
//             .map((x, i) => {
//               // RETRIEVE ACHIEVEMENT STATUS CLASS HALL BELT -> CRITERIA QUANTITS VALUE = TOTAL AP GAINED
//               var totalAP = 0;
//               if (x.achievements && x.achievements.criteria) {
//                 var classHallBeltAchIndex = x.achievements.criteria.indexOf(30103);
//                 totalAP = x.achievements.criteriaQuantity[classHallBeltAchIndex];
//               }
//               return {
//                 name: x.name,
//                 lastModified: x.lastModified,
//                 realm: x.realm,
//                 "class": x.class,
//                 race: x.race,
//                 level: x.level,
//                 thumbnail: x.thumbnail,
//                 rank: validCharacters[i].rank,
//                 averageItemLevelEquipped: x.items.averageItemLevelEquipped,
//                 audit: itemAudit(x.items),
//                 totalArtifactPower: totalAP
//               };
//             });
//           db.setObject('recruitment', { classes: JSON.stringify(returnData) }, next);
//     }
//   ], (err, results) => {
//     console.log("Done!");
//     if (err) {
//       return callback(err);
//     } else {
//       return callback(null);
//     }
//   });

// }

module.exports = Recruitment;