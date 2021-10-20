import React from 'react';
import ShopEntry from './ShopEntry';

class ShopList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        { this.props.shopList.map((shop) => <ShopEntry shop={shop} key={shop.id} />)}
      </div>
    );
  }
}

export default ShopList;
