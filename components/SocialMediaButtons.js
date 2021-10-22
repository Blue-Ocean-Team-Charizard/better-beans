

export default function SocialMediaButtons({ name, shopId }) {
  const message = `Check out ${name}, a coffee shop I discovered on Better Beans App! You can start discovering local coffee shops today too!`;
  const uri = encodeURIComponent(`https://better-beans.vercel.app/shop/${shopId}`);

  return (
    <div className='po-soc-med-btns'>
      <a
        href={`https://www.facebook.com/dialog/share?app_id=900416050597770&href=${uri}&quote=${message}`}
        target='_blank'>
        <i className='fab fa-facebook fa-2x soc-btn'></i>
      </a>
      <a
        // href={`https://twitter.com/intent/tweet?hashtags=BetterBeansApp&original_referer=http%3A%2F%2F18.144.33.249%2F&text=Check%20out%20these%20flaming%20hot%20styles!&url=http%3A%2F%2F18.144.33.249%2F`}
        href={`https://twitter.com/intent/tweet?hashtags=BetterBeansApp&original_referer=${uri}&text=${message}&url=${uri}`}
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
