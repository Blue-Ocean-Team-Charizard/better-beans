import React from 'react';
import VisitBeanEntry from './VisitBeanEntry';

export default function VisitBeanList({ shoplist }) {
  render() {
    return (
      <div>
        {shopList.map((shop) => <VisitBeanEntry shop={shop} key={shop.id} />)}
      </div>
    );
  }
}

export default VisitBeanList;
