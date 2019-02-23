const REPUBLIC = "REPUBLIC"
const EMPIRE = "EMPIRE"

export const ALLEGIANCES = [REPUBLIC, EMPIRE]

const JEDI_KNIGHT = "JEDI_KNIGHT"
const JEDI_CONSULAR = "JEDI_CONSULAR"
const TROOPER = "TROOPER"
const SMUGGLER = "SMUGGLER"
const SITH_WARRIOR = "SITH_WARRIOR"
const SITH_INQUISITOR = "SITH_INQUISITOR"
const IMPERIAL_AGENT = "IMPERIAL_AGENT"
const BOUNTY_HUNTER = "BOUNTY_HUNTER"

const GUARDIAN = "GUARDIAN"
const SENTINAL = "SENTINAL"
const SAGE = "SAGE"
const SHADOW = "SHADOW"
const VANGUARD = "VANGUARD"
const COMMANDO = "COMMANDO"
const SCOUNDREL = "SCOUNDREL"
const GUNSLINGER = "GUNSLINGER"
const JUGGERNAUT = "JUGGERNAUT"
const MARAUDER = "MARAUDER"
const SORCERER = "SORCERER"
const ASSASSIN = "ASSASSIN"
const MERCENARY = "MERCENARY"
const POWER_TECH = "POWER_TECH"
const OPERATIVE = "OPERATIVE"
const SNIPER = "SNIPER"

export const CHARACTER_CLASSES = [
  {
    name: "Jedi Knight",
    value: JEDI_KNIGHT,
    mirror: SITH_WARRIOR,
    eligiblSubClasses: [GUARDIAN, SENTINAL],
    allegiance: REPUBLIC,
  },
  {
    name: "Jedi Consular",
    value: JEDI_CONSULAR,
    mirror: SITH_INQUISITOR,
    eligiblSubClasses: [SAGE, SHADOW],
    allegiance: REPUBLIC,
  },
  {
    name: "Trooper",
    value: TROOPER,
    mirror: BOUNTY_HUNTER,
    eligiblSubClasses: [VANGUARD, COMMANDO],
    allegiance: REPUBLIC,
  },
  {
    name: "Smuggler",
    value: SMUGGLER,
    mirror: IMPERIAL_AGENT,
    eligiblSubClasses: [SCOUNDREL, GUNSLINGER],
    allegiance: REPUBLIC,
  },
  {
    name: "Sith Warrior",
    value: SITH_WARRIOR,
    mirror: SITH_WARRIOR,
    eligiblSubClasses: [JUGGERNAUT, MARAUDER],
    allegiance: EMPIRE,
  },
  {
    name: "Sith Inquisitor",
    value: SITH_INQUISITOR,
    mirror: JEDI_CONSULAR,
    eligiblSubClasses: [SORCERER, ASSASSIN],
    allegiance: EMPIRE,
  },

  {
    name: "Bounty Hunter",
    value: BOUNTY_HUNTER,
    mirror: TROOPER,
    eligiblSubClasses: [MERCENARY, POWER_TECH],
    allegiance: EMPIRE,
  },
  {
    name: "Imperial Agent",
    value: IMPERIAL_AGENT,
    mirror: SMUGGLER,
    eligiblSubClasses: [OPERATIVE, SNIPER],
    allegiance: EMPIRE,
  },
]

export const CHARACTER_SUB_CLASSES = [
  // Republic
  {
    name: "Guardian",
    value: GUARDIAN,
    mirror: JUGGERNAUT,
    class: JEDI_KNIGHT,
  },
  {
    name: "Sentinal",
    value: SENTINAL,
    mirror: MARAUDER,
    class: JEDI_KNIGHT,
  },
  {
    name: "SAGE",
    value: SAGE,
    mirror: SORCERER,
    class: JEDI_CONSULAR,
  },
  {
    name: "Shadow",
    value: SHADOW,
    mirror: ASSASSIN,
    class: JEDI_CONSULAR,
  },
  {
    name: "VANGUARD",
    value: VANGUARD,
    mirror: MERCENARY,
    class: TROOPER,
  },
  {
    name: "Commando",
    value: COMMANDO,
    mirror: POWER_TECH,
    class: TROOPER,
  },
  {
    name: "Scoundrel",
    value: SCOUNDREL,
    mirror: OPERATIVE,
    class: SMUGGLER,
  },

  {
    name: "Gunslinger",
    value: GUNSLINGER,
    mirror: SNIPER,
    class: TROOPER,
  },
  // Epire
  {
    name: "Juggernaught",
    value: JUGGERNAUT,
    mirror: GUARDIAN,
    class: SITH_WARRIOR,
  },
  {
    name: "Marauder",
    value: MARAUDER,
    mirror: SENTINAL,
    class: SITH_WARRIOR,
  },
  {
    name: "Sorcerer",
    value: SORCERER,
    mirror: SAGE,
    class: SITH_INQUISITOR,
  },
  {
    name: "Assassin",
    value: ASSASSIN,
    mirror: SHADOW,
    class: SITH_INQUISITOR,
  },
  {
    name: "Mercenary",
    value: MERCENARY,
    mirror: VANGUARD,
    class: BOUNTY_HUNTER,
  },
  {
    name: "Power-Tech",
    value: POWER_TECH,
    mirror: COMMANDO,
    class: BOUNTY_HUNTER,
  },
  {
    name: "Operative",
    value: OPERATIVE,
    mirror: SCOUNDREL,
    class: IMPERIAL_AGENT,
  },
  {
    name: "Sniper",
    value: SNIPER,
    mirror: GUNSLINGER,
    class: IMPERIAL_AGENT,
  },
]
