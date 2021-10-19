import { useState } from "react";
import { TiThumbsUp } from "react-icons/ti";
import { MdReportGmailerrorred } from "react-icons/md";

const data = [
  {
  'firstName': 'Stormi',
  'date': 'Oct 18, 2021',
  'default_pic': '',
  'rating': 4,
  'title': 'Awesome beans',
  'body': 'This is place has the best beans. I would recommend this cafe to anyone who loves authentic coffee!',
  'helpful': 0,
  'report': 0,
  'photos': []
  },{
  'firstName': 'Stormi',
  'date': 'Oct 18, 2021',
  'default_pic': '',
  'rating': 4,
  'title': 'Awesome beans',
  'body': 'This is place has the best beans. I would recommend this cafe to anyone who loves authentic coffee!',
  'helpful': 0,
  'report': 0,
  'photos': []
  }
]

export default function Review() {

  const review = data.map((review, index)=> {});

  return (
    <div id="review">
      <div id="review-user-info">
        <img src="" id=""reviewer-photo/>
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
