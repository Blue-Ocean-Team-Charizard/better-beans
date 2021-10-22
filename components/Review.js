import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { TiThumbsUp } from 'react-icons/ti';
import { MdReportGmailerrorred } from 'react-icons/md';
import ReviewBeanRating from './ReviewBeanRating';



export default function Review(props) {
  const {review} = props;

  const [helpful, setHelpful] = useState(0);
  const [report, setReport] = useState(0);
  const name = review.name.split(' ')[0];
  const date = new Date(parseInt(review.date)).toString().split(' ');
  const formattedDate = `${date[1]} ${date[2]} ${date[3]}`


  const handleHelpfulButton = () => {
    setHelpful(helpful + 1);
  };
  const handleReportButton = () => {
    setReport(report + 1);
  };

  const GET_PHOTOS = gql`
  query PhotosByReview($review_id: Int!) {
    photosByReview(review_id: $review_id) {
      id
      review_id
      url
    }
  }
`;

const { data, loading, err } = useQuery(GET_PHOTOS, {
  variables: { review_id: review.id },
});

if (loading) return 'Loading...';
if (err) return `Error! ${err.message}!`;

console.log('photo data ', data.photosByReview);
  return (
    <div id="review">
      <div id="review-user-info">
        <div id="review-user-info-inner">
          <div id="reviewer-first-name">{name}</div>
          <div id="reviewer-date">{formattedDate}</div>
        </div>
      </div>

      <div id="review-center">
        <ReviewBeanRating rating={review.rating}/>
        <div id="review-body">{review.body}</div>
      </div>

      <div id="review-photos">
        {data.photosByReview.map((photo) => <img id="review-photo" src={photo.url} />)}
      </div>

      <div id="review-buttons">
        <button
          type="button"
          id="helpful-btn"
          onClick={() => handleHelpfulButton()}
        >
          <TiThumbsUp /> {review.helpful}
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
