const { combineReducers } = Redux;
const { createStore } = Redux;



const objectWithoutProperties = (obj, keys) => {
    var target = {};
    for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
    }
    return target;
}


const Panel = (props) => {
      let properties = objectWithoutProperties(props, ["className", "children"]);
    let classNames = ["mui-panel"];
    if (props.className) {
      classNames.push(props.className);
    }
      return (
        <div {...properties}
        className = {  classNames.join(" ") }
        >
        { props.children }
      </div >
    );
};

const Row = (props) => {
   let properties = objectWithoutProperties(props, ["className, children"]);
    let classNames = ["mui-row"];
    if (props.className) {
      classNames.push(props.className);
    }
      return (
        <div {...properties}
        className = {  classNames.join(" ") }
        >
        { props.children }
      </div >
    );
};

const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

const Col = (props) => {
    let propertiesToRemove = ["className", "children"]
    const columnOffsetClasses = breakpoints
      .filter(x => !!props[`${x}-offset`])
      .map(x => {
        propertiesToRemove.push(`${x}-offset`);
        return `mui-col-${x}-offset-${props[`${x}-offset`]}`
      });
    const columnClasses = breakpoints
      .filter(x => !!props[x])
      .map(x => {
        propertiesToRemove.push(x);
        return `mui-col-${x}-${props[x]}`
      });
    const properties = objectWithoutProperties(props, propertiesToRemove);
    let classNames = columnClasses.concat(columnOffsetClasses);
    if (props.className) {
      classNames.push(props.className);
    }
    return (
      <div {...properties}
        className = { classNames.join(" ") }
        >
        { props.children }
      </div >
    );
};

const questions = [
  {
    "id": 1,
    "text": "1. Why do you choose to play your class and are you comfortable with different specializations?",
    "value": ""
  },
  { 
    "id": 2,
    "text": "2. What do you feel is the main point of improvement for yourself in a raiding environment?",
    "value": ""
  },
  {
    "id": 3,
    "text": "3. Why are you choosing to apply to Whatever?",
    "value": ""
  },
  {
    "id": 4,
    "text": "4. What do you expect from Whatever?",
    "value": ""
  },
  { 
    "id": 5,
    "text": "5. Tell us a bit about your history in WoW.",
    "value": ""
  },
  {
    "id": 6,
    "text": "6. Which of your alternative characters would you play in Alt Raid content, and why?",
    "value": ""
  },
  {
    "id": 7,
    "text": "7. Tell us a little bit about yourself; what drives you inside and outside of Azeroth.",
    "value": ""
  },
  {
    "id": 8,
    "text": "8. Finally, how did you hear about us?",
    "value": ""
  },
  {
    "id": 9,
    "text": "9. Anything you feel we must know about you that wasn't asked?",
    "value": ""
  },
  {
    "id": 10,
    "text": "10. Add your battletag so we can contact you easily.",
    "value": ""
  }
];

const REALMS = [
  "aaa",
  "bbb",
  "ccc"
];

const CLASSES: BattleNet.CharacterClass[] = [
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

const questionListReducer = (state = questions, action) => {
  switch (action.type){
      case "QUESTION_VALUE_CHANGED": 
      return state.map(q => questionReducer(q, action));
    default: return state;
  }
};

const questionReducer = (state = {}, action) => {
  switch(action.type) {
    case "QUESTION_VALUE_CHANGED": 
      if (state.id !== action.id) {
        return state;
      }
      return {
      ...state,
      value: action.value
      };

    default: return state;
  }
  
}

const Question = ({
  value,
  text,
  onValueChange
}) => (
  <li className="mui-textfield mui-textfield--float-label">
  <textarea
  required={true}
  defaultValue={value}
  rows={5}
  onBlur={(e) => {
  if (e.target.value !== value) {
    onValueChange(e.target.value);
  }
}}
/>
  <label>{text}</label>
  </li>
  
);


const questionValueChanged = (id, value) => {
  store.dispatch({
    type: "QUESTION_VALUE_CHANGED",
    value,
    id
  });
  store.dispatch({
    type: "VALIDATE_QUESTIONS",
    value,
    id
  });
};

const QuestionList = ({
  questions,
  onQuestionValueChange
}) => (

  <ul className="mui-list--unstyled"> 
    {
     questions.map(q => <Question key={q.id} text={q.text} value={q.value} onValueChange={(v) => questionValueChanged(q.id, v)} />)
    }
  
  </ul>
  
);


const CharacterInput = ({
  name,
  realm,
  characterClass,
  primarySpec,
  secondarySpec,
  realms = [],
  classes = [],
  onNameChange,
  onRealmChange,
  onClassChange,
  onPrimarySpecChange,
  onSecondarySpecChange,
  onUiUrlChange
}) => (
   <Panel >
                <Row>
                    <Col md={12} className="mui-textfield mui-textfield--float-label">
                        <input
                            type="text"                           
                            required={true}
                            defaultValue={name}
   onBlur={(e) => {
  if (e.target.value !== name) {
    onNameChange(e.target.value);
  }
}}
                            />
                        <label>Name</label>
                    </Col>
                    <Col md={12}>
                        <div className="mui-dropdown" style={{ width: 100 + "%" }}>
                            <button className="mui-btn mui-btn--light" data-mui-toggle="dropdown" style={{ width: 100 + "%" }}>
                                {realm || "Realm"}
                                <span className="mui-caret" />
                            </button>
                            <ul className="mui-dropdown__menu realm-list" style={{ width: 100 + "%" }}>
                                {
                                    realms.map((x, i) => <li key={i}><a onClick={() => onRealmChange(x)}>{x}</a></li>)
                                }
                            </ul>
                        </div>
                    </Col>
                            <Col md={12}>
                        <div className="mui-dropdown" style={{ width: 100 + "%" }}>
                            <button className="mui-btn mui-btn--light" data-mui-toggle="dropdown" style={{ width: 100 + "%" }}>
                                {characterClass || "Class"}
                                <span className="mui-caret" />
                            </button>
                            <ul className="mui-dropdown__menu realm-list" style={{ width: 100 + "%" }}>
                                {
                                    classes.map((x, i) => <li key={i}><a onClick={() => onClassChange(x.name)}>{x.name}</a></li>)
                                }
                            </ul>
                        </div>
                    </Col>
                            { characterClass ?
                               <Col md={12}>
                        <div className="mui-dropdown" style={{ width: 100 + "%" }}>
                            <button className="mui-btn mui-btn--light" data-mui-toggle="dropdown" style={{ width: 100 + "%" }}>
                                {primarySpec || "Primary Spec"}
                                <span className="mui-caret" />
                            </button>
                            <ul className="mui-dropdown__menu realm-list" style={{ width: 100 + "%" }}>
                                {
                                    (classes.filter(c => c.name === characterClass)[0]).specs
                              .map((x, i) => <li key={i}><a onClick={() => onPrimarySpecChange(x.name)}>{x.name}</a></li>)
                                }
                            </ul>
                        </div>
                    </Col>
                            : ""
            }
             { characterClass ?
                               <Col md={12}>
                        <div className="mui-dropdown" style={{ width: 100 + "%" }}>
                            <button className="mui-btn mui-btn--light" data-mui-toggle="dropdown" style={{ width: 100 + "%" }}>
                                {secondarySpec || "Secondary Spec"}
                                <span className="mui-caret" />
                            </button>
                            <ul className="mui-dropdown__menu realm-list" style={{ width: 100 + "%" }}>
                                {
                                    (classes.filter(c => c.name === characterClass)[0]).specs
                              .map((x, i) => <li key={i}><a onClick={() => onSecondarySpecChange(x.name)}>{x.name}</a></li>)
                                }
                            </ul>
                        </div>
                    </Col>
                            : ""
            }
                </Row>               
            </Panel>
  
);


const characterNameChange = (id, value) => {
  store.dispatch({
    type: "APPLICATION_CHARACTER_NAME_CHANGED",
    value,
    id
  });
  store.dispatch({
    type: "VALIDATE_CHARACTERS",
    value,
    id
  });
};

const characterRealmChange = (id, value) => {
  store.dispatch({
    type: "APPLICATION_CHARACTER_REALM_CHANGED",
    value,
    id
  });
  store.dispatch({
    type: "VALIDATE_CHARACTERS",
    value,
    id
  });
};

const characterClassChange = (id, value) => {
  store.dispatch({
    type: "APPLICATION_CHARACTER_CLASS_CHANGED",
    value,
    id
  });
  store.dispatch({
    type: "VALIDATE_CHARACTERS",
    value,
    id
  });
};


const characterPrimarySpecChange = (id, value) => {
  store.dispatch({
    type: "APPLICATION_CHARACTER_PRIMARY_SPEC_CHANGED",
    value,
    id
  });
  store.dispatch({
    type: "VALIDATE_CHARACTERS",
    value,
    id
  });
};



const characterSecondarySpecChange = (id, value) => {
  store.dispatch({
    type: "APPLICATION_CHARACTER_SECONDARY_SPEC_CHANGED",
    value,
    id
  });
  store.dispatch({
    type: "VALIDATE_CHARACTERS",
    value,
    id
  });
};

const addCharacter = () => {
  store.dispatch({
    type: "ADD_CHARACTER"
  });
  store.dispatch({
    type: "VALIDATE_CHARACTERS"
  });
};

const removeCharacter = (id) => {
  store.dispatch({
    type: "REMOVE_CHARACTER",
    id
  });
  store.dispatch({
    type: "VALIDATE_CHARACTERS",
    value,
    id
  });
};



const CharacterList = ({
  characters
}) => (
  <Panel>
    <Row>
   <Col xs={12} className="app-title">
  <h2 className="app-title">Characters</h2>
  </Col>
  <Col xs={12} sm={8} md={6}  className="mui--pull-right">
  <button type="button" className="mui-btn btn-primary" style={{ width: '100%' }} onClick={() => addCharacter() }>Add Character</button>
  </Col>
</Row>
<Row>
 <ul className="mui-list--unstyled"> 
    
  {
     characters.map((c,i) => (    
   <li key={c.id}>
                                        <Col md={16} md-offset={4}>
                                            <CharacterInput  name={c.name} realm={c.realm} characterClass={c.class}
  primarySpec={c.primarySpec} secondarySpec={c.secondarySpec} realms={REALMS} classes={CLASSES}
  onNameChange={(n) => characterNameChange(c.id, n)}  onRealmChange={(n) => characterRealmChange(c.id, n)}
 onClassChange={(n) => characterClassChange(c.id, n)}
 onPrimarySpecChange={(n) => characterPrimarySpecChange(c.id, n)}
 onSecondarySpecChange={(n) => characterSecondarySpecChange(c.id, n)}/>
                                        </Col>
                                        {i !== 0
                                            ? (<Col md={4}>
                                                <button type="button" className="mui-btn btn-primary" onClick={() => removeCharacter(c.id) }>Remove</button>
                                            </Col>)
                                            : ""
                                        }
                                    </li>))
}
 </ul>
</Row>
  </Panel>
);


const Form = ({
  characters,
  questions,
  errors,
  submitted
})  => (
  <div>
     <CharacterList characters={characters} />
     <QuestionList questions={questions} />
     <button type="button" className="mui-btn btn-primary" disabled={errors.questions.length !== 0 || errors.characters.length !== 0 || submitted} onClick={() =>  store.dispatch({type:"SUBMIT_FORM"})
} >Submit</button>
    </div>
);

const validateQuestion = (question) => {
 if (!question.value) {
   return {
     name: "required",
     object: "question", 
     id: question.id
   };
 }
  return false;
};

const validateCharacter = (character, uiUrlRequired = false) => {
  if (!character.name) {
    return {
     name: "required",
     object: "character.name", 
     id: character.id
   };
  }
  if (!character.realm) {
    return {
     name: "required",
     object: "character.realm", 
     id: character.id
   };
  }
  if (!character.class) {
    return {
     name: "required",
     object: "character.class", 
     id: character.id
   };
  }
  if (!character.primarySpec) {
    return {
     name: "required",
     object: "character.primarySpec", 
     id: character.id
   };
  }
  if (!character.secondarySpec) {
    return {
     name: "required",
     object: "character.secondarySpec", 
     id: character.id
   };
  }
  if (!character.uiUirl && uiUrlRequired) {
    return {
     name: "required",
     object: "character.uiUrl", 
     id: character.id
   };
  }
};

const errorReducer = (state = {}, action, formState) => {
  let _questions = formState.questions || questions;
  let _characters = formState.characters || [createCharacter()];
  if (action.type === "@@INIT") {
    return {
       characters: _characters.map((q, i) => validateCharacter(q, i === 0))
      .filter(e => !!e),
    questions: _questions.map(q => validateQuestion(q))
      .filter(e => !!e)
  };
  }
  if (action.type === "VALIDATE_QUESTIONS"){
   return {
    ...state,
    questions: _questions.map(q => validateQuestion(q))
      .filter(e => !!e)
  };

  }
  if (action.type === "VALIDATE_CHARACTERS"){
    return {
      ...state,
      characters: _characters.map((q, i) => validateCharacter(q, i === 0))
      .filter(e => !!e)
    };
  }
  return state;
};

const submitReducer = (state = false, action) => {
  if (action.type === "SUBMIT_FORM") {
    return true;
  }
  return state;
};

const createCharacter = () => {
  return {
          id: new Date().getTime(),
          name: "",
          realm: "",
          class: "",
          primarySpec: "",
          secondarySpec: ""
  };
};

const characterListReducer = (state = [createCharacter()], action) => {
  if (action.type.startsWith("APPLICATION_CHARACTER")) {
    return state.map(c => characterReducer(c, action));
  }
  switch (action.type) {
    case "ADD_CHARACTER":
      return [
        ...state,
        createCharacter()
      ];
    case "REMOVE_CHARACTER":
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.id){
            return [
            ...state.slice(0, i),
            ...state.slice(i +1)
            ];
        }
      }
      return state;
    default: return state;
  }
};

const characterReducer = (state = createCharacter(), action) => {
  if (state.id !== action.id) {
        return state;
      }
   switch(action.type) {
    case "APPLICATION_CHARACTER_NAME_CHANGED":       
      return {
      ...state,
      name: action.value
      };
     case "APPLICATION_CHARACTER_REALM_CHANGED":       
      return {
      ...state,
      realm: action.value
      };
      case "APPLICATION_CHARACTER_CLASS_CHANGED":       
      return {
      ...state,
      "class": action.value
      };
       case "APPLICATION_CHARACTER_PRIMARY_SPEC_CHANGED":       
      return {
      ...state,
       primarySpec: action.value
      };
       case "APPLICATION_CHARACTER_SECONDARY_SPEC_CHANGED":       
      return {
      ...state,
       secondarySpec: action.value
      };
       case "APPLICATION_CHARACTER_UI_URL_CHANGED":       
      return {
      ...state,
       uiURL: action.value
      };
    default: return state;
  }
};

const form = (state = {}, action) => {
  return {
    characters: characterListReducer(state.characters, action),
    questions: questionListReducer(state.questions, action),
    errors: errorReducer(state.errors, action, state),
    submitted: submitReducer(state.submited, action)
  };
};


const store = createStore(form, window.devToolsExtension && window.devToolsExtension());

const render = () => {
  ReactDOM.render(
  <Form questions={store.getState().questions} errors={store.getState().errors} submitted={store.getState().submitted} characters={store.getState().characters}/>,
  document.getElementById("root"));
};


store.subscribe(render);
render();