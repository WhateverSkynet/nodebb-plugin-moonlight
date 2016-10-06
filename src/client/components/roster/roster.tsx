import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { State } from "../../index";

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
    disabledRanks: any;
    members: any[];
    actions: any;
}

class RosterImpl extends React.Component<RosterProps, {}> {

    render() {
        return (
            <div className="mui-panel">
                <h4>Ranks</h4>
                <div  className="mui-form--inline">
                    {
                        this.props.ranks.map((x, i) =>
                            <div key={i} className="mui-checkbox" style={{ margin: "5px" }}>
                                <input type="checkbox" checked={this.props.disabledRanks[x] === undefined} onChange={(e) =>  this.props.actions.toggleRank(x)}/>
                                <label>{x}</label>
                            </div>
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
                            <th className="mui-col-xs-4">Artifact</th>
                            <th className="mui-col-xs-2">AP</th>
                            <th className="mui-col-xs-2">Traits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.members
                                .map(m =>
                                    <tr  key={m.name} className="mui-row" >
                                        <td className="character-class mui-col-xs-6" data-character-class={getCssName(className(m.class)) }>
                                            <a href={"https://eu.battle.net/wow/en/character/" + m.realm + "/" + m.name + "/advanced"} target="_blank">{m.name}</a>
                                        </td>
                                        <td className="mui-col-xs-6">{m.rank}</td>
                                        <td className="mui-col-xs-4">{m.averageItemLevelEquipped}</td>
                                        <td className="mui-col-xs-4">{m.audit.artifact.itemLevel}</td>
                                        <td className="mui-col-xs-2">{m.totalArtifactPower}</td>
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
    var props: RosterProps = {
        actions: [],
        members: state.ajaxify.members.filter((x:any) => state.app.filters.rank[x.rank] === undefined),
        disabledRanks: state.app.filters.rank,
        ranks: [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7
        ]
    };
    return props;
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: bindActionCreators({
            toggleRank: (rank: number) => {
                return {
                    type: "TOGGLE_RANK_FILTER",
                    value: rank
                };
            }
        }, dispatch)
    }
};

export const Roster = connect(mapStateToProps, mapDispatchToProps)(RosterImpl);
