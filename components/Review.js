import { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { TiThumbsUp } from 'react-icons/ti';
import { MdReportGmailerrorred } from 'react-icons/md';
import ReviewBeanRating from './ReviewBeanRating';

export default function Review(props) {
  const { review } = props;
  const { id } = review;

  const UPDATE_HELPFUL = gql`
    mutation IncrementHelpful(
      $id: Int!
      $helpful: Int!
    ) {
      incrementHelpful(
        id: $id
        helpful: $helpful
      ) {
        id
      }
    }
  `;

  const UPDATE_REPORTED = gql`
    mutation IncrementReported(
      $id: Int!
      $reported: Int!
    ) {
      incrementReported(
        id: $id
        reported: $reported
      ) {
        id
      }
    }
  `;

  const [helpful, setHelpful] = useState(review.helpful);
  const [report, setReport] = useState(0);
  const name = review.name.split(' ')[0];
  const date = new Date(parseInt(review.date)).toString().split(' ');
  const formattedDate = `${date[1]} ${date[2]} ${date[3]}`;

  const [incrementHelpful, { helpfulData }] = useMutation(UPDATE_HELPFUL, {
    variables: { id: review.id, helpful: helpful},
  });

  const [incrementReported, { reportedData}] = useMutation(UPDATE_REPORTED, {
    variables: { id: review.id, reported: report},
  });

  // TODO: incrementReported

  // const review = data.map((review, index)=> {});
  const handleHelpfulButton = () => {
    incrementHelpful()
      .then(() => {
        setHelpful(helpful + 1);
      })
      .catch((error) => {
        console.error('Error incrementing', error);
      });
  };
  const handleReportButton = () => {
    incrementReported()
      .then(() => {
        setReport(report + 1);
      })
      .catch((error) => {
        console.error('Error incrementing', error);
      });
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
        {props.notUser
          ? (<img src={review.avatar} style={{borderRadius: "50%"}} id="reviewer-photo" alt="reviewer" />)
          : ''}
        <div id="review-user-info-inner">
          <div id="reviewer-first-name">
            {props.notUser ? review.name : review.shop_name}
          </div>
          <div id="reviewer-date">{formattedDate}</div>
        </div>
      </div>

      <div id="review-center">
        <ReviewBeanRating rating={review.rating} />
        <div id="review-body">{review.body}</div>
      </div>

      <div id="review-photos">
        {data.photosByReview.map((photo) => <img id="review-photo" src={photo.url} alt="review" />)}
      </div>

      <div id="review-buttons">
        <button
          type="button"
          id="helpful-btn"
          onClick={() => handleHelpfulButton()}
        >
          <TiThumbsUp />
          {helpful}
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
