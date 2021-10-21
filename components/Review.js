import { useState } from 'react';
import { TiThumbsUp } from 'react-icons/ti';
import { MdReportGmailerrorred } from 'react-icons/md';
import ReviewBeanRating from './ReviewBeanRating';

export default function Review() {
  const [helpful, setHelpful] = useState(0);
  const [report, setReport] = useState(0);
  // const review = data.map((review, index)=> {});
  const handleHelpfulButton = () => {
    setHelpful(helpful + 1);
  };

  const handleReportButton = () => {
    setReport(report + 1);
  };

  return (
    <div id="review">
      <div id="review-user-info">
        <img src="" id="reviewer-photo" alt="reviewer" />
        <div id="review-user-info-inner">
          <div id="reviewer-first-name">Anderson</div>
          <div id="reviewer-date">Today</div>
        </div>
      </div>

      <div id="review-center">
        <ReviewBeanRating />
        <div id="review-body">This is a test review for testing & text filler!! Would recommend</div>
      </div>

      {/* pictures for review */}

      <div id="review-buttons">
        <button
          type="button"
          id="helpful-btn"
          onClick={() => handleHelpfulButton()}
        >
          <TiThumbsUp />
        </button>
        <button
          type="button"
          id="report-btn"
          onClick={() => handleReportButton()}
        >
          <MdReportGmailerrorred />
        </button>
      </div>
    </div>
  );
}
