import { useState } from 'react';
import BeanRating from './BeanRating.js'
import { AiOutlineStar } from "react-icons/ai";

export default function BeanSelected() {
  let empty = [];
  const Bean = '/bean-small.svg';
  const [beans, setBeans] = useState(0);
  const [rating, setRatings] = useState(0);

  const selectRating = (value) => {
    setRatings(value)
  };
  console.log(rating);
  const convertedRating = rating / 5 * 100;
  const roundedRating = (Math.round(convertedRating / 5) * 5);
  const style = { width: `${roundedRating}%` };

  // const style = { width: `100%` };

  // for each bean, inside the img tag. Have a className dependent on the rating
  const selected = 'selected';
  return (
    <div>
      Select your rating
      <br />
      <img src={Bean} className={rating >= 1 ? 'selected' : 'selectBean' } onClick={() => selectRating(1)} />
      <img src={Bean} className={rating >=2 ? 'selected' : 'selectBean'} onClick={() => selectRating(2)} />
      <img src={Bean} className={rating >=3 ? 'selected' : 'selectBean'} onClick={() => selectRating(3)} />
      <img src={Bean} className={rating >=4 ? 'selected' : 'selectBean'} onClick={() => selectRating(4)} />
      <img src={Bean} className={rating >=5 ? 'selected' : 'selectBean'} onClick={() => selectRating(5)} />
    </div>
  )
}