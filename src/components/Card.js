import React, { useEffect, useRef, useState } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';
import { toast } from 'react-toastify';

export default function Card(props) {
  const { _id, name, img, description } = props.foodDetails;

  let dispatch = useDispatchCart();
  let data = useCart();
  let priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === _id) {
        food = item;
        break;
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: 'UPDATE', id: _id, price: finalPrice, qty: quantity });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: 'ADD',
          id: _id,
          name: name,
          price: finalPrice,
          qty: quantity,
          size: size,
          img: img,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: 'ADD',
      id: _id,
      name: name,
      price: finalPrice,
      qty: quantity,
      size: size,
      img: img,
    });

    toast.success('Item Added to Cart', {
      position: 'bottom-right', // You can adjust the position
      autoClose: 3000,
    });
  };

  let finalPrice = quantity * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <>
      <div
        className='card mt-3 rounded-4'
        style={{ width: '19rem', maxHeight: '520px', borderRadius: '10px' }}
      >
        <img
          src={img}
          className='card-img-top'
          alt={name}
          style={{
            height: '200px',
            objectFit: 'fill',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
          }}
        />
        <div className='card-body'>
          <h5 className='card-title'>{name}</h5>
          <p className='card-text'>{description}</p>
          <div className='container w-100 m-0 p-0'>
            <select
              className='m-2 h-100 bg-success rounded'
              style={{ width: '3rem' }}
              onChange={(e) => setQuantity(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select
              className='m-2 h-100 bg-success rounded'
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>

            <div className='h-100 fs-5'>Rs {finalPrice}/-</div>
          </div>
          <hr />
          <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
