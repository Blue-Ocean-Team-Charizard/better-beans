import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
// import BeanSelected from './BeanSelected';
import axios from 'axios';
import { useAuth } from '../firebase/auth_context';

export default function CreateReview(props) {
  const Bean = '/bean-small.svg';
  const [rating, setRatings] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [photos, setPhotos] = useState([]);
  const [files, setFiles] = useState([]);
  const { authUser } = useAuth();

  const selectRating = (value) => {
    setRatings(value);
  };

  const CREATE_REVIEW = gql`
    mutation CreateReview(
      $name: String!
      $body: String!
      $rating: Int
      $shop_id: String!
      $user_id: String!
    ){
      createReview(
        name: $name
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
        name: authUser.name,
        body: body,
        rating: rating,
        shop_id: 'Simple',
        user_id: authUser.uid,
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
    console.log(authUser);
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
          URLs.push({url: data.data.secure_url});
          if (URLs.length === files.length) {
            console.log(URLs);
            return URLs;
          }
        })
        .catch((err) => console.log('tranfer URL err', err));
    }
}



  return (

    <div>
      {authUser.name}
      <div id="review">
        <form onSubmit={(e) => { handleSubmit(e); }}>
        <div>
            Select your rating
            <br />
            <img src={Bean} className={rating >= 1 ? 'selected' : 'selectBean' } onClick={() => selectRating(1)} />
            <img src={Bean} className={rating >=2 ? 'selected' : 'selectBean'} onClick={() => selectRating(2)} />
            <img src={Bean} className={rating >=3 ? 'selected' : 'selectBean'} onClick={() => selectRating(3)} />
            <img src={Bean} className={rating >=4 ? 'selected' : 'selectBean'} onClick={() => selectRating(4)} />
            <img src={Bean} className={rating >=5 ? 'selected' : 'selectBean'} onClick={() => selectRating(5)} />
            <br />
            {rating}
          </div>
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

            <input type='file' multiple={true} onChange={(e) => {handleImage(e)}}></input>
              <div>
                {renderImg(photos)}
              </div>
              <div onClick = {handleAPI}> confirm photo</div>

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
