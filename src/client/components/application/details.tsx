
import * as React from "react";

import { connect } from 'react-redux';
import { State } from '../../states/state';
import { ApplicationTemplate, ApplicationCharacter } from '../../../models/application';

import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import { ApplicationReplyComponent } from './reply';
import { MessageList } from './reply-list';

import { publicPath } from '../../util';

const icons = {
  "warrior": require("../../../assets/icons/warrior-60x60.png"),
  "paladin": require("../../../assets/icons/paladin-60x60.png"),
  "hunter": require("../../../assets/icons/hunter-60x60.png"),
  "rogue": require("../../../assets/icons/rogue-60x60.png"),
  "priest": require("../../../assets/icons/priest-60x60.png"),
  "death-knight": require("../../../assets/icons/death-knight-60x60.png"),
  "shaman": require("../../../assets/icons/shaman-60x60.png"),
  "mage": require("../../../assets/icons/mage-60x60.png"),
  "warlock": require("../../../assets/icons/warlock-60x60.png"),
  "monk": require("../../../assets/icons/monk-60x60.png"),
  "druid": require("../../../assets/icons/druid-60x60.png"),
  "demon-hunter": require("../../../assets/icons/demon-hunter-60x60.png"),
};

const Character = ({character}: { character: ApplicationCharacter }) => {
  const showUIImage = character.userInterfaceUrl && character.userInterfaceUrl.length === 7;
  return (

    <div className="panel">
      <h2 className="panel__header">Character</h2>
      <div className="panel__content">
        <ul className="list--unstyled">
          <li className="app-details__character-item">
            <span className="app-details__character-label">Name:</span>
            <span>{character.name}</span>
          </li>
          <li className="app-details__character-item">
            <span className="app-details__character-label">Class:</span>
            <span>{character.class}</span>
          </li>
          <li className="app-details__character-item">
            <span className="app-details__character-label">Realm:</span>
            <span>{character.realm}</span>
          </li>
          <li className="app-details__character-item">
            <span className="app-details__character-label">Primar Specialization:</span>
            <span>{character.primarySpecialization}</span>
          </li>
          <li className="app-details__character-item app-details__character-item--link">
            <a className="link" href={`https://eu.battle.net/wow/en/character/${character.realm}/${character.name}/advanced`} target="_blank">
              armory
            </a>
          </li>
          <li className="app-details__character-item app-details__character-item--link">
            <a className="link" href={`https://wowtrack.org/characters/EU/${character.realm}/${character.name}`} target="_blank">
              wowtrack
            </a>
          </li>
          <li className="app-details__character-item app-details__character-item--link">
            <a className="link" href={`http://www.wowprogress.com/character/eu/${character.realm}/${character.name}`} target="_blank">
              wowprogress
            </a>
          </li>
          {
            showUIImage
              ? (
                <div className="mrow">
                  <div className="col-sm-16 col-sm-4--offset">
                    <div className="image-warapper">
                      <a href={`https://i.imgur.com/${character.userInterfaceUrl}.jpg`} target="_blankdamn ">
                        <img title={character.userInterfaceUrl} alt="UI screenshot" className="image-preview"
                          src={`https://i.imgur.com/${character.userInterfaceUrl}m.jpg`} />
                      </a>
                    </div>
                  </div>
                </div>
              )
              : (
                <li className="app-details__character-item app-details__character-item--link">
                  <a className="link" href={character.userInterfaceUrl} target="_blank">{character.userInterfaceUrl}</a>
                </li>)
          }
        </ul>
      </div>
    </div>

  );
};

const appStatus = [
  "Draft",
  "New",
  "Pending",
  "Withdrawn",
  "Interview",
  "Accepted",
  "Declined"
];

interface AppDetailsProps {

  app?: ApplicationTemplate;
  appActions?: string[];
  routeParams?: {
    id?: string;
  }
}

export const AppDetails = ({routeParams: { id }, app, appActions}: AppDetailsProps) => {
  return (
    <div className="section">
      {
        app ?
          (
            <div className="row">
              <div className="col-xs-12">
                <div className="app-details__header">
                  {
                    app.characters[0].class
                      ? <img className="character-class" src={`${publicPath}/${icons[app.characters[0].class.toLowerCase().replace(" ", "-")]}`} alt={app.characters[0].class}></img>
                      : ""
                  }
                  <h2 className="title--landing">{`[${appStatus[app.status]}] ${app.characters[0].name || ""} - ${app.characters[0].class || ""}`}</h2>
                </div>
              </div>
              <div className="col-md-4">
                <ul className="list--unstyled">
                  {
                    app.characters.map((c, i) => (
                      <li key={c.guid} >
                        <Character character={c} />
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="col-md-8">
                <div className="panel">
                  <h2 className="panel__header">Questions</h2>
                  <div className="panel__content">
                    <ul className="list--unstyled">
                      {
                        app.questions.map((q, i) => (
                          <li key={q.qid} >
                            <p className="app-details__questions">{`${i + 1}. ${q.text}`}</p>
                            <p className="message__text">{q.value}</p>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
                {
                  app.replies.length > 0
                    ? (
                      <div className="panel">
                        <h2 className="panel__header">Replies</h2>
                        <div className="panel__content">
                          <MessageList authorId={app.uid} messages={app.replies} ></MessageList>
                        </div>
                      </div>
                    )
                    : ""
                }
                {
                  appActions.indexOf("REPLY") !== -1
                    ? (
                      <ApplicationReplyComponent appId={app.appId} authorUid={app.uid} appStatus={app.status} />
                    )
                    : ""
                }

              </div>

            </div>)
          : "Whoops... the application does not exist."
      }

    </div>
  )
};

const mapStateToProps = (state: State, ownProps: AppDetailsProps) => {
  const props: AppDetailsProps = {
    app: state.db.applications.byId[ownProps.routeParams.id],
    appActions: state.app.application.actions
  }
  return props;
};

export const AppDetailsContainer = connect(mapStateToProps)(AppDetails);