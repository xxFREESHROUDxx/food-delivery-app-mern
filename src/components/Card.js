import React from 'react';

export default function Card() {
  return (
    <>
      <div className='card mt-3 rounded-4' style={{ width: '18rem', maxHeight: '400px' }}>
        <img
          src='https://source.unsplash.com/random/200x200/?burger'
          className='card-img-top'
          alt='chicken'
          style={{ maxHeight: '250px' }}
        />
        <div className='card-body'>
          <h5 className='card-title'>Chicken Burger</h5>
          <p className='card-text'>This is some important text</p>
          <div className='container w-100 m-0 p-0'>
            <select
              className='m-2 h-100 bg-success rounded'
              style={{ width: '3rem' }}
              name=''
              id=''
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select className='m-2 h-100 bg-success rounded' name='' id=''>
              <option value='half'>Half</option>
              <option value='full'>Full</option>
            </select>

            <div className='d-inline h-100 fs-5'>Total Price</div>
          </div>
        </div>
      </div>
    </>
  );
}
