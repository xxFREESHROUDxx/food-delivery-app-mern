import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch('http://localhost:5000/api/foodData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCategory(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id='carouselExampleFade'
          className='carousel slide carousel-fade'
          data-bs-ride='carousel'
        >
          <div className='carousel-inner' id='carousel'>
            <div className='carousel-caption' style={{ zIndex: '10' }}>
              <div className='d-flex justify-content-center'>
                <input
                  className='form-control me-2'
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* <button className='btn btn-outline-success text-white bg-success' type='submit'>
                  Search
                </button> */}
              </div>
            </div>
            <div className='carousel-item active'>
              <img
                src='https://source.unsplash.com/random/1920x1080/?burger'
                className='d-block w-100'
                alt='...'
                style={{ filter: 'brightness(30%)' }}
              />
            </div>
            <div className='carousel-item'>
              <img
                src='https://source.unsplash.com/random/1920x1080/?barbeque'
                className='d-block w-100'
                alt='...'
                style={{ filter: 'brightness(30%)' }}
              />
            </div>
            <div className='carousel-item'>
              <img
                src='https://source.unsplash.com/random/1920x1080/?noodles'
                className='d-block w-100'
                alt='...'
                style={{ filter: 'brightness(30%)' }}
              />
            </div>
          </div>
          <button
            className='carousel-control-prev'
            type='button'
            data-bs-target='#carouselExampleFade'
            data-bs-slide='prev'
          >
            <span className='carousel-control-prev-icon' aria-hidden='true'></span>
            <span className='visually-hidden'>Previous</span>
          </button>
          <button
            className='carousel-control-next'
            type='button'
            data-bs-target='#carouselExampleFade'
            data-bs-slide='next'
          >
            <span className='carousel-control-next-icon' aria-hidden='true'></span>
            <span className='visually-hidden'>Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {foodCategory.length > 0
          ? foodCategory.map((data) => (
              <div className='row mb-3'>
                <div key={data._id}>
                  <h2>{data.CategoryName}</h2>
                </div>
                <hr />
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filteredItems) => {
                      return (
                        <div className='col-12 col-md-6 col-lg-3' key={filteredItems._id}>
                          <Card foodDetails={filteredItems} options={filteredItems.options[0]} />
                        </div>
                      );
                    })
                ) : (
                  <div>No Such Data Found!</div>
                )}
              </div>
            ))
          : ''}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
