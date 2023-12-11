import React from 'react';

function Item({ id, name, cost, value, purchasedItems, handleClick }) {
  return (
    <div className="item">
      <h2>{name}</h2>
      <p>Cost: {cost} cookies</p>
      <p>Value: {value} cookies/second</p>
      <p>Owned: {purchasedItems}</p>
      <button onClick={() => handleClick(id)}>Buy</button>
    </div>
  );
}

export default Item;
