

export default function SocialMediaButtons(props) {
  return (
    <div className='po-soc-med-btns'>
      <a
        href='https://www.facebook.com/dialog/share?app_id=184484190795&href=http%3A%2F%2F18.144.33.249%2F&quote=Check%20out%20these%20flaming%20hot%20styles%20at%20Fire%20Nation%20Fashion!'
        target='_blank'>
        <i className='fab fa-facebook fa-2x soc-btn'></i>
      </a>
      <a
        href='https://twitter.com/intent/tweet?hashtags=FireNationFashion&original_referer=http%3A%2F%2F18.144.33.249%2F&text=Check%20out%20these%20flaming%20hot%20styles!&url=http%3A%2F%2F18.144.33.249%2F'
        target='_blank' >
        <i className='fab fa-twitter fa-2x soc-btn'></i>
      </a>
      <a
        href='https://www.pinterest.com/pin/create/button/'
        data-pin-do='buttonBookmark'
        data-pin-custom
        target='_blank'
        style={{ cursor: 'pointer' }}>
        <i className='fab fa-pinterest fa-2x soc-btn'></i>
      </a>
      <a href='https://www.instagram.com/' target='_blank'>
        <i className='fab fa-instagram fa-2x soc-btn'></i>
      </a>
    </div>
  );
};
