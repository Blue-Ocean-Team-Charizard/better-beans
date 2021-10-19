import Link from 'next/link';
import styles from '../styles/Shoplist.module.css';

const ShopEntry = ({ shop }) => {
  return (
    <div className={styles.CardShop}>
      <Link href="#">
        <a className="">
          <h3 className="name">{shop.name}</h3>
          <div className="review">{shop.review}</div>
          <div className="time">{shop.status}</div>
          <div className="location">{shop.location}</div>
        </a>
      </Link>
    </div>
  );
};

export default ShopEntry;
