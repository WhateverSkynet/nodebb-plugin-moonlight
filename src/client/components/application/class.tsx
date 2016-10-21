import { SelectCharacterClassAction, SELECT_CHARACTER_CLASS } from '../../../actions';
import { CharacterClass } from '../../../models/wow';
import { State } from '../../states/state';
import { bindActionCreators } from 'redux';

import * as React from "react";
import { connect } from 'react-redux';

interface CharacterClassSelectorProps {
  value?: string;
  classes?: CharacterClass[];
  onSelect?: (value: string) => void;
}
const CharacterClassSelector: React.StatelessComponent<CharacterClassSelectorProps> = (props: CharacterClassSelectorProps) => {
  return (
    <div>
      <div className="mui-dropdown" style={{ width: 100 + "%" }}>
        <button className="mui-btn mui-btn--light" data-mui-toggle="dropdown" style={{ width: 100 + "%" }}>
          {props.value || "Class"}
          <span className="mui-caret" />
        </button>
        <ul className="mui-dropdown__menu" style={{ width: 100 + "%" }}>
          {
            props.classes.map((x, i) => <li key={i}><a onClick={() => props.onSelect && props.onSelect(x.name)}>{x.name}</a></li>)
          }
        </ul>
      </div>
    </div>
  );
};

const mapClassStateToProps = (state: State) => {
  const props: CharacterClassSelectorProps = {
    classes: state.wow.classes
  };
  return props;
};

export const CharacterClassSelectorContainer: React.ComponentClass<CharacterClassSelectorProps> = connect(mapClassStateToProps)(CharacterClassSelector);
