import * as React from "react";
import { Provider } from "react-redux";
import {store} from "../index";

//import { Page } from "./page";
import { RecruitmentWidget } from "../components/recruitment/recruitment";

export class LandingPage extends React.Component<{}, {}> {
    render() {
        return (
            <RecruitmentWidget />
           // <Page loaded={true} content={RecruitmentWidget} />
        );
    }
}