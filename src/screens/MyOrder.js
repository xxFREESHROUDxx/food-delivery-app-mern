import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const MyOrder = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyOrder = async () => {
    await fetch('http://localhost:5000/api/myOrderData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: localStorage.getItem('userEmail') }),
    })
      .then(async (res) => {
        let response = await res.json();
        setOrderData(response.orderData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching order data: ', err.message);
      });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className='container mt-4'>
        <h1 className='text-center mb-4'>My Orders</h1>
        {loading ? (
          <p>Loading...</p>
        ) : orderData.length === 0 ? (
          <p>No Orders Found!</p>
        ) : (
          orderData.map((orderGroup, index) => (
            <div key={index}>
              <div className='d-flex align-items-center justify-content-between mt-5 mb-3'>
                <h3 className=''>Order Date: {orderGroup.order_date}</h3>
                <h4>
                  Total Price: Rs{orderGroup.items.reduce((total, item) => total + item.price, 0)}/-
                </h4>
              </div>
              <hr />
              <div className='row'>
                {orderGroup.items.map((order, orderIndex) => (
                  <div className='col-12 col-md-6 col-lg-3 mb-4' key={orderIndex}>
                    <div className='card h-100 d-flex flex-column' style={{ borderRadius: '10px' }}>
                      <img
                        src={order.img}
                        alt={order.name}
                        className='card--img-top'
                        style={{
                          height: '250px',
                          objectFit: 'cover',
                          borderTopLeftRadius: '10px',
                          borderTopRightRadius: '10px',
                        }}
                      />
                      <div className='card-body flex-grow-1'>
                        <h5 className='card-title'>{order.name}</h5>
                        <p className='card-text'>
                          Price: Rs {order.price}/- <br />
                          Quantity: {order.qty} <br />
                          Size: {order.size}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default MyOrder;
