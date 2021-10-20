import { useState } from 'react';

export default function BeanSelected() {

  const Bean = '/bean-small.svg';
  const [rating, setRatings] = useState(0);

  const selectRating = (value) => {
    setRatings(value);
  };

  // const style = { width: `100%` };

  // for each bean, inside the img tag. Have a className dependent on the rating
  return (
    <div>
      Select your rating
      <br />
      <img src={Bean} className={rating >= 1 ? 'selected' : 'selectBean' } onClick={() => selectRating(1)} />
      <img src={Bean} className={rating >=2 ? 'selected' : 'selectBean'} onClick={() => selectRating(2)} />
      <img src={Bean} className={rating >=3 ? 'selected' : 'selectBean'} onClick={() => selectRating(3)} />
      <img src={Bean} className={rating >=4 ? 'selected' : 'selectBean'} onClick={() => selectRating(4)} />
      <img src={Bean} className={rating >=5 ? 'selected' : 'selectBean'} onClick={() => selectRating(5)} />
      <br />
      {rating}
    </div>
  )
}