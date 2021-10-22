import React from 'react';
import ShopEntry from './ShopEntry';

class ShopList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { shopList } = this.props;
    return (
      <div>
<<<<<<< HEAD
        {shopList.map((shop, index) => <ShopEntry shop={shop} key={index} />)}
=======
        {shopList.map((shop) => <ShopEntry shop={shop} key={shop.place_id} />)}
>>>>>>> 9a3c7ef2b906ab268d80a3aa5ddd40067eea1efe
      </div>
    );
  }
}

export default ShopList;
