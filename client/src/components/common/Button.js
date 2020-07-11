import React from 'react';

const Button = ({ value, onClick, bgColor, txtColor }) => {
  const className = `transition duration-500 ease-in-out mt-5 p-2 text-${txtColor}-400 bg-${bgColor}-600 hover:bg-${bgColor}-500 cursor-pointer rounded-lg w-32 mx-auto`;
  return (
    <button className={className} type="button" onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
