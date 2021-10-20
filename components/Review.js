import { useState } from "react";
import ReviewBeanRating from './ReviewBeanRating';
import { TiThumbsUp } from "react-icons/ti";
import { MdReportGmailerrorred } from "react-icons/md";

export default function Review() {
  const [helpful, setHelpful] = useState(0)
  const [report, setReport] = useState(0)
  // const review = data.map((review, index)=> {});
  const handleHelpfulButton = () => {
    setHelpful(helpful + 1);
  }
  const handleReportButton = () => {
    setReport(report + 1)
  }
  return (
    <div id="review">
      <div id="review-user-info">
        <img src="" id="reviewer-photo"/>
        <div id="review-user-info-inner">
          <div id="reviewer-first-name">first name</div>
          <div id="reviewer-date">date</div>
        </div>
      </div>

      <div id="review-center">
        <ReviewBeanRating />
        <div id="review-body">body</div>
      </div>

      {/* pictures for review */}

      <div id="review-btns">
        <button
          id="helpful-btn"
          onClick={() => handleHelpfulButton()}
        >
          <TiThumbsUp/>
        </button>
        <button
          id="report-btn"
          onClick={() => handleReportButton()}
        >
          <MdReportGmailerrorred/>
        </button>
      </div>
    </div>
  );
}
