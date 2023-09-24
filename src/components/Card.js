import React from 'react';

export default function Card({ foodDetails }) {
  const { name, img, options } = foodDetails;

  return (
    <>
      <div className='card mt-3 rounded-4' style={{ width: '18rem', maxHeight: '400px' }}>
        <img src={img} className='card-img-top' alt={name} />
        <div className='card-body'>
          <h5 className='card-title'>{name}</h5>
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
              {Object.keys(options[0]).map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>

            <div className='d-inline h-100 fs-5'>Total Price</div>
          </div>
        </div>
      </div>
    </>
  );
}
