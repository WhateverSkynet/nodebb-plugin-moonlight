
import * as React from "react";

import { connect } from 'react-redux';
import { State } from '../../states/state';
import { ApplicationTemplate, ApplicationCharacter } from '../../../models/application';

import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';


const Character = ({character}:{character: ApplicationCharacter}) => {
  return (
    <div>
    <ul className="list--unstyled">
      <li>{character.name}</li>
      <li>{character.class}</li>
      <li>{character.realm}</li>
      <li>{character.primarySpecialization}</li>
      <li>{character.secondarySpecialization}</li>
      {
        character.userInterfaceUrl
          ? (
            <div className="mrow">
              <div className="col-sm-16 col-sm-4--offset">
                <div className="image-warapper">
                  <img title={character.userInterfaceUrl} alt="UI screenshot" className="image-preview"
                    src={`https://i.imgur.com/${character.userInterfaceUrl}m.jpg`} />
                </div>
              </div>
            </div>
          )
          : ""
      }
    </ul>
    </div>
  );
};

interface AppDetailsProps {

  app?: ApplicationTemplate;
  routeParams?: {
    id?: string;
  }
}

export const AppDetails = ({routeParams: { id }, app}: AppDetailsProps) => {
  return (
    <div>
      {
        app ?
          (<Card>
            <CardHeader
              title={`Application ${id}`}
              />
            <CardText>
              <h2 className="app-title">Characters</h2>
              <ul className="list--unstyled">
                {
                  app.characters.map((c, i) => (
                    <li key={c.guid} >
                      <Character character={c} />
                    </li>
                  ))
                }
              </ul>
              <h2 className="app-title">Questions</h2>
              <ul className="list--unstyled">
                {
                  app.questions.map((q, i) => (
                    <li key={q.qid} >
                      <p>{`${i + 1}. ${q.text}`}</p>
                      <p>{q.value}</p>
                    </li>
                  ))
                }
              </ul>
              <RaisedButton label="Reply" primary={true} />
            </CardText>
          </Card>)
          : "Whoops... the application does not exist."
      }

    </div>
  )
};

const mapStateToProps = (state: State, ownProps: AppDetailsProps) => {
  const props: AppDetailsProps = {
    app: state.db.applications.byId[ownProps.routeParams.id]
  }
  return props;
};

export const AppDetailsContainer = connect(mapStateToProps)(AppDetails);