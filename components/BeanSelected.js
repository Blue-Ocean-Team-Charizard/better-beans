import { useState } from 'react';
import ReviewBeanRating from './ReviewBeanRating.js'
import { AiOutlineStar } from "react-icons/ai"


export default function BeanSelected() {

  const Bean = '/bean-small.svg';
  const [rating, setRatings] = useState(0);

  const selectRating = (value) => {
    setRatings(value);
  };

  // const style = { width: `100%` };

  // for each bean, inside the img tag. Have a className dependent on the rating
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