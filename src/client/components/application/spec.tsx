import { SelectCharacterClassAction, SELECT_CHARACTER_CLASS } from '../../../actions';
import { CharacterClass, Specialization } from '../../../models/wow';
import { State } from '../../states/state';
import { bindActionCreators } from 'redux';

import * as React from "react";
import { connect } from 'react-redux';

interface CharacterSpecSelectorProps {
  value?: string;
  class?: string;
  label?: string;
  specs?: Specialization[];
  onSelect?: (value: string) => void;
}

const CharacterSpecSelector: React.StatelessComponent<CharacterSpecSelectorProps> = (props: CharacterSpecSelectorProps) => {
  return (
    <div>
      <div className="mui-dropdown" style={{ width: 100 + "%" }}>
        <button className="mui-btn mui-btn--light" data-mui-toggle="dropdown" style={{ width: 100 + "%" }}>
          {props.value || props.label || "Specialization"}
          <span className="mui-caret" />
        </button>
        <ul className="mui-dropdown__menu" style={{ width: 100 + "%" }}>
          {
            props.specs.map((x, i) => <li key={i}><a onClick={() => props.onSelect && props.onSelect(x.name)}>{x.name}</a></li>)
          }
        </ul>
      </div>
    </div>
  );
};

const mapClassStateToProps = (state: State, ownProps: CharacterSpecSelectorProps) => {
  const selectedClass = state.wow.classes.find(x => x.name === ownProps.class);
  const props: CharacterSpecSelectorProps = {
    specs: selectedClass && selectedClass.specs || []
  };
  return props;
};

export const CharacterSpecSelectorContainer: React.ComponentClass<CharacterSpecSelectorProps> = connect(mapClassStateToProps)(CharacterSpecSelector);
