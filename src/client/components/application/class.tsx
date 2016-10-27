import { CharacterClass } from '../../../models/wow';
import { State } from '../../states/state';
import { bindActionCreators } from 'redux';

import * as React from "react";
import { connect } from 'react-redux';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

interface CharacterClassSelectorProps {
  classes?: CharacterClass[];
  data?: {
    label?: string;
  }
  meta?: any;
  input?: any;
}
const CharacterClassSelector: React.StatelessComponent<CharacterClassSelectorProps> = (props: CharacterClassSelectorProps) => {
  return (
    <div>
      <SelectField
        value={props.input.value}
        errorText={props.meta.touched && props.meta.error}
        onChange={(e, key, payload) => props.input.onChange(payload)}
        floatingLabelText={props.data.label}
        >
        {
          props.classes.map((x, i) => <MenuItem key={i} value={x.name} primaryText={x.name} />)
        }
      </SelectField>
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
