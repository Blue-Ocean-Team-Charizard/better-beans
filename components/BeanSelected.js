import { useState } from 'react';
import ReviewBeanRating from './ReviewBeanRating.js'
import { AiOutlineStar } from "react-icons/ai"


export default function BeanSelected() {
  let empty = [];
  const Bean = './bean-small.svg'
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

  return (
    <div id="create-beans-outer">
      <img src={Bean} onClick={() => selectRating(1)} />
      <img src={Bean} onClick={() => selectRating(2)} />
      <img src={Bean} onClick={() => selectRating(3)} />
      <img src={Bean} onClick={() => selectRating(4)} />
      <img src={Bean} onClick={() => selectRating(5)} />
    </div>
  )
}