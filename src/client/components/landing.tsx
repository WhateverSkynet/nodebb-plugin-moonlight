import * as React from "react";
import { RecruitmentWidget } from './recruitment/recruitment';
// import image from "../../assests/uploads/m-xavius.jpg!jpg";
import { publicPath } from '../util';
const image = require("../../assets/uploads/m-xavius.jpg");
export const LandingPage = () => {
  return (
    <div className="section">
      <div className="row">
        <div className="col-12">
          <h2 className="title title--landing">Mythic raiding guild on Auchindoun-EU</h2>
        </div>
        <div className="col-md-8">
          <div className="news-container">
            <div className="news-item">
              <img src={`${publicPath}/${image}`} alt="Xavius down"></img>
              <div className="news-item--content">
                <div className="news-item--title">
                  <div className="news-title">M Xavius down!</div>
                </div>
                <p>
                  After several computer issues, work trips to greece and some holidays we downed Cenarius, the real end boss of this raid. Subsequently we quickly proceeded to liberate the Emerald Dream from Xavius' hold. Thanks to everyone for being a part of it and see you soon in Trial of Valor, followed by Nighthold, the real raid of the first tier. Special shout out to Deli for being the first one in the guild for a very long time to get genuinely excited at getting a realm first and some awkward nerd screams.
                </p>
                <div className="news-item--date">
                  <div className="news-date">25.10.2016</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <RecruitmentWidget></RecruitmentWidget>
        </div>
      </div>
    </div>
  );
};
