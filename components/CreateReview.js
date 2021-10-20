import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import BeanSelected from './BeanSelected';
import APIKey from '../config/config.js';
import axios from 'axios';

export default function CreateReview() {
  const photoAPIKey = APIKey.photoAPIKey;
  console.log(photoAPIKey);
  const [body, setBody] = useState('');
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
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
      console.log('files', files);
      console.log('photos', photos)
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
    for (let i = 0; i < files.length; i++) {
      let formData = new FormData();
      formData.append('file', files[i]);
      formData.append('upload_preset', 'asosdlts');

      axios.post('https://api.cloudinary.com/v1_1/dkw2yrk06/upload', formData)
        .then((data) => {
          console.log(data);
          URLs.push(data.data.secure_url);
          if (URLs.length === files.length) {
            console.log(URLs);
          }
        })
        .catch((err) => console.log('tranfer URL err', err));
      console.log(formData);
    }
  //   var photoAPI = (filesArr, callback) => {
  //     for (let i = 0; i < filesArr.length; i++) {
  //       let formData = new formData();
  //       formData.append('file', filesArr[i]);
  //       formData.append('upload_preset', photoAPIKey);
  //     }

  //   axios.post('https://api.cloudinary.com/v1_1/drbwyfh4x/upload', formData)
  //     .then((data) => {
  //       console.log(data);
  //       URLs.push(data.data.secure_url);
  //       if (URLs.length === filesArr.length) {
  //         console.log(URLs);
  //         return callback(null, URLs)
  //       }
  //     })
  //     .catch((err) => console.log('transfer URL err', err))
  // }

  // photoAPI(files, (err, data) => {
  //   console.log(data)
  // })
}



  return (
    // the modal component should be adding option
    <div>
      <div id="review">
        <form onSubmit={(e) => { handleSubmit(e); }}>
          <BeanSelected />
            <img src='../public/bean.svg'/>
            <br />
            <label>
              Title:
            </label>
            <label>
              Write your reviews down
            </label>
            <br />
            <label>
              Your photos(optional)
            </label>
            <br />
            <button type="submit"> Submit Review</button>

            <form onSubmit={(e) => {e.preventDefault(); handleAPI(); }}>
              <input type='file' multiple={true} onChange={(e) => handleImage(e)}></input>
              <div>
                {renderImg(photos)}
              </div>
            </form>
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
