import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import BeanSelected from './BeanSelected';
import axios from 'axios';

export default function CreateReview() {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [photos, setPhotos] = useState([]);
  const [files, setFiles] = useState([]);

  const CREATE_REVIEW = gql`
    mutation CreateReview(
      $first_name: String!
      $title: String
      $body: String!
      $rating: Int
      $shop_id: String!
      $user_id: Int!
    ){
      createReview(
        first_name: $first_name
        title: $title
        body: $body
        rating: $rating
        shop_id: $shop_id
        user_id: $user_id
      ) {
        id
      }
    }
  `;

  const CREATE_PHOTO = gql`
    mutation CreatePhoto(
      $review_id: Int!
      $url: String!
    ) {
      createPhoto(
        review_id: $review_id
        url: $url
      )
    }
  `;

  const [createReview, { data, loading, err }] = useMutation(CREATE_REVIEW);

  if (loading) return 'Submitting...';
  if (err) return `Submission error! $${err.message}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAPI()
    createReview({
      variables: {
        first_name: 'Qinyu for you',
        title: 'very yummy coffee!',
        body: 'i like coffee',
        rating: 5,
        shop_id: 'Simple',
        user_id: 1,
      },
    })
      // .then((res) => {
      //   photos.map((photo) => {
      //     photo[review_id] = res.createReview.review_id,
      //   });
      //   console.log(res.createReview);
      // });
    // .then((result) => console.log('Created review:', result));
  };

  const handleImage = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      const selectedFileArray = Array.from(e.target.files);
      setFiles(prevFile => prevFile.concat(selectedFileArray));
      setPhotos(prevImg => prevImg.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file))
    }
  };

  const renderImg = (source) => {
    return source.map(image => {
      return <img src={image} key={image} height="80" id="upload-image" onClick = {handleAPI}></img>;
    });
  };

  // transfer photos to URL
  const handleAPI = () => {
    let URLs = [];
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      let formData = new FormData();
      formData.append('file', files[i]);
      formData.append('upload_preset', 'asosdlts');

      axios.post('https://api.cloudinary.com/v1_1/dkw2yrk06/upload', formData)
        .then((data) => {
          URLs.push({url: data.data.secure_url});
          if (URLs.length === files.length) {
            console.log(URLs);
          }
        })
        .catch((err) => console.log('tranfer URL err', err));
    }
}



  return (
    <div>
      <div id="review">
        <form onSubmit={(e) => { handleSubmit(e); }}>
          <BeanSelected />
            <br />
            <label>
              Title:
              <br />
              <input onChange={(e) => {e.preventDefault(); setTitle(e.target.value)}}>
              </input>
            </label>
            <label>
              Write your reviews down
              <br/>
              <textarea onChange={(e) => {e.preventDefault(); setBody(e.target.value)}}/>
            </label>
            <br />
            <label>
              Your photos(optional)
            </label>
            <br />

            <input type='file' multiple={true} onChange={(e) => {handleImage(e); renderImg(photos)}}></input>
              {/* <div>
                {renderImg(photos)}
              </div> */}

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

// photos = [
//   { url: 'url1' },
//   { url: 'url2' },
// ];
