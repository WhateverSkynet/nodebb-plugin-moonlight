import { TOGGLE_RANK_FILTER, SORT_ROSTER_BY, ToogleRankFilterAction, SortRosterByAction } from '../../../actions';
import {State} from '../../states/state';
import {RosterCharacter} from '../../../models/wow';
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { groupBy } from "lodash";

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
    ranks: number[];
    disabledRanks: { [key: string]: boolean }; //TODO: 2, 5, 6, 7 should be disabled by default, but can be enabled
    characters: RosterCharacter[];
    actions?: {
        toggleRank: (rank: number) => ToogleRankFilterAction;
        sortBy: (propertyName: string) => SortRosterByAction;
    };
}

const formatLargeNumbers = (num: number) => {
    return num.toLocaleString('en-INT'); //num > 1000 ? `${Math.floor(num / 1000)},${num % 1000}` : num.toString();
};

const toggleButtonClasses = (toggled: boolean) => {
    const className = "mui-btn mui-btn--small mui-btn--fab";
    return className + (toggled ? " mui-btn--accent" : "");
};

class RosterImpl extends React.Component<RosterProps, {}> {

    render() {
        return (
            <div className="mui-panel">
                <h4>Ranks</h4>
                <div  className="mui-form--inline">
                    {
                        this.props.ranks.map((x, i) =>
                        <button className={toggleButtonClasses(this.props.disabledRanks[x.toString()] === undefined)}
                         onClick={(e) =>  this.props.actions.toggleRank(x)}>{rankNames[i]}</button> //Replace with rank names on the display?
                        )
                    }
                </div>

                <table className="mui-table mui-table--bordered">
                    <thead>
                        <tr className="mui-row">
                            <th className="mui-col-xs-6">Name</th>
                            <th className="mui-col-xs-6" onClick={() => this.props.actions.sortBy("rank")} >Rank</th>
                            <th className="mui-col-xs-4" onClick={() => this.props.actions.sortBy("averageItemLevelEquipped")} >Item Level</th>
                            <th className="mui-col-xs-2">Artifact</th>
                            <th className="mui-col-xs-4" onClick={() => this.props.actions.sortBy("totalArtifactPower")} >AP</th>
                            <th className="mui-col-xs-2">Traits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.characters
                                .map(m =>
                                    <tr  key={m.name} className="mui-row" >
                                        <td className="character-class mui-col-xs-6" data-character-class={getCssName(className(m.class)) }>
                                            <a href={"https://eu.battle.net/wow/en/character/" + m.realm + "/" + m.name + "/advanced"} target="_blank">{m.name}</a>
                                            &nbsp;
                                            <a href={`https://www.askmrrobot.com/wow/gear/eu/${m.realm}/${m.name}`} target="_blank"><img src="https://media-curse.cursecdn.com/attachments/81/383/a7c1e08f4816cf2632752d5949eb7bdc.png" height="15" width="15" /></a>
                                        </td>
                                        <td className="mui-col-xs-6">{rankNames[m.rank]}</td>
                                        <td className="mui-col-xs-4">{m.averageItemLevelEquipped}</td>
                                        <td className="mui-col-xs-2">{m.audit.artifact.itemLevel}</td>
                                        <td className="mui-col-xs-4">{formatLargeNumbers(m.totalArtifactPower)}</td>
                                        <td className="mui-col-xs-2">{m.audit.artifact.traitCount}</td>
                                    </tr>)
                        }
                    </tbody>
                </table>

            </div>
        );
    }
}

const sort = (property: string, direction: string) => {
    if (direction === "ASC") {
        return (a: RosterCharacter, b: RosterCharacter) => a[property] - b[property];
    }
    return (a: RosterCharacter, b: RosterCharacter) => b[property] - a[property];
};

const mapStateToProps = (state: State) => {
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
    return {
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
    }
};

export const Roster = connect(mapStateToProps, mapDispatchToProps)(RosterImpl);
