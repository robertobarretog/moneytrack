import React from 'react';

const SubmitBtn = ({ value }) => (
  <button
    className="transition duration-500 ease-in-out mt-5 p-2 text-blue-600 bg-orange-500 hover:bg-orange-400 cursor-pointer rounded-lg w-32 mx-auto"
    type="submit"
  >
    {value}
  </button>
);

export default SubmitBtn;
