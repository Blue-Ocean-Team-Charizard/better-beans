import { useState } from 'react';
import BeanSelected from './BeanSelected.js';

export default function CreateReview() {
  const [body, setBody] = useState('');
  const [photo, setPhoto] = useState([]);
  // const [rating, setRating] = useState(0);
  // const style = { width: `${roundedRating}%` };

  const handleSubmit = () => {
    axios.post(`the post API`, {params: `params`})
      .then(response => {
        return (
          console.log('added')
        )
      })
      .catch(err => console.log('add review err', err));
  }

  const handleImage = (e) => {
    e.preventDefault();
    if(e.target.files) {
      let file = Array.from(e.target.files);
      setPhoto(prevPhoto => prevPhoto.concat(file));
    }
  }

  return (
    // the modal component should be adding option
    <div>
      <div id='review'>
        <form onSubmit={(e) => {e.preventDefault(); handleSubmit();}}>
          <BeanSelected />
          <br />
          <label>
            Write your reviews down
          </label>
          <br/>
          <label>
            Your photos(optional)
          </label>
          <br />
          <button type='submit'> Submit Review</button>
        </form>
      </div>
    </div>
  );
}
