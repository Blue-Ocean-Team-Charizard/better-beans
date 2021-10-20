// import { useState } from "react";
import { TiThumbsUp } from "react-icons/ti";
import { MdReportGmailerrorred } from "react-icons/md";

export default function Review() {

  // const review = data.map((review, index) => {});

  return (
    <div id="review">
      <div id="review-user-info">
        {/* <img src="" id="reviewer-photo"/> */}
        <div id="review-user-info-inner">
          <div id="reviewer-first-name">first name</div>
          <div id="reviewer-date">date</div>
        </div>
      </div>

      <div id="review-center">
        <span>user rating</span>
        <div id="review-title">title</div>
        <div id="review-body">body</div>
      </div>

      {/* pictures for review */}

      <div id="review-btns">
        <button id="helpful-btn">
          <TiThumbsUp/>
        </button>
        <button id="report-btn">
          <MdReportGmailerrorred/>
        </button>
      </div>
    </div>
  );
}
