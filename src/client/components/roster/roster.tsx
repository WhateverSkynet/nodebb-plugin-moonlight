import {TOGGLE_RANK_FILTER} from '../../../actions';
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

export interface RosterProps {
    ranks: number[];
    disabledRanks: {[key:string]:boolean};
    characters: RosterCharacter[];
    actions: any;
}

const formatLargeNumbers = (num: number) => {
    return num.toLocaleString(); //num > 1000 ? `${Math.floor(num / 1000)},${num % 1000}` : num.toString();
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
                         onClick={(e) =>  this.props.actions.toggleRank(x)}>{x}</button>
                        )
                    }
                </div>
                <table className="mui-table mui-table--bordered">
                    <thead>
                        <tr className="mui-row">
                            <th className="mui-col-xs-6">Name</th>
                            <th className="mui-col-xs-6">
                                Rank
                            </th>
                            <th className="mui-col-xs-4">Item Level</th>
                            <th className="mui-col-xs-2">Artifact</th>
                            <th className="mui-col-xs-4">AP</th>
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
                                            <a href={`https://www.askmrrobot.com/wow/gear/eu/${m.realm}/${m.name}`} target="_blank">R</a>
                                        </td>
                                        <td className="mui-col-xs-6">{m.rank}</td>
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

const mapStateToProps = (state: State) => {
    const roster = state.ajaxify.roster || [];
    var props: RosterProps = {
        actions: [],
        characters: roster.filter((x) => state.app.roster.filters.rank[x.rank] === undefined),
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
            }
        }, dispatch)
    }
};

export const Roster = connect(mapStateToProps, mapDispatchToProps)(RosterImpl);
