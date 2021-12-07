export default function BeanRating({ rating, reviews }) {
  let usedRating = 0;
  if (reviews && reviews.length > 0) {
    let totalRatings = 0;
    reviews.map((review) => {
      totalRatings += review.rating;
      return null;
    });
    usedRating = totalRatings / reviews.length;
  };

  const convertedRating = (usedRating / 5) * 100;
  const roundedRating = (Math.round(convertedRating / 5) * 5);
  const style = { width: `${roundedRating}%` };
  return (
    <>
      <div className="beans-outer" >
        <div className="beans-inner" style={style} />
      </div>
      {reviews ? `   ${reviews.length} Reviews` : "0 Reviews"}
    </>
  );
}
