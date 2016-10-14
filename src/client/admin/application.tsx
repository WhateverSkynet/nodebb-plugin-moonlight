import { BlizzardSettingsState } from '../states/admin/blizzard-settings';
import { State } from '../states/state';
import { RosterCharacter } from '../../models/wow';
import { AdminSetBlizzardSettingsAction, ADMIN_SET_BLIZZARD_SETTINGS } from '../../actions';
import * as React from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { store } from "../index";
import { Question } from './../../models/application';
import { ApplicationService } from './../services/application';

interface ApplicationSettingsProps extends React.HTMLAttributes {
  questions: Question[]
}
const saveSettings = () => {
  window.socket.emit('admin.settings.set', {
    hash: "moonlight",
    values: store.getState().admin.blizzard
  }, function (err) {

    window.app.alert({
      title: 'Settings Saved',
      type: 'success',
      timeout: 2500
    });

  });
};

const handleInput = (key: string, value: string) => {
  let props = store.getState().admin.blizzard;
  if (props[key] === value) {
    return;
  }
  props[key] = value;
  let action = {
    type: ADMIN_SET_BLIZZARD_SETTINGS,
    settings: props
  };
  store.dispatch(action);
};

const BlizzardSettingsImpl: React.StatelessComponent<ApplicationSettingsProps> = (props: ApplicationSettingsProps) => (
  <div className="mui-panel">
    <div className="mui--text-display1 mui--text-light-secondary">
      Application Settings
      </div>

    <button className="mui-btn  mui-btn--primary" onClick={() => saveSettings()}>Save</button>
  </div>

);

//  <div className="mui-textfield mui-textfield--float-label">
//       <input
//         type="text"
//         defaultValue={props.apiKey}
//         onBlur={(e) =>  handleInput("apiKey", e.target.value)}
//         />
//       <label>Api key</label>
//     </div>
//     <div className="mui-dropdown">
//       <button className="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
//         {props.region ? props.region : "Region"}
//         <span className="mui-caret"></span>
//       </button>
//       <ul className="mui-dropdown__menu">
//         {
//           regions.map(x => (
//             <li key={x}><a onClick={() => handleInput("region", x)}>{x.toUpperCase()}</a></li>
//           ))
//         }

//       </ul>
//     </div>
//     <div className="mui-textfield mui-textfield--float-label">
//       <input
//         type="text"
//         defaultValue={props.guild}
//         onBlur={(e) =>  handleInput("guild", e.target.value)}
//         />
//       <label>Guild</label>
//     </div>
//     <div className="mui-textfield mui-textfield--float-label">
//       <input
//         type="text"
//         defaultValue={props.realm}
//         onBlur={(e) =>  handleInput("realm", e.target.value)}
//         />
//       <label>Realm</label>
//     </div>


interface QuestionMangerProps extends React.HTMLAttributes {
  questions: Question[];
}

class QuestionManagerImpl extends React.Component<QuestionMangerProps, { newQuestion: string; pending: boolean; index: number; }> {

  constructor(props: QuestionMangerProps) {
    super(props);
    this.state = {
      newQuestion: "",
      pending: false,
      index: -1
    };

  }

  handleChange(event: any) {
    this.setState({
      newQuestion: event.target.value,
      pending: this.state.pending,
      index: this.state.index
    });
  }
  addQuestion() {
    ApplicationService.createQuestion(this.state.newQuestion, (err) => {
      this.setState({
        newQuestion: "",
        pending: false,
        index: -1
      });
    });
    this.setState({
      newQuestion: this.state.newQuestion,
      pending: true,
      index: this.state.index
    });
  }

  editQuestion(index: number) {
    this.setState({
      newQuestion: this.props.questions[index].text,
      pending: this.state.pending,
      index: index
    });
  }

  updateQuestion() {
    const q = this.props.questions[this.state.index];
    let question = {
      qid: q.qid,
      active: q.active,
      text: this.state.newQuestion,
      changed: q.changed,
      deleted: q.deleted
    };
    ApplicationService.updateQuestion(question, (err) => {
      this.setState({
        newQuestion: "",
        pending: false,
        index: -1
      });
    });
    this.setState({
      newQuestion: this.state.newQuestion,
      pending: true,
      index: this.state.index
    });
  }

  render() {
    const buttonLabel = this.state.index === -1 ? "Create" : "Update";
    return (
      <div>
        <div className="mui-textfield mui-textfield--float-label">
          <input
            type="text"
            value={this.state.newQuestion}
            onChange={(e) => this.handleChange(e)}
            />
          <label>New question</label>
        </div>
        <button className="mui-btn  mui-btn--primary"
          disabled={this.state.pending}
          onClick={() => this.state.index === -1 ? this.addQuestion() : this.updateQuestion()} >{buttonLabel}</button>
        <ul>
          {
            this.props.questions.map((q, i) => (
              <li key={q.qid} onClick={() => this.editQuestion(i)} >{q.text}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    questions: state.app.application.questions || []
  };
};

const QuestionManager = connect(mapStateToProps)(QuestionManagerImpl);

const ApplicationSettingsImpl = (props: React.HTMLAttributes) => (
  <QuestionManager></QuestionManager>
);

export const ApplicationSettings = ApplicationSettingsImpl;//connect(mapStateToProps)(ApplicationSettingsImpl);
