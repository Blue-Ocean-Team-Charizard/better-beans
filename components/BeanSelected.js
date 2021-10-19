import { useState } from 'react';

export default function BeanSelected() {
  const [rating, setRating] = useState([0, 0, 0, 0, 0]);
  const selectRating = (value) => {
    if (value === 1) {

    }
  }

  const style = { width: `100%` };

  return (
    <div className='beans-outer'>
      <div className="beans-inner" style={style}>
      </div>
      Select your rating
    </div>
  )
}