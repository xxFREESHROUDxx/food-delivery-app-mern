import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { BsFillTrash3Fill } from 'react-icons/bs';

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>;
  }

  let totalPrice = data.reduce((totalPrice, food) => totalPrice + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-header'>
          <thead className='text-success fs-4'>
            <tr>
              <th className='col'>#</th>
              <th className='col'>Name</th>
              <th className='col'>Quantity</th>
              <th className='col'>Option</th>
              <th className='col'>Amount</th>
              <th className='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th>
                  <img
                    src={food.img}
                    alt={food.name}
                    style={{ height: '64px', objectFit: 'fill' }}
                  />
                </th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>Rs {food.price}/-</td>
                <td>
                  <button
                    type='button'
                    className='btn p-0'
                    alt='delete'
                    onClick={() => dispatch({ type: 'REMOVE', index: index })}
                  >
                    <BsFillTrash3Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-2'>Total Price: Rs {totalPrice}/-</h1>
        </div>
        <button className='btn bg-success mt-5'>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
