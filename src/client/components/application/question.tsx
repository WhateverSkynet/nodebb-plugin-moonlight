import * as React from "react";

import { Field, FieldArray } from 'redux-form';

import TextField from 'material-ui/TextField';

const renderTextField = ({ data, input, label, meta: { touched, error } }) => {
    return (
        <TextField
            className="col-sm-12"
            floatingLabelText={data.label}
            multiLine={true}
            fullWidth={true}
            floatingLabelFixed={true}
            errorText={touched && error}
            rows={5}
            defaultValue={input.value}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            />
    );
};

const renderQuestions = ({fields, data, meta: {touched: error}}) => (
    <ul className="mui-list--unstyled">
        {data.questions.map((q, index) => {
            return (
                <li key={index}>
                    <Field name={`questions[${index}].value`} component={renderTextField} type="textarea" data={{label:`${index}. ${data.questions[index].text}`}} />
                </li>
            )
        }

        )}

    </ul>
);


export const QuestionListContainer = renderQuestions;