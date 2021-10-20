import { useState } from 'react';

export default function CreateReview() {
  const [body, setBody] = useState('');
  const [photos, setPhotos] = useState([]);

  // const options = {
  //   method: 'POST',
  //   headers: {
  //   },
  // };
  const handleSubmit = () => {
    fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mutation: `
          createReview(
            first_name: 'come from auth'
            title: 'yummy coffee!'
            body: 'looks good'
            rating: 4
            shop_id: 1
            user_id: 1
          )
        `,
      }),
    })
      // then((res)) => {
      //   photos.map((photo) =>
      //     fetch('localhost:4000', {
      //       options,
      //       body: JSON.stringify({
      //         mutation: `
      //         createPhoto(
      //           review_id: res.review_id,
      //           url: photo.url
      //         )
      //         `,
      //       }),
      //     }));
      // })
      .then((res) => res.json())
      .then((result) => console.log('Created review:', result))
      .catch((err) => console.log('Failure to create a review', err));
  };

  const handleImage = (e) => {
    e.preventDefault();
    if (e.target.files) {
      let file = Array.from(e.target.files);
      setPhotos(prevPhoto => prevPhoto.concat(file));
    }
  };

  return (
    // the modal component should be adding option
    <div>
      <div id="review">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <label>
            Write your reviews down
          </label>
          <br />
          <label>
            Your photos(optional)
          </label>
          <br />
          <button type="submit"> Submit Review</button>
        </form>
      </div>
    </div>
  );
}

/*
right now => photos = ['url1', 'url2'];

need to be this => photos = [
  {
    review_id: res.review_id,
    url: 'url1',
  },
  {
    review_id: res.review_id,
    url: 'url2',
  },
]
for (let i = 0; i < photos.length; i++) {
  photos[i][review_id] = res.review_id
}
*/