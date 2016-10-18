import { SelectCharacterClassAction, SELECT_CHARACTER_CLASS } from '../../../actions';
import { CharacterClass } from '../../../models/wow';
import { State } from '../../states/state';
import { bindActionCreators } from 'redux';

import * as React from "react";
import { connect } from 'react-redux';

interface RealmSelectorProps {
  value?: string;
  realms?: string[];
  onSelect?: (value: string) => void;
}
const RealmSelector: React.StatelessComponent<RealmSelectorProps> = (props: RealmSelectorProps) => {
  return (
    <div>
      <div className="mui-dropdown" style={{ width: 100 + "%" }}>
        <button className="mui-btn mui-btn--light" data-mui-toggle="dropdown" style={{ width: 100 + "%" }}>
          {props.value || "Realm"}
          <span className="mui-caret" />
        </button>
        <ul className="mui-dropdown__menu realm-list" style={{ width: 100 + "%" }}>
          {
            props.realms.map((x, i) => <li key={i}><a onClick={() => props.onSelect && props.onSelect(x)}>{x}</a></li>)
          }
        </ul>
      </div>
    </div>
  );
};

const mapClassStateToProps = (state: State) => {
  const props: RealmSelectorProps = {
    realms: state.wow.realms
  };
  return props;
};

export const RealmSelectorContainer: React.ComponentClass<RealmSelectorProps> = connect(mapClassStateToProps)(RealmSelector);
