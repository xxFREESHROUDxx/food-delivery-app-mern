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

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem('userEmail');
    let orderDate = new Date();
    // using the whole time and date. but if only date needed then orderDate must be new Date().toDateString();
    let formattedOrderDate = `${orderDate.toLocaleTimeString()}, ${orderDate.toLocaleDateString()}`;

    let response = await fetch('http://localhost:5000/api/orderData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: formattedOrderDate,
      }),
    });

    if (response.status === 200) {
      dispatch({ type: 'DROP' });
      alert('Your Order has been confirmed. Please pay once the order arrives at your doorstep!');
    }
  };

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
              <tr key={index}>
                <th>
                  <img
                    src={food.img}
                    alt={food.name}
                    style={{ height: '64px', objectFit: 'fill', width: '100px' }}
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
                    <BsFillTrash3Fill color='red' size={32} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-2'>Total Price: Rs {totalPrice}/-</h1>
        </div>
        <button className='btn bg-success mt-5' onClick={handleCheckOut}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
