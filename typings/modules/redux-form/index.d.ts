/**
 * Type definitions for Redux-form v6.
 * Updated for 6.0.0-rc.3 including splitting of Field properties to 'input'.
 */
import { Component, ComponentClass, StatelessComponent, ReactElement, ReactEventHandler, SyntheticEvent } from 'react';
import {Dispatch, Reducer, Action} from 'redux';

declare namespace ReduxForm {

    export type FieldValue = any;

    export type DataShape = {[fieldName: string]: FieldValue};

    export type FormErrors<FormData extends DataShape> = FormData & { _error?: string };

    /**
     * A component class or stateless function component.
     * Workaround for: ComponentClass<P> | SFC<P> which does
     * not resolve due to a bug in TypeScript.
     * https://github.com/Microsoft/TypeScript/pull/8674
     */
    type ComponentConstructor = ComponentClass<any> | StatelessComponent<any>;

    export interface InputFieldProps<P> {
        /**
         * A string path, in dot-and-bracket notation, corresponding to a value
         * in the form values. It may be as simple as 'firstName' or as complicated
         * as contact.billing.address[2].phones[1].areaCode.
         *
         * Required but made optional so interface can be used on decorated components.
         */
        name?: string;

        /**
         * A Component, stateless function, or string corresponding to a default
         * JSX element.
         *
         * Required but made optional so interface can be used on decorated components.
         */
        component?: ComponentConstructor | "input" | "select" | "textarea",
        // component?: ComponentClass<P> | SFC<P> | "input" | "select" | "textarea",

        /**
         * A value to be used if the current value for this field is undefined in the
         * Redux Store. Defaults to '' to ensure that the input is controlled.
         */
        defaultValue?: FieldValue;

        /**
         * If true, the rendered component will be available with the
         * getRenderedComponent() method. Defaults to false. Cannot be used if your
         * component is a stateless function component.
         */
        withRef?: boolean;

        props?: Object;

        value?: string | number | boolean;

        /**
         * Required to Field for it to apply rules for derived attributes
         * like checked for checkbox and radio inputs.
         */
        type?: string;

        /**
         * Useful to be able to spec
         */
        id?: string;
        data?: any;
        normalize?: any;
    }

    export class Field<P> extends Component<InputFieldProps<P>, {}> {
        /**
         * true if the current value is different from the initialized value,
         * false otherwise.
         */
        dirty: boolean;

        /**
         * The name prop that you passed in.
         */
        name: string;

        /**
         * true if the current value is the same as the initialized value,
         * false otherwise.
         */
        pristine: boolean;

        /**
         * The current value of the field.
         */
        value: FieldValue;

        /**
         * Returns the instance of the rendered component. For this to work, you must
         * provide a withRef prop, and your component must not be a stateless function
         * component.
         */
        getRenderedComponent(): Component<FieldProps<P>, any>;
    }


    /**
     * These are the input field safe properties that `Field` will pass to your wrapped component.
     * 6.0.0-rc2 split props to 'input' sub field due to React 15.2.0 unknown prop warnings.
     */
    export interface BaseInputProps {
        /**
         * An alias for value only when value is a boolean. Provided for
         * convenience of destructuring the whole field object into the props of a
         * form element.
         */
        checked?: boolean;

        /**
         * The name prop passed in.
         */
        name: string;

        /**
         * A function to call when the form field loses focus. It expects to
         * either receive the React SyntheticEvent or the current value of the
         * field.
         */
        onBlur(eventOrValue: SyntheticEvent<HTMLInputElement> | FieldValue): void;

        /**
         * A function to call when the form field is changed. It expects to either
         * receive the React SyntheticEvent or the new value of the field.
         */
        onChange(eventOrValue: SyntheticEvent<HTMLInputElement> | FieldValue): void;

        /**
         * A function to call when the form field receives a 'dragStart' event.
         * Saves the field value in the event for giving the field it is dropped
         * into.
         */
        onDragStart(): void;

        /**
         * A function to call when the form field receives a drop event.
         */
        onDrop(): void;

        /**
         * A function to call when the form field receives focus.
         */
        onFocus(): void;

        /**
         * The value of this form field. It will be a boolean for checkboxes, and
         * a string for all other input types. If there is no value in the Redux
         * state for this field, it will default to the defaultValue prop given to
         * Field. If no such defaultValue is specified, it will be ''. This is to
         * ensure that the input is controlled.
         */
        value: FieldValue;
    }


    /**
     * These are props that `Field` will pass to your wrapped component.
     */
    export interface FieldProps<MyFieldProps> {

        /**
         * true if this field currently has focus. It will only work if you are
         * passing onFocus to your input element.
         */
        active: boolean;

        /**
         * true if the form is currently running asynchronous validation because this
         * field was blurred.
         */
        asyncValidating: boolean;

        /**
         * true if the field value has changed from its initialized value.
         * Opposite of pristine.
         */
        dirty: boolean;

        /**
         * The error for this field if its value is not passing validation. Both
         * synchronous, asynchronous, and submit validation errors will be reported here.
         */
        error?: string;

        /**
         * true if the field value fails validation (has a validation error).
         * Opposite of valid.
         */
        invalid: boolean;

        /**
         * true if the field value is the same as its initialized value. Opposite
         * of dirty.
         */
        pristine: boolean;

        /**
         * true if the field has been touched. By default this will be set when
         * the field is blurred.
         */
        touched: boolean;

        /**
         * true if the field value passes validation (has no validation errors).
         * Opposite of invalid.
         */
        valid: boolean;

        /**
         * true if this field has ever had focus. It will only work if you are
         * passing onFocus to your input element.
         */
        visited: boolean;

        /**
         * Property that contains properties that are for passing to input elements.
         * It also includes any of your own extra properties.
         */
        input: MyFieldProps & BaseInputProps;

    }

    export interface InputFieldArrayProps<P> {
        /**
         * A string path, in dot-and-bracket notation, corresponding to a value
         * in the form values. It may be as simple as 'firstName' or as complicated
         * as contact.billing.address[2].phones[1].areaCode.
         *
         * Required but made optional so interface can be used on decorated components.
         */
        name?: string;

        /**
         * A Component or stateless function to render the field array.
         *
         * Required but made optional so interface can be used on decorated components.
         */
        component?: ComponentConstructor,
        // component?: Component<P, any> | StatelessComponent<P>,

        /**
         * If true, the rendered component will be available with the
         * getRenderedComponent() method. Defaults to false. Cannot be used if your
         * component is a stateless function component.
         */
        withRef?: boolean;

        props?: Object;
        data?: any;
    }

    export class FieldArray<T, P> extends Component<InputFieldArrayProps<P>, {}> {

        /**
         * The name prop that you passed in.
         */
        name: string;

        /**
         * true if this field passes validation, false otherwise.
         */
        valid: boolean;

        /**
         * Returns the instance of the rendered component. For this to work, you must
         * provide a withRef prop, and your component must not be a stateless function
         * component.
         */
        getRenderedComponent(): Component<P & FieldArrayProps<T>, any>;
    }

    export interface FieldArrayProps<T> {
        /**
         * true if the any of the fields in the field array have changed from their
         * initialized value. Opposite of pristine.
         */
        dirty: boolean;

        /**
         * The error for this field array if its value is not passing validation. Both
         * synchronous, asynchronous, and submit validation errors will be reported here.
         * Array-specific errors should be returned from the validation function as an
         * _error key on the array.
         */
        error?: string

        /**
         * A method to iterate over each value of the array.
         */
        forEach(callback: (name: string, index: number) => void): void;

        /**
         * A function to insert a new value into the array at any arbitrary index.
         */
        insert(index: number, value: T): void;

        /**
         * true if the field array value fails validation (has a validation error).
         * Opposite of valid.
         */
        invalid: boolean;

        /**
         * The current length of the array.
         */
        length: number;

        /**
         * A method to iterate over each value of the array. Returns an array of the
         * results of each call to the callback.
         */
        map(callback: (name: string, index: number) => any): any;

        /**
         * Removes an item from the end of the array. Returns the item removed.
         */
        pop(): T;

        /**
         * true if the all of the fields in the field array are the same as their
         * initialized value. Opposite of dirty.
         */
        pristine: boolean;

        /**
         * Adds a value to the end of the array.
         */
        push(value: T): void;

        /**
         * Removes an item from the array at an arbitrary index.
         */
        remove(index: number): void;

        /**
         * Removes an item from beginning of the array. Returns the item removed.
         */
        shift(): T;

        /**
         * Swaps two items in the array at the given indexes.
         */
        swap(indexA: number, indexB: number): void;

        /**
         * Adds an item to the beginning of the array.
         */
        unshift(value: T): void;

        /**
         * true if the field value passes validation (has no validation errors).
         * Opposite of invalid.
         */
        valid: boolean;
    }

    export interface FieldArrayRenderProps<T> {
        fields: FieldArrayProps<T>;
        name: string;
    }

    /**
     * A throwable error that is used to return submit validation errors from onSubmit.
     * The purpose being to distinguish promise rejection because of validation errors
     * from promise rejection because of AJAX I/O problems or other server errors.
     */
    export class SubmissionError<FormData extends DataShape> extends Error {
        constructor(errors?: FormErrors<FormData>);
    }

    export interface Selector<State> {
        (state: State, ...field: string[]): Object
    }

    /**
     * A "selector" API to make it easier to connect() to form values. Creates a selector
     * function for your form that can be used with your field names.
     */
    export function formValueSelector<State>(form: string, getFormState?: () => State): Selector<State>;

    /**
     * The following are methods or properties that you can access on an instance
     * of your decorated form component (outermost component named "ReduxForm").
     */
    export interface Form<FormData extends DataShape, P, S> extends Component<P, any> {
        /**
         * true if the form data has changed from its initialized values. Opposite
         * of pristine.
         */
        dirty?: boolean;

        /**
         * An array of strings representing all the fields in the form.
         * Mainly useful for testing.
         */
        fieldList?: string[];

        /**
         * true if the form has validation errors. Opposite of valid.
         */
        invalid?: boolean;

        /**
         * true if the form data is the same as its initialized values. Opposite
         * of dirty.
         */
        pristine?: boolean;

        /**
         * Resets all the values in the form to the initialized state, making it
         * pristine again.
         */
        reset?(): void;

        /**
         * Submits the form. Returns a promise that will be resolved when the form
         * is submitted successfully, or rejected if the submission fails.
         */
        submit?(): Promise<any>;

        /**
         * true if the form passes validation (has no validation errors). Opposite
         * of invalid.
         */
        valid?: boolean;

        /**
         * The current values of all the fields in the form.
         */
        values?: FormData;

        /**
         * A reference to the instance of the component you decorated with reduxForm().
         * Mainly useful for testing.
         */
        wrappedInstance?: ReactElement<P & FormProps<FormData, S>>
    }

    /**
     * These are the props that will be passed to your form component.
     * Your form component's props can extend this interface.
     */
    export interface FormProps<FormData extends DataShape, S> {
        /**
         * true if any of the fields have been marked as touched, false otherwise.
         */
        anyTouched?: boolean;

        /**
         * A function that may be called to initiate asynchronous validation if
         * asynchronous validation is enabled.
         */
        asyncValidate?: () => void;

        /**
         * This value will be either:
         * - false - No asynchronous validation is currently happening
         * - true - Asynchronous validation is currently running in preparation to submit a form
         * - a string - The name of the field that just blurred to trigger asynchronous validation
         */
        asyncValidating?: string | boolean;

        /**
         * Destroys the form state in the Redux store. By default, this will be
         * called for you in componentWillUnmount().
         */
        destroy?(): void;

        /**
         * true if the form data has changed from its initialized values. Opposite
         * of pristine.
         */
        dirty?: boolean;

        /**
         * A generic error for the entire form given by the _error key in the
         * result from the synchronous validation function, the asynchronous
         * validation, or the rejected promise from onSubmit.
         */
        error?: string;

        /**
         * The form name that you gave to the reduxForm() decorator or the prop you
         * passed in to your decorated form component.
         */
        form?: string;

        /**
         * A function meant to be passed to <form onSubmit={handleSubmit}> or to
         * <button onClick={handleSubmit}>. It will run validation, both sync and
         * async, and, if the form is valid, it will call
         * this.props.onSubmit(data) with the contents of the form data.
         *
         * Optionally, you may also pass your onSubmit function to handleSubmit
         * which will take the place of the onSubmit prop. For example: <form
         * onSubmit={handleSubmit(this.save.bind(this))}>
         *
         * If your onSubmit function returns a promise, the submitting property
         * will be set to true until the promise has been resolved or rejected.
         * If it is rejected with an object like
         * new SubmissionError({ field1: 'error', field2: 'error' })
         * then the submission errors will be added to each field (to the error
         * prop) just like async validation errors are. If there is an error that
         * is not specific to any field, but applicable to the entire form, you
         * may pass that as if it were the error for a field called _error, and
         * it will be given as the error prop.
         */
        handleSubmit?(event: SyntheticEvent<HTMLFormElement>): void; // same as ReactEventHandler

        handleSubmit?(submit: SubmitHandler<FormData, S>): ReactEventHandler<HTMLFormElement>;

        /**
         * Initializes the form data to the given values. All dirty and pristine
         * state will be determined by comparing the current data with these
         * initialized values.
         */
        initialize?(data: FormData): void;

        /**
         * true if the form has validation errors. Opposite of valid.
         */
        invalid?: boolean;

        /**
         * true if the form data is the same as its initialized values. Opposite
         * of dirty.
         */
        pristine?: boolean;

        /**
         * Resets all the values in the form to the initialized state, making it
         * pristine again.
         */
        reset?(): void;

        /**
         * Whether or not your form is currently submitting. This prop will only
         * work if you have passed an onSubmit function that returns a promise. It
         * will be true until the promise is resolved or rejected.
         */
        submitting?: boolean;

        /**
         * Starts as false. If onSubmit is called, and fails to submit for any
         * reason, submitFailed will be set to true. A subsequent successful
         * submit will set it back to false.
         */
        submitFailed?: boolean;

        /**
         * Marks the given fields as "touched" to show errors.
         */
        touch?(...field: string[]): void;

        /**
         * Clears the "touched" flag for the given fields
         */
        untouch?(...field: string[]): void;

        /**
         * true if the form passes validation (has no validation errors). Opposite
         * of invalid.
         */
        valid?: boolean;
    }

    export function reduxForm<T extends ComponentConstructor, FormData extends DataShape, P, S>(
        config: Config<FormData, P, S>
    ): FormDecorator<T, FormData, P, S>;

    interface FormDecorator<T extends ComponentClass<P> | StatelessComponent<P>, FormData extends DataShape, P, S> {
        (component: T): T & Form<FormData, P, S>;
    }

    export interface Config<FormData extends DataShape, P, S> {
        /**
         * the name of your form and the key to where your form's state will be
         * mounted under the redux-form reducer
         */
        form: string;

        /**
         * An adapter function that will render a component based on a string component
         * type and the props given to a Field. Remember that all you really need to hook
         * up to your custom component's value and onChange. Defaults to [].
         *
         * See Asynchronous Blur Validation Example for more details.
         */
        adapter?: (component: string, props: Object) => ReactElement<any>;

        /**
         * field names for which onBlur should trigger a call to the asyncValidate
         * function. Defaults to [].
         *
         * See Asynchronous Blur Validation Example for more details.
         */
        asyncBlurFields?: string[];

        /**
         * a function that takes all the form values, the dispatch function, and
         * the props given to your component, and returns a Promise that will
         * resolve if the validation is passed, or will reject with an object of
         * validation errors in the form { field1: <String>, field2: <String> }.
         *
         * See Asynchronous Blur Validation Example for more details.
         */
        asyncValidate?(values: FormData, dispatch: Dispatch<S>, props: P): Promise<any>;

        /**
         * Whether or not to automatically destroy your form's state in the Redux
         * store when your component is unmounted. Defaults to true.
         */
        destroyOnUnmount?: boolean;

        /**
         * A function that takes the entire Redux state and returns the state slice
         * which corresponds to where the redux-form reducer was mounted. This
         * functionality is rarely needed, and defaults to assuming that the reducer
         * is mounted under the "form" key.
         */
        getFormState?(state: S): any;

        /**
         * The values with which to initialize your form in componentWillMount().
         * Particularly useful when Editing Multiple Records, but can also be used
         * with single-record forms. The values should be in the form
         * { field1: 'value1', field2: 'value2' }.
         */
        initialValues?: FormData;

        /**
         * The function to call with the form data when the handleSubmit() is fired
         * from within the form component. If you do not specify it as a prop here,
         * you must pass it as a parameter to handleSubmit() inside your form
         * component.
         */
        onSubmit?: SubmitHandler<FormData, S>;

        /**
         * If specified, all the props normally passed into your decorated
         * component directly will be passed under the key specified. Useful if
         * using other decorator libraries on the same component to avoid prop
         * namespace collisions.
         */
        propNamespace?: string;

        /**
         * The use of this property is highly discouraged, but if you absolutely
         * need to mount your redux-form reducer at somewhere other than form in
         * your Redux state, you will need to specify the key you mounted it under
         * with this property. Defaults to 'form'.
         *
         * See Alternate Mount Point Example for more details.
         */
        reduxMountPoint?: string;

        /**
         * If set to true, a failed submit will return a rejected promise. Defaults
         * to false. Only use this if you need to detect submit failures and run
         * some code when a submit fails.
         */
        returnRejectedSubmitPromise?: boolean;

        /**
         * An optional function you may provide to have full control over when async
         * validation happens.
         */
        shouldAsyncValidate?(params: AsyncValidateCallback<FormData>): boolean;

        /**
         * marks fields as touched when the blur action is fired. Defaults to true.
         */
        touchOnBlur?: boolean;

        /**
         * marks fields as touched when the change action is fired. Defaults to
         * false.
         */
        touchOnChange?: boolean;

        /**
         * a synchronous validation function that takes the form values and props
         * passed into your component. If validation passes, it should return {}.
         * If validation fails, it should return the validation errors in the form
         * { field1: <String>, field2: <String> }.
         * Defaults to (values, props) => ({}).
         */
        validate?(values: FormData): FormErrors<FormData>;
    }

    export interface SubmitHandler<FormData extends DataShape, S> {
        // Promise should be rejected with FormErrors<FormData> but the definition has that as "any" -__-
        (values: FormData, dispatch?: Dispatch<S>): void | FormErrors<FormData> | Promise<any>;
    }

    export interface AsyncValidateCallback<FormData extends DataShape> {
        /**
         * Any existing asynchronous validation errors
         */
        asyncErrors?: FormErrors<FormData>;

        /**
         * true if the form has ever been initialized with initial values
         */
        initialized: boolean;

        /**
         * The reason to possibly run async validation. It will either be: 'blur' or
         * 'submit', depending on whether an async blur field had triggered the async
         * validation or if submitting the form has triggered it, respectively.
         */
        trigger: 'blur' | 'submit';

        /**
         * The name of the field that has triggered the async validation. May be undefined.
         */
        blurredField?: string;

        /**
         * true if the form is pristine, false if it is dirty
         */
        pristine: boolean;

        /**
         * true if synchronous validation is passing, false if it is failing.
         */
        syncValidationPasses: boolean;
    }

    interface FormReducerMapObject {
        [formName: string]: Reducer<any>;
    }

    interface FormReducer {
        /**
         * Returns a form reducer that will also pass each action through
         * additional reducers specified. The parameter should be an object mapping
         * from formName to a (state, action) => nextState reducer. The state
         * passed to each reducer will only be the slice that pertains to that
         * form.
         */
        plugin(reducers: FormReducerMapObject): Reducer<any>;
    }

    export function reducer<S>(state: S, action: Action): S | FormReducer;

    /**
     * Action creators
     */

    /**
     * Inserts an item into a field array at the specified index
     */
    export function arrayInsert(form: string, field: string, index: number, value: any): Action;

    /**
     * Removes an item from the end of a field array
     */
    export function arrayPop(form: string, field: string): Action;

    /**
     * Appends an item to the end of a field array
     */
    export function arrayPush(form: string, field: string, value: any): Action;

    /**
     * Removes an item at the specified index from a field array
     */
    export function arrayRemove(form: string, field: string, index: number): Action;

    /**
     * Removes an item from the beginning of a field array
     */
    export function arrayShift(form: string, field: string): Action;

    /**
     * ADVANCED USAGE - Inserts and/or removes items from a field array. Works similarly to Array.splice.
     */
    export function arraySplice(form: string, field: string, index: number, removeNum: number, value: any): Action;

    /**
     * Swaps two items at the specified indexes in a field array
     */
    export function arraySwap(form: string, field: string, indexA: number, indexB: number): Action;

    /**
     * Inserts an item at the beginning of a field array
     */
    export function arrayUnshift(form: string, field: string, value: any): Action;

    /**
     * Saves the value to the field
     */
    export function blur(form: string, field: string, value: any): Action;

    /**
     * Saves the value to the field
     */
    export function change(form: string, field: string, value: any): Action;

    /**
     * Destroys the form, removing all it's state
     */
    export function destroy(form: string): Action;

    /**
     * Marks the given field as active and visited
     */
    export function focus(form: string, field: string): Action;

    /**
     * Sets the initial values in the form with which future data values will be compared to calculate dirty and pristine.
     * The data parameter may contain deep nested array and object values that match the shape of your form fields.
     */
    export function initialize(form: string, data: Object): Action;

    /**
     * Registers a field with the given name and field type ('Field' or 'FieldArray') from the store.
     */
    export function registerField(form: string, name: string, type: 'Field' | 'FieldArray'): Action;

    /**
     * Resets the values in the form back to the values past in with the most recent initialize action.
     */
    export function reset(form: string): Action;

    /**
     * Flips the asyncValidating flag true
     */
    export function startAsyncValidation(form: string): Action;

    /**
     * Flips the submitting flag true.
     */
    export function startSubmit(form: string): Action;

    /**
     * Flips the submitting flag false and populates submitError for each field.
     */
    export function stopSubmit(form: string, errors?: Object): Action;

    /**
     * Flips the asyncValidating flag false and populates asyncError for each field.
     */
    export function stopAsyncValidation(form: string, errors?: Object): Action;

    /**
     * Marks all the fields passed in as touched.
     */
    export function touch(form: string, ...fields: string[]): Action;

    /**
     * Resets the 'touched' flag for all the fields passed in.
     */
    export function untouch(form: string, ...fields: string[]): Action;

    /**
     * Unregisters a field with the given name from the store.
     */
    export function unregisterField(form: string, name: string): Action;
}

export = ReduxForm;
