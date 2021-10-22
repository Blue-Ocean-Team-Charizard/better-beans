import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import axios from 'axios';
import BeanSelected from './BeanSelected';
import { useAuth } from '../firebase/auth_context';

export default function CreateReview(props) {
  const Bean = '/bean-small.svg';
  const [rating, setRatings] = useState(0);
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
      $avatar: String
      $body: String!
      $rating: Int
      $shop_id: String!
      $shop_name: String
      $user_id: String!
    ){
      createReview(
        name: $name
        avatar: $avatar
        body: $body
        rating: $rating
        shop_id: $shop_id
        shop_name: $shop_name
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
      ) {
        id
      }
    }
  `;

  const [createReview, { data, loading, err }] = useMutation(CREATE_REVIEW);
  const [createPhoto, { photoData }] = useMutation(CREATE_PHOTO);

  if (loading) return 'Submitting...';
  if (err) return `Submission error! $${err.message}`;

  // transfer photos to URL
  const handleAPI = (reviewId) => {
    for (let i = 0; i < files.length; i++) {
      let formData = new FormData();
      formData.append('file', files[i]);
      formData.append('upload_preset', 'asosdlts');

      axios.post('https://api.cloudinary.com/v1_1/dkw2yrk06/upload', formData)
        .then((response) => {
          createPhoto({
            variables: {
              review_id: reviewId,
              url: response.data.secure_url,
            },
          });
        });
    }
  };

  // TODO: Mark visited === true
  const handleSubmit = (e) => {
    e.preventDefault();
    createReview({
      variables: {
        name: authUser.name,
        avatar: authUser.photo,
        body: body,
        rating: rating,
        shop_id: props.shopId,
        shop_name: props.shopName,
        user_id: authUser.uid,
      },
    })
      .then((res) => {
        handleAPI(res.data.createReview.id);
      })
      .then(() => {
        setPhotos([]);
        setFiles([]);
        console.log('review data ', data);
      })
      .catch((error) => console.log('Error creating review', error));
  };

  const handleImage = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      const selectedFileArray = Array.from(e.target.files);
      setFiles(prevFile => prevFile.concat(selectedFileArray));
      setPhotos(prevImg => prevImg.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
      // handleAPI();
    }
  };

  const renderImg = (source) => {
    return source.map(image => {
      return <img src={image} id="uploaded-photo" key={image}/>;
    });
  };

  return (
    <div id="create-review">
      <form onSubmit={(e) => {
        handleSubmit(e);
        // props.reviews.unshift();
        }}>
        <div id="select-your-rating">Select your rating.</div>
        <div id="select-beans">
          <div>
            <img src={Bean} className={rating >= 1 ? 'selected' : 'selectBean'} onClick={() => selectRating(1)} />
            <img src={Bean} className={rating >= 2 ? 'selected' : 'selectBean'} onClick={() => selectRating(2)} />
            <img src={Bean} className={rating >= 3 ? 'selected' : 'selectBean'} onClick={() => selectRating(3)} />
            <img src={Bean} className={rating >= 4 ? 'selected' : 'selectBean'} onClick={() => selectRating(4)} />
            <img src={Bean} className={rating >= 5 ? 'selected' : 'selectBean'} onClick={() => selectRating(5)} />
          </div>
        </div>
        <div id="write-review">Write your reviews...</div>
        <textarea
          id="write-review-input"
          onChange={(e) => { e.preventDefault(); setBody(e.target.value); }}
        />
        <input
          id="input-photo-review"
          type="file"
          multiple={true}
          onChange={(e) => handleImage(e)}
        />
        <div id="uploaded-photos-section">{renderImg(photos)}</div>

        <div id="submit-review-section">
          <button id="submit-review-btn" type="submit"> Submit Review</button>
        </div>
      </form>
    </div>
  );
}
