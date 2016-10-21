import {CharacterClass} from '../../models/wow';
import {Question} from '../../models/application';


export const REALMS = ["Aegwynn", "Aerie Peak", "Agamaggan", "Aggra (Português)", "Aggramar", "Ahn'Qiraj", "Al'Akir", "Alexstrasza", "Alleria", "Alonsus", "Aman'Thul", "Ambossar", "Anachronos", "Anetheron", "Antonidas", "Anub'arak", "Arak-arahm", "Arathi", "Arathor", "Archimonde", "Area 52", "Argent Dawn", "Arthas", "Arygos", "Ashenvale", "Aszune", "Auchindoun", "Azjol-Nerub", "Azshara", "Azuregos", "Azuremyst", "Baelgun", "Balnazzar", "Blackhand", "Blackmoore", "Blackrock", "Blackscar", "Blade's Edge", "Bladefist", "Bloodfeather", "Bloodhoof", "Bloodscalp", "Blutkessel", "Booty Bay", "Borean Tundra", "Boulderfist", "Bronze Dragonflight", "Bronzebeard", "Burning Blade", "Burning Legion", "Burning Steppes", "C'Thun", "Chamber of Aspects", "Chants éternels", "Cho'gall", "Chromaggus", "Colinas Pardas", "Confrérie du Thorium", "Conseil des Ombres", "Crushridge", "Culte de la Rive noire", "Daggerspine", "Dalaran", "Dalvengyr", "Darkmoon Faire", "Darksorrow", "Darkspear", "Das Konsortium", "Das Syndikat", "Deathguard", "Deathweaver", "Deathwing", "Deepholm", "Defias Brotherhood", "Dentarg", "Der Mithrilorden", "Der Rat von Dalaran", "Der abyssische Rat", "Destromath", "Dethecus", "Die Aldor", "Die Arguswacht", "Die Nachtwache", "Die Silberne Hand", "Die Todeskrallen", "Die ewige Wacht", "Doomhammer", "Draenor", "Dragonblight", "Dragonmaw", "Drak'thul", "Drek'Thar", "Dun Modr", "Dun Morogh", "Dunemaul", "Durotan", "Earthen Ring", "Echsenkessel", "Eitrigg", "Eldre'Thalas", "Elune", "Emerald Dream", "Emeriss", "Eonar", "Eredar", "Eversong", "Executus", "Exodar", "Festung der Stürme", "Fordragon", "Forscherliga", "Frostmane", "Frostmourne", "Frostwhisper", "Frostwolf", "Galakrond", "Garona", "Garrosh", "Genjuros", "Ghostlands", "Gilneas", "Goldrinn", "Gordunni", "Gorgonnash", "Greymane", "Grim Batol", "Grom", "Gul'dan", "Hakkar", "Haomarush", "Hellfire", "Hellscream", "Howling Fjord", "Hyjal", "Illidan", "Jaedenar", "Kael'thas", "Karazhan", "Kargath", "Kazzak", "Kel'Thuzad", "Khadgar", "Khaz Modan", "Khaz'goroth", "Kil'jaeden", "Kilrogg", "Kirin Tor", "Kor'gall", "Krag'jin", "Krasus", "Kul Tiras", "Kult der Verdammten", "La Croisade écarlate", "Laughing Skull", "Les Clairvoyants", "Les Sentinelles", "Lich King", "Lightbringer", "Lightning's Blade", "Lordaeron", "Los Errantes", "Lothar", "Madmortem", "Magtheridon", "Mal'Ganis", "Malfurion", "Malorne", "Malygos", "Mannoroth", "Marécage de Zangar", "Mazrigos", "Medivh", "Minahonda", "Moonglade", "Mug'thol", "Nagrand", "Nathrezim", "Naxxramas", "Nazjatar", "Nefarian", "Nemesis", "Neptulon", "Ner'zhul", "Nera'thor", "Nethersturm", "Nordrassil", "Norgannon", "Nozdormu", "Onyxia", "Outland", "Perenolde", "Pozzo dell'Eternità", "Proudmoore", "Quel'Thalas", "Ragnaros", "Rajaxx", "Rashgarroth", "Ravencrest", "Ravenholdt", "Razuvious", "Rexxar", "Runetotem", "Sanguino", "Sargeras", "Saurfang", "Scarshield Legion", "Sen'jin", "Shadowsong", "Shattered Halls", "Shattered Hand", "Shattrath", "Shen'dralar", "Silvermoon", "Sinstralis", "Skullcrusher", "Soulflayer", "Spinebreaker", "Sporeggar", "Steamwheedle Cartel", "Stormrage", "Stormreaver", "Stormscale", "Sunstrider", "Sylvanas", "Taerar", "Talnivarr", "Tarren Mill", "Teldrassil", "Temple noir", "Terenas", "Terokkar", "Terrordar", "The Maelstrom", "The Sha'tar", "The Venture Co", "Theradras", "Thermaplugg", "Thrall", "Throk'Feroth", "Thunderhorn", "Tichondrius", "Tirion", "Todeswache", "Trollbane", "Turalyon", "Twilight's Hammer", "Twisting Nether", "Tyrande", "Uldaman", "Ulduar", "Uldum", "Un'Goro", "Varimathras", "Vashj", "Vek'lor", "Vek'nilash", "Vol'jin", "Wildhammer", "Wrathbringer", "Xavius", "Ysera", "Ysondre", "Zenedar", "Zirkel des Cenarius", "Zul'jin", "Zuluhed"];

export const CLASSES: CharacterClass[] = [
  {
    "id": 3,
    "mask": 4,
    "powerType": "focus",
    "name": "Hunter",
    "specs": [
      {
        "name": "Beast Mastery",
        "role": "DPS",
        "backgroundImage": "bg-hunter-beastmaster",
        "icon": "ability_hunter_bestialdiscipline",
        "description": "A master of the wild who can tame a wide variety of beasts to assist him in combat.",
        "order": 0
      },
      {
        "name": "Marksmanship",
        "role": "DPS",
        "backgroundImage": "bg-hunter-marksman",
        "icon": "ability_hunter_focusedaim",
        "description": "A master archer or sharpshooter who excels in bringing down enemies from afar.",
        "order": 1
      },
      {
        "name": "Survival",
        "role": "DPS",
        "backgroundImage": "bg-hunter-survival",
        "icon": "ability_hunter_camouflage",
        "description": "A rugged tracker who favors using animal venom, explosives and traps as deadly weapons.",
        "order": 2
      }
    ]
  },
  {
    "id": 4,
    "mask": 8,
    "powerType": "energy",
    "name": "Rogue",
    "specs": [
      {
        "name": "Assassination",
        "role": "DPS",
        "backgroundImage": "bg-rogue-assassination",
        "icon": "ability_rogue_eviscerate",
        "description": "A deadly master of poisons who dispatches victims with vicious dagger strikes.",
        "order": 0
      },
      {
        "name": "Combat",
        "role": "DPS",
        "backgroundImage": "bg-rogue-combat",
        "icon": "ability_backstab",
        "description": "A swashbuckler who uses agility and guile to stand toe-to-toe with enemies.",
        "order": 1
      },
      {
        "name": "Subtlety",
        "role": "DPS",
        "backgroundImage": "bg-rogue-subtlety",
        "icon": "ability_stealth",
        "description": "A dark stalker who leaps from the shadows to ambush her unsuspecting prey.",
        "order": 2
      }
    ]
  },
  {
    "id": 1,
    "mask": 1,
    "powerType": "rage",
    "name": "Warrior",
    "specs": [
      {
        "name": "Arms",
        "role": "DPS",
        "backgroundImage": "bg-warrior-arms",
        "icon": "ability_warrior_savageblow",
        "description": "A battle-hardened master of two-handed weapons, using mobility and overpowering attacks to strike his opponents down.",
        "order": 0
      },
      {
        "name": "Fury",
        "role": "DPS",
        "backgroundImage": "bg-warrior-fury",
        "icon": "ability_warrior_innerrage",
        "description": "A furious berserker wielding a weapon in each hand, unleashing a flurry of attacks to carve her opponents to pieces.",
        "order": 1
      },
      {
        "name": "Protection",
        "role": "TANK",
        "backgroundImage": "bg-warrior-protection",
        "icon": "ability_warrior_defensivestance",
        "description": "A stalwart protector who uses a shield to safeguard himself and his allies.",
        "order": 2
      }
    ]
  },
  {
    "id": 2,
    "mask": 2,
    "powerType": "mana",
    "name": "Paladin",
    "specs": [
      {
        "name": "Holy",
        "role": "HEALING",
        "backgroundImage": "bg-paladin-holy",
        "icon": "spell_holy_holybolt",
        "description": "Invokes the power of the Light to protect and to heal.",
        "order": 0
      },
      {
        "name": "Protection",
        "role": "TANK",
        "backgroundImage": "bg-paladin-protection",
        "icon": "ability_paladin_shieldofthetemplar",
        "description": "Uses Holy magic to shield himself and defend allies from attackers.",
        "order": 1
      },
      {
        "name": "Retribution",
        "role": "DPS",
        "backgroundImage": "bg-paladin-retribution",
        "icon": "spell_holy_auraoflight",
        "description": "A righteous crusader who judges and punishes opponents with weapons and Holy magic.",
        "order": 2
      }
    ]
  },
  {
    "id": 7,
    "mask": 64,
    "powerType": "mana",
    "name": "Shaman",
    "specs": [
      {
        "name": "Elemental",
        "role": "DPS",
        "backgroundImage": "bg-shaman-elemental",
        "icon": "spell_nature_lightning",
        "description": "A spellcaster who harnesses the destructive forces of nature and the elements.",
        "order": 0
      },
      {
        "name": "Enhancement",
        "role": "DPS",
        "backgroundImage": "bg-shaman-enhancement",
        "icon": "spell_shaman_improvedstormstrike",
        "description": "A totemic warrior who strikes foes with weapons imbued with elemental power.",
        "order": 1
      },
      {
        "name": "Restoration",
        "role": "HEALING",
        "backgroundImage": "bg-shaman-restoration",
        "icon": "spell_nature_magicimmunity",
        "description": "A healer who calls upon ancestral spirits and the cleansing power of water to mend allies' wounds.",
        "order": 2
      }
    ]
  },
  {
    "id": 8,
    "mask": 128,
    "powerType": "mana",
    "name": "Mage",
    "specs": [
      {
        "name": "Arcane",
        "role": "DPS",
        "backgroundImage": "bg-mage-arcane",
        "icon": "spell_holy_magicalsentry",
        "description": "Manipulate the arcane, destroying enemies with overwhelming power.",
        "order": 0
      },
      {
        "name": "Fire",
        "role": "DPS",
        "backgroundImage": "bg-mage-fire",
        "icon": "spell_fire_firebolt02",
        "description": "Ignite enemies with balls of fire and combustive flames.",
        "order": 1
      },
      {
        "name": "Frost",
        "role": "DPS",
        "backgroundImage": "bg-mage-frost",
        "icon": "spell_frost_frostbolt02",
        "description": "Freezes enemies in their tracks and shatters them with Frost magic.",
        "order": 2
      }
    ]
  },
  {
    "id": 5,
    "mask": 16,
    "powerType": "mana",
    "name": "Priest",
    "specs": [
      {
        "name": "Discipline",
        "role": "HEALING",
        "backgroundImage": "bg-priest-discipline",
        "icon": "spell_holy_powerwordshield",
        "description": "Uses magic to shield allies from taking damage as well as heal their wounds.",
        "order": 0
      },
      {
        "name": "Holy",
        "role": "HEALING",
        "backgroundImage": "bg-priest-holy",
        "icon": "spell_holy_guardianspirit",
        "description": "A versatile healer who can reverse damage on individuals or groups and even heal from beyond the grave.",
        "order": 1
      },
      {
        "name": "Shadow",
        "role": "DPS",
        "backgroundImage": "bg-priest-shadow",
        "icon": "spell_shadow_shadowwordpain",
        "description": "Uses sinister Shadow magic, especially damage-over-time spells, to eradicate enemies.",
        "order": 2
      }
    ]
  },
  {
    "id": 6,
    "mask": 32,
    "powerType": "runic-power",
    "name": "Death Knight",
    "specs": [
      {
        "name": "Blood",
        "role": "TANK",
        "backgroundImage": "bg-deathknight-blood",
        "icon": "spell_deathknight_bloodpresence",
        "description": "A dark guardian who manipulates and corrupts life energy to sustain himself in the face of an enemy onslaught.",
        "order": 0
      },
      {
        "name": "Frost",
        "role": "DPS",
        "backgroundImage": "bg-deathknight-frost",
        "icon": "spell_deathknight_frostpresence",
        "description": "An icy harbinger of doom, channeling runic power and delivering vicious weapon strikes.",
        "order": 1
      },
      {
        "name": "Unholy",
        "role": "DPS",
        "backgroundImage": "bg-deathknight-unholy",
        "icon": "spell_deathknight_unholypresence",
        "description": "A master of death and decay, spreading infection and controlling undead minions to do his bidding.",
        "order": 2
      }
    ]
  },
  {
    "id": 11,
    "mask": 1024,
    "powerType": "mana",
    "name": "Druid",
    "specs": [
      {
        "name": "Balance",
        "role": "DPS",
        "backgroundImage": "bg-druid-balance",
        "icon": "spell_nature_starfall",
        "description": "Can take on the form of a powerful Moonkin, balancing the power of Arcane and Nature magic to destroy enemies at a distance.",
        "order": 0
      },
      {
        "name": "Feral",
        "role": "DPS",
        "backgroundImage": "bg-druid-cat",
        "icon": "ability_druid_catform",
        "description": "Takes on the form of a great cat to deal damage with bleeds and bites.",
        "order": 1
      },
      {
        "name": "Guardian",
        "role": "TANK",
        "backgroundImage": "bg-druid-bear",
        "icon": "ability_racial_bearform",
        "description": "Takes on the form of a mighty bear to absorb damage and protect allies.",
        "order": 2
      },
      {
        "name": "Restoration",
        "role": "HEALING",
        "backgroundImage": "bg-druid-restoration",
        "icon": "spell_nature_healingtouch",
        "description": "Uses heal-over-time Nature spells to keep allies alive.",
        "order": 3
      }
    ]
  },
  {
    "id": 9,
    "mask": 256,
    "powerType": "mana",
    "name": "Warlock",
    "specs": [
      {
        "name": "Affliction",
        "role": "DPS",
        "backgroundImage": "bg-warlock-affliction",
        "icon": "spell_shadow_deathcoil",
        "description": "A master of shadow magic who specializes in drains and damage-over-time spells.",
        "order": 0
      },
      {
        "name": "Demonology",
        "role": "DPS",
        "backgroundImage": "bg-warlock-demonology",
        "icon": "spell_shadow_metamorphosis",
        "description": "A master of demonic magic who transforms into a demon and compels demonic powers to aid him.",
        "order": 1
      },
      {
        "name": "Destruction",
        "role": "DPS",
        "backgroundImage": "bg-warlock-destruction",
        "icon": "spell_shadow_rainoffire",
        "description": "A master of chaos who calls down fire to burn and demolish enemies.",
        "order": 2
      }
    ]
  },
  {
    "id": 10,
    "mask": 512,
    "powerType": "energy",
    "name": "Monk",
    "specs": [
      {
        "name": "Brewmaster",
        "role": "TANK",
        "backgroundImage": "bg-monk-brewmaster",
        "icon": "spell_monk_brewmaster_spec",
        "description": "A sturdy brawler who uses liquid fortification and unpredictable movement to avoid damage and protect allies.",
        "order": 0
      },
      {
        "name": "Mistweaver",
        "role": "HEALING",
        "backgroundImage": "bg-monk-mistweaver",
        "icon": "spell_monk_mistweaver_spec",
        "description": "A healer who mixes traditional herbal medicine with Pandaren martial arts.",
        "order": 1
      },
      {
        "name": "Windwalker",
        "role": "DPS",
        "backgroundImage": "bg-monk-battledancer",
        "icon": "spell_monk_windwalker_spec",
        "description": "A martial artist without peer who pummels foes with hands and fists.",
        "order": 2
      }
    ]
  }
];
