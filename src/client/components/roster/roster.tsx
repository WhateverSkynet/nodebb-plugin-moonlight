import { TOGGLE_RANK_FILTER, SORT_ROSTER_BY, ToogleRankFilterAction, SortRosterByAction } from '../../../actions';
import { State } from '../../states/state';
import { RosterCharacter } from '../../../models/wow';
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { groupBy } from "lodash";

import Checkbox from 'material-ui/Checkbox';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
const getCssName = (str: string) => {
  if (!str) return "";
  return str.toLowerCase()
    .replace(/ /, "");
};

//Replace these with class images?
const className = (id: number) => {
  switch (id) {
    case 1:
      return "Warrior";
    case 2:
      return "Paladin";
    case 3:
      return "Hunter";
    case 4:
      return "Rogue";
    case 5:
      return "Priest";
    case 6:
      return "Deathknight";
    case 7:
      return "Shaman";
    case 8:
      return "Mage";
    case 9:
      return "Warlock";
    case 10:
      return "Monk";
    case 11:
      return "Druid";
    case 12:
      return "Demonhunter";
  }
};

const rankNames =
  [
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
  disabledRanks?: { [key: string]: boolean }; //TODO: 2, 5, 6, 7 should be disabled by default, but can be enabled
  characters?: RosterCharacter[];
  actions?: {
    toggleRank: (rank: number) => ToogleRankFilterAction;
    sortBy: (propertyName: string) => SortRosterByAction;
  };
}

const styles = {
  checkbox: {
    marginBottom: 16,
    maxWidth: 90,
    display: "inline-block"
  },
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
      <div>
        {
          props.ranks.map((x) => (
            <Checkbox key={x}
              checked={props.disabledRanks[props.ranks[x].toString()] === undefined}
              onCheck={() => props.actions.toggleRank(x)}
              label={rankNames[x]}
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
            background: "rgba(0, 32, 50, 0.9)",
            color: "#fff"
          }
        }>
          {
            props.characters
              .map((m, i) =>
                <tr key={m.name + m.realm} className="row" style={
                  {
                    background: i % 2 === 0 ? "rgba(0, 32, 50, 1)" : "transparent"
                  }
                } >
                  <td className="col-xs-2">
                    <a className="character-class" data-character-class={getCssName(className(m.class))} href={"https://eu.battle.net/wow/en/character/" + m.realm + "/" + m.name + "/advanced"} target="_blank">{m.name}</a>
                  </td>
                  <td className="col-xs-2">
                    <a href={`https://www.askmrrobot.com/wow/gear/eu/${m.realm}/${m.name}`} target="_blank">
                      <img src="https://media-curse.cursecdn.com/attachments/81/383/a7c1e08f4816cf2632752d5949eb7bdc.png" height="15" width="15" />
                    </a>
                    &nbsp;
                    <a href={`http://www.wowprogress.com/character/eu/${m.realm}/${m.name}`} target="_blank" style={
                      {
                        color: "#fff"
                      }
                    }>
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
    characters: roster.filter((x) => state.app.roster.filters.rank[x.rank] === undefined)
      .sort(sort(sortBy, state.app.roster.filters.sortDirection)),
    disabledRanks: state.app.roster.filters.rank,
    ranks: Object.keys(groupBy(state.ajaxify.roster, (x: RosterCharacter) => x.rank)).map(x => parseInt(x, 10))
  };
  return props;
};

const mapDispatchToProps = (dispatch: any) => {
  const props: RosterProps = {
    actions: bindActionCreators({
      toggleRank: (rank: number) => {
        return {
          type: TOGGLE_RANK_FILTER,
          rank
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
  return props;
};

export const Roster = connect(mapStateToProps, mapDispatchToProps)(RosterImpl);
