import Review from './Review';

export default function ReviewList(props) {
  const { reviews, notUser } = props;

  const review = reviews.map((review, index) => {
    return (
      <Review review={review} id={index} notUser={notUser} />
    )
  })

  return (
    <div id="reviews">
      {review}
    </div>
  );
}
