import Review from './Review';

export default function ReviewList(props) {
  const { reviews } = props;

  const review = reviews.map((review, index) => (
    <Review review={review} id={index} />
  ));

  return (
    <div id="reviews">
      {review}
    </div>
  );
}
