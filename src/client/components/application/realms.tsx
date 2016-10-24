import { SelectCharacterClassAction, SELECT_CHARACTER_CLASS } from '../../../actions';
import { CharacterClass } from '../../../models/wow';
import { State } from '../../states/state';
import { bindActionCreators } from 'redux';

import * as React from "react";
import { connect } from 'react-redux';

import AutoComplete from 'material-ui/AutoComplete';


//TODO: Type safe input
interface RealmSelectorProps {
  realms?: string[];
  onSelect?: (value: string) => void;
  input?: any;
  data?: {
    label?: string;
  }
  meta?: any;
}
const RealmSelector: React.StatelessComponent<RealmSelectorProps> = (props: RealmSelectorProps) => {
  return (
    <div>
      <AutoComplete
        floatingLabelText={props.data.label}
        filter={AutoComplete.fuzzyFilter}
        dataSource={props.realms}
        errorText={props.meta.error}
        searchText={props.input.value}
        maxSearchResults={5}
        onUpdateInput={props.input.onChange}
        onNewRequest={props.input.onChange}
        />
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
