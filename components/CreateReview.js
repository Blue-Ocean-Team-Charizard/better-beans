import { useState } from 'react';

export default function CreateReview() {
  const [body, setBody] = useState('');
  const [photo, setPhoto] = useState([]);

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
      let file = Array.from
    }
  }

  return (
    // the modal component should be adding option
    <div>
      <div id='review'>
        <form onSubmit={(e) => {e.preventDefault(); handleSubmit();}}>
          <label>
            Write your reviews down
          </label>
          <br/>
          <label>
            Your photos(optional)
          </label>
          <button type='submit'> Submit Review</button>
        </form>
      </div>
    </div>
  );
}
