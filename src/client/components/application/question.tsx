import * as React from "react";

import { Field, FieldArray } from 'redux-form';

import TextField from 'material-ui/TextField';
import { v4 } from 'uuid';
const renderTextField = ({ data, input, label, meta: { touched, error } }) => {
  return (
    <div>
      <label className="mnl-label">{data.label}</label>
      <TextField
        id={input.name + v4()}
        ref={node => {
          // For some reason default value is not used to update value when form is reinitialized
          if (node) {
            node.input.refs.input.value = input.value
          }
        }}
        name={input.name}
        multiLine={true}
        fullWidth={true}
        floatingLabelFixed={true}
        errorText={touched && error}
        rows={1}
        defaultValue={input.value}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
      />
    </div>
  );
};

const renderQuestions = ({ fields, data, meta: { touched: error } }) => (
  <ul className="list--unstyled">
    {data.questions.map((q, index) => {
      return (
        <li key={index}>
          <Field
            name={`questions[${index}].value`}
            component={renderTextField}
            type="textarea"
            data={{ label: `${index + 1}. ${data.questions[index].text}` }} />
        </li>
      )
    }

    )}

  </ul>
);


export const QuestionListContainer = renderQuestions;