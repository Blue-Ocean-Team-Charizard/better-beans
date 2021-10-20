import { useState } from 'react';
import Bean from '../public/bean-small.svg';
import { AiFillStar } from 'react-icons/fa'

export default function BeanSelected() {
  // const [rating, setRating] = useState(0);
  let rating = 0;
  const selectRating = (value) => {
    rating = value;
    console.log(rating);
  }
  const convertedRating = rating / 5 * 100;
  const roundedRating = (Math.round(convertedRating / 5) * 5);
  const style = { width: `${roundedRating}%` };

  // const style = { width: `100%` };

  return (
    <div>
      <div className='beans-outer'>
        {/* <div className="beans-inner" style={style}>
        </div> */}
        Select your rating

      </div>

      <img src={Bean} onClick={() => selectRating(1)} />
      <img src={Bean} onClick={() => selectRating(2)} />
      <img src={Bean} onClick={() => selectRating(3)} />
      <img src={Bean} onClick={() => selectRating(4)} />
      <img src={Bean} onClick={() => selectRating(5)} />
    </div>
  )
}