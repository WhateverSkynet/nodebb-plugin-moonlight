import * as React from "react";
import { RecruitmentWidget } from './recruitment/recruitment';
// import image from "../../assests/uploads/m-xavius.jpg!jpg";
import { publicPath } from '../util';
const image =  require("../../assets/uploads/m-xavius.jpg");
export const LandingPage = () => {
  return (
    <div className="section">
      <div className="row">
        <div className="col-md-8">
          <div className="news-container">
            <div className="news-item">
              <img src={`${publicPath}/${image}`} alt="Xavius down"></img>
              <div className="news-item--content">
                <div className="news-item--title">
                  <div className="news-title">M Xavius down!</div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit. Sed augue orci, lacinia eu tincidunt et eleifend nec lacus. Donec ultricies nisl ut felis, suspendisse potenti. Lorem ipsum ligula ut hendrerit mollis, ipsum erat vehicula risus, eu suscipit sem libero nec erat. Aliquam erat volutpat. Sed congue augue vitae neque. Nulla consectetuer porttitor pede. Fusce purus morbi tortor magna condimentum vel, placerat id blandit sit amet tortor.
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
