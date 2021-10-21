import React from 'react';
import VisitBeanEntry from './VisitBeanEntry';

export default function VisitBeanList({ title, shopList }) {

  return (
    <div>
      <h1>{title}</h1>
      {shopList.map((shop) => <VisitBeanEntry shop={shop} key={shop.id} />)}
    </div>
  );
}
