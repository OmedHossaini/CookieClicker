import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Item";
import cookieSrc from "../cookie.svg";
import React, { useEffect, useState } from "react";
import useInterval from "../hooks/use-interval";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1, priceIncreaseFactor: 1.25 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10, priceIncreaseFactor: 1.25 },
  { id: "farm", name: "Farm", cost: 1000, value: 80, priceIncreaseFactor: 1.25 },
  { id: "megaCursor", name: "megaCursor", cost: 10, value: 1, priceIncreaseFactor: 1.25 },
];

const Game = () => {
const [numCookies, setNumCookies] = useState(100);
const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
    megaCursor: 0,
});
const [CookiesPerSecond, setCookiesPerSecond] = useState(0);
const [CookiesPerClick, setCookiesPerClick] = useState(1);

const handleItemClick = (itemId) => {
  const itemToPurchase = items.find((item) => item.id === itemId);

  if (itemToPurchase && numCookies >= itemToPurchase.cost) {
    setNumCookies(numCookies - itemToPurchase.cost);

    if (itemId === "megaCursor") {
      setCookiesPerClick(CookiesPerClick + itemToPurchase.value);
    } else {
      const newItems = [...items];
      const purchasedItem = newItems.find((item) => item.id === itemId);
      if (purchasedItem) {
        const newCost = Math.floor(purchasedItem.cost * purchasedItem.priceIncreaseFactor);
        purchasedItem.cost = newCost;
      }
      setPurchasedItems({
        ...purchasedItems,
        [itemId]: purchasedItems[itemId] + 1,
      });
    }
  } else {
    alert('Not enough cookies to purchase this item.');
  }
};

const calculateCookiesPerTick = (purchasedItems) => {
  let cookiesPerTick = 0;
  for (const item of items) {
    cookiesPerTick += purchasedItems[item.id] * item.value;
  }
  return cookiesPerTick;
};

useInterval(() => {
  const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
  setNumCookies(numCookies + numOfGeneratedCookies);
  setCookiesPerSecond(numOfGeneratedCookies);
}, 1000);

const handleKeydown = (ev) => {
  if (ev.code === "Space") {
    setNumCookies(numCookies + CookiesPerClick);
    }
  };

useEffect(() => {
    document.title = `${numCookies} cookies - Cookie Clicker Workshop!`  
      window.addEventListener('keydown', handleKeydown);

    return () => {
      document.title = "Cookie CLicker Workshop";
      window.removeEventListener('keydown', handleKeydown);
    };
}, [numCookies]);





  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {CookiesPerSecond} cookies per second
        </Indicator>
        <Button>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item) => (
          <div key={item.id}>
          <Item
          id={item.id}
          name={item.name}
          cost={item.cost}
          value={item.value}
          purchasedItems={purchasedItems[item.id]}
          handleClick={handleItemClick}
          />
          </div>
        ))}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};


const BoldSpan = styled.span`
    font-weight: bold;
`
const CookiesPerSecond = styled.p`
font-size: 10px;
color: lime;`

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
