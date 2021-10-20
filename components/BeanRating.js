export default function BeanRating({ rating, reviews }) {
  const usedRating = 0;
  if (rating) {
    const usedRating = rating;
  } else if (reviews) {
    const avgRating = () => {
      let ratings = 0;
      reviews.map((review) => {
        ratings += review.rating;
        return null;
      });
      return ratings / reviews.length;
    };
    const usedRating = avgRating();
  }

  const convertedRating = usedRating / 5 * 100;
  const roundedRating = (Math.round(convertedRating / 5) * 5);
  const style = { width: `${roundedRating}%` };
  return (
    <div className="beans-outer">
      <div className="beans-inner" style={style}>
      </div>
    </div>
  );
}
