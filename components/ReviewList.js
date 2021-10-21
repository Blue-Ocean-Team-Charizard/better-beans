import { GiCoffeeBeans } from 'react-icons/gi';
import Review from './Review';

export default function ReviewList() {
  return (
    <div id="reviews">
      <div id="reviews-title">
        <GiCoffeeBeans id="gi-coffee-beans-icon" />
        <div>Reviews</div>
      </div>
      {/* id="review-list" */}
      <Review />
    </div>
  );
}
