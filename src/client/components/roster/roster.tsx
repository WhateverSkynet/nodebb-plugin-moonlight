
import { TOGGLE_RANK_FILTER, SORT_ROSTER_BY, ToogleRankFilterAction, SortRosterByAction, TOGGLE_CLASS_FILTER } from '../../../actions';
import { State } from '../../states/state';
import { RosterCharacter } from '../../../models/wow';
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { groupBy } from "lodash";

import Checkbox from 'material-ui/Checkbox';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

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

const getCssName = (str: string) => {
  if (!str) return "";
  return str.toLowerCase()
    .replace(/ /, "-");
};

//Replace these with class images?
const className = [
  "Warrior",
  "Paladin",
  "Hunter",
  "Rogue",
  "Priest",
  "Death Knight",
  "Shaman",
  "Mage",
  "Warlock",
  "Monk",
  "Druid",
  "Demon Hunter",
];

const rankNames = [
  "GM",
  "O",
  "OA",
  "R",
  "T",
  "RA",
  "A",
  "S",
];

export interface RosterProps {
  ranks?: number[];
  disabledRanks?: { [key: string]: boolean };
  characters?: RosterCharacter[];

  charClasses?: number[];
  disabledClasses?: { [key: string]: boolean };
  actions?: {
    toggleRank?: (rank: number) => ToogleRankFilterAction;
    toggleClass?: (rank: number) => ToogleRankFilterAction;
    sortBy?: (propertyName: string) => SortRosterByAction;
  };
}

const styles = {
  checkbox: {
    marginBottom: 16,
    width: "auto",
    display: "inline-block",
    marginRight: 16
  },
  row: {
    display: "flex",
    flexWrap: "wrap"
  }
};

const formatLargeNumbers = (num: number) => {
  return num.toLocaleString('en-INT'); //num > 1000 ? `${Math.floor(num / 1000)},${num % 1000}` : num.toString();
};
const RosterImpl = (props: RosterProps) => {
  const sortBy = [null, null, "rank", "averageItemLevelEquipped", "audit.artifact.itemLevel", "totalArtifactPower", "audit.artifact.traitCount"]
  const onHeaderCellClick = (e: React.MouseEvent<{}>, row: number, col: number) => {
    if (sortBy[col - 1]) {
      props.actions.sortBy(sortBy[col - 1]);
    }
  };
  return (
    <div>
      <h4>Ranks</h4>
      <div style={styles.row}>
        {
          props.ranks.map((x) => (
            <Checkbox key={x}
              checked={props.disabledRanks[props.ranks[x]] === undefined}
              onCheck={() => props.actions.toggleRank(x)}
              label={rankNames[x]}
              style={styles.checkbox}
              />
          ))
        }
      </div>
      <h4>Classes</h4>
      <div style={styles.row}>
        {
          props.charClasses.map((x, i) => (
            <Checkbox key={x}
              checked={props.disabledClasses[props.charClasses[i]] === undefined}
              onCheck={() => props.actions.toggleClass(x)}
              label={className[i]}
              style={styles.checkbox}
              />
          ))
        }
      </div>
      <table className="table">
        <thead>
          <tr className="row">
            <th className="col-xs-2" >Name</th>
            <th className="col-xs-2" >Links</th>
            <th className="col-xs-3 clickable" onClick={() => props.actions.sortBy("rank")} >Rank</th>
            <th className="col-xs-1 clickable" onClick={() => props.actions.sortBy("averageItemLevelEquipped")} >Item Level</th>
            <th className="col-xs-1 clickable" onClick={() => props.actions.sortBy("audit.artifact.itemLevel")} >Artifact</th>
            <th className="col-xs-2 clickable" onClick={() => props.actions.sortBy("totalArtifactPower")} >AP</th>
            <th className="col-xs-1 clickable" onClick={() => props.actions.sortBy("audit.artifact.traitCount")} >Traits</th>
          </tr>
        </thead>
        <tbody style={
          {
            // backgroundColor: "#cce4f2",
          }
        }>
          {
            props.characters
              .map((m, i) =>
                <tr key={m.name + m.realm} className="row" style={
                  {
                    background: i % 2 === 0 ? "#cce4f2" : "transparent",
                  //  color:  i % 2 === 0 ? "#000" : "#FFF",
                  }
                } >
                  <td className="col-xs-2">
                    <img className="roster__class-icon" src={`${publicPath}/${icons[className[m.class - 1].toLowerCase().replace(" ", "-")]}`} alt={className[m.class - 1]}></img>
                    <a className="roster__text" href={"https://eu.battle.net/wow/en/character/" + m.realm + "/" + m.name + "/advanced"} target="_blank">{m.name}</a>
                  </td>
                  <td className="col-xs-2">
                    <a href={`https://www.askmrrobot.com/wow/gear/eu/${m.realm}/${m.name}`} target="_blank">
                      <img src="https://media-curse.cursecdn.com/attachments/81/383/a7c1e08f4816cf2632752d5949eb7bdc.png" height="15" width="15" />
                    </a>
                    &nbsp;
                    <a className="roster__text" href={`http://www.wowprogress.com/character/eu/${m.realm}/${m.name}`} target="_blank" >
                      wp
                    </a>
                  </td>
                  <td className="col-xs-3">{rankNames[m.rank]}</td>
                  <td className="col-xs-1">{m.averageItemLevelEquipped}</td>
                  <td className="col-xs-1">{m.audit.artifact.itemLevel}</td>
                  <td className="col-xs-2">{formatLargeNumbers(m.totalArtifactPower)}</td>
                  <td className="col-xs-1">{m.audit.artifact.traitCount}</td>
                </tr>)
          }
        </tbody>
      </table>

    </div>
  );

}

export const getProperty = (obj: any, property: string) => {
  const parts = property.split(".");

  for (let propertyName of parts) {
    obj = obj[propertyName];
  }

  return obj;
};

export const sort = (property: string, direction: string) => {
  if (direction === "ASC") {
    return (a: RosterCharacter, b: RosterCharacter) => getProperty(a, property) - getProperty(b, property);
  }
  return (a: RosterCharacter, b: RosterCharacter) => getProperty(b, property) - getProperty(a, property);
};

export const mapStateToProps = (state: State) => {
  const roster = state.ajaxify.roster || [];
  const sortBy = state.app.roster.filters.sortBy;
  var props: RosterProps = {
    characters: roster.filter((x) => state.app.roster.filters.rank[x.rank] === undefined && state.app.roster.filters.charClass[x.class] === undefined)
      .sort(sort(sortBy, state.app.roster.filters.sortDirection)),
    disabledRanks: state.app.roster.filters.rank,
    disabledClasses: state.app.roster.filters.charClass,
    ranks: Object.keys(groupBy(state.ajaxify.roster, (x: RosterCharacter) => x.rank)).map(x => parseInt(x, 10)),
    charClasses: Object.keys(groupBy(state.ajaxify.roster, (x: RosterCharacter) => x.class)).map(x => parseInt(x, 10))
  };
  return props;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators({
      toggleRank: (rank: number) => {
        return {
          type: TOGGLE_RANK_FILTER,
          rank
        };
      },
      toggleClass: (charClass: number) => {
        return {
          type: TOGGLE_CLASS_FILTER,
          charClass
        };
      },
      sortBy: (propertyName: string) => {
        return {
          type: SORT_ROSTER_BY,
          propertyName
        };
      }
    }, dispatch)
  };
};

export const Roster = connect(mapStateToProps, mapDispatchToProps)(RosterImpl);
