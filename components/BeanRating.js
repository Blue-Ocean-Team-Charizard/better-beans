export default function BeanRating(rating) {
  const convertedRating = rating / 5 * 100;
  const roundedRating = (Math.round(convertedRating / 5) * 5);
  return (
    <div className="beans-outer">
      <div className="beans-inner" style={{ width: `${roundedRating}%` }}></div>
    </div>
  );
}
