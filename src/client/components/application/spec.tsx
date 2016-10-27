import { CharacterClass, Specialization } from '../../../models/wow';
import { State } from '../../states/state';
import { bindActionCreators } from 'redux';

import * as React from "react";
import { connect } from 'react-redux';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


interface CharacterSpecSelectorProps {
  data?: {
    class?: string;
    label?: string;
  }
  specs?: Specialization[];
  input?: any;
  meta?: any;
}

const CharacterSpecSelector: React.StatelessComponent<CharacterSpecSelectorProps> = (props: CharacterSpecSelectorProps) => {
  return (
    <div>
       <SelectField
          value={props.input.value}
          onChange={(e, key, payload) => props.input.onChange(payload)}
          errorText={props.meta.touched && props.meta.error}
          floatingLabelText={props.data.label}
          disabled={!props.data.class}
        >
           {
            props.specs.map((x, i) => <MenuItem key={i} value={x.name} primaryText={x.name} />)
          }
        </SelectField>
    </div>
  );
};

const mapClassStateToProps = (state: State, ownProps: CharacterSpecSelectorProps) => {
  const selectedClass = state.wow.classes.find(x => x.name === ownProps.data.class);
  const props: CharacterSpecSelectorProps = {
    specs: selectedClass && selectedClass.specs || []
  };
  return props;
};

export const CharacterSpecSelectorContainer: React.ComponentClass<CharacterSpecSelectorProps> = connect(mapClassStateToProps)(CharacterSpecSelector);
