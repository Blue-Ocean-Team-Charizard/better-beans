import { useState } from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import ReviewBeanRating from './ReviewBeanRating';

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
      <img src={Bean} onClick={() => selectRating(1)} alt="" />
      <img src={Bean} onClick={() => selectRating(2)} alt="" />
      <img src={Bean} onClick={() => selectRating(3)} alt="" />
      <img src={Bean} onClick={() => selectRating(4)} alt="" />
      <img src={Bean} onClick={() => selectRating(5)} alt="" />
    </div>
  );
}
