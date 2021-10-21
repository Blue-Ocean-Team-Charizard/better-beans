export default function ReviewBeanRating({ rating }) {
  const convertedRating = rating / 5 * 100;
  const roundedRating = (Math.round(convertedRating / 5) * 5);
  const style = { width: `${roundedRating}%` };
  return (
    <div id="review-beans-outer">
      <div id="review-beans-inner" style={style}>
      </div>
    </div>
  );
}
