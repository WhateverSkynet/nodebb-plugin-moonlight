// import { Subscription } from 'rxjs/Subscription';
// import { Subject } from 'rxjs/Subject';

// import * as React from "react";

// import TextField from 'material-ui/TextField';


// /**
//  * Check if a value is valid to be displayed inside an input.
//  *
//  * @param The value to check.
//  * @returns True if the string provided is valid, false otherwise.
//  */
// const isValid = function(value) {
//   return value !== '' && value !== undefined && value !== null;
// };


// export class MnlTextField extends TextField {
//     private subject = new Subject<string>();
//     private sub: Subscription;

//     private onChange: (event:any) => void;
//     constructor(props) {
//         super(props);
        
//     }
//     componentDidMount() {
//         this.sub = this.subject
//             .throttleTime(350)
//             .subscribe(x => {
//                 this.props.onChange && this.props.onChange(x);
//             });
//     }

//     componentWillUnmount() {
//         this.sub.unsubscribe();
//     }


//     private onChangeHandler(event: any) {
//         this.subject.next(event.target.value);
//     }
// }


// interface ObservableComponentProps<T> {
//     component: React.ComponentClass<T> | React.StatelessComponent<T>
// }


// export class ObservableInput<T> extends React.Component<ObservableInput<T>, {}> {

//     private subject = new Subject<string>();
//     private sub: Subscription;

//     private onChange: (event:any) => void;
//     constructor(props) {
//         super(props);
        
//     }
//     componentDidMount() {
//         this.sub = this.subject
//             .throttleTime(350)
//             .subscribe(x => {
//                 this.props.onChange && this.props.onChange(x);
//             });
//     }

//     componentWillUnmount() {
//         this.sub.unsubscribe();
//     }


//     private onChangeHandler(event: any) {
//         this.subject.next(event.target.value);
//     }

//     render() {
//         return (
//             <div>
//                 {this.props.children}
//             </div>
//         );
//     }
// }