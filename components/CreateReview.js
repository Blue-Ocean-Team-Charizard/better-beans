import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import axios from 'axios';
import BeanSelected from './BeanSelected';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    createReview({
      variables: {
        name: authUser.name,
        body: body,
        rating: rating,
        shop_id: props.shopId,
        user_id: authUser.uid,
      },
    })
      .then((res) => {
        handleAPI(res.data.createReview.id);
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
    // console.log(authUser);
    return source.map(image => {
      return <img src={image} key={image} height="80"></img>;
    });
  };

  return (
    <div id="create-review">
      <form onSubmit={(e) => { handleSubmit(e); }}>
        <div id="select-your-rating">Select your rating.</div>
        <div id="select-beans">
          <BeanSelected />
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
        <div>{renderImg(photos)}</div>
        <button id="submit-review-btn" type="submit"> Submit Review</button>
      </form>
    </div>
  );
}
