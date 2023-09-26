import React from 'react';
import { AiFillHeart } from 'react-icons/ai';

export const Footer = () => {
  return (
    <div>
      <footer className='d-flex flex-wrap align-items-center justify-content-center flex-column py-3 mt-4 border-top'>
        <span className='mb-3 mb-md-0 text-muted'>© 2023 FoodNepal, Inc</span>
        <div className='mb-md-0 text-muted'>
          Made with <AiFillHeart color='red' /> by Baibhav
        </div>
      </footer>
    </div>
  );
};
