import React from 'react';
import { useState } from 'react';


const products = [
  { title: 'Cabbage', id: 1, handleClick: 'one' },
  { title: 'Garlic', id: 2, handleClick: 'two' },
  { title: 'Apple', id: 3, handleClick: 'three' },
];


const Test = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => setCount(count + 1)

  const list = products.map((product) => (
    <li key={product.id} onClick={handleClick} style={{color: count < 10 ? 'white' : 'blue'}}>
      {count}
    </li>
  ))

  return (
    <div>
      {list}
    </div>
  );
};

export default Test;