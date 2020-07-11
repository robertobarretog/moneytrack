import React from 'react';
import classnames from 'classnames';

const Input = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
}) => (
  <div className="mb-6">
    <label
      className="block text-orange-500 text-sm font-bold mb-2"
      htmlFor={name}
    >
      {label}
    </label>
    <input
      className={classnames(
        'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline',
        { 'border-red-600': error }
      )}
      disabled={disabled}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
    />
    {info && <small className="text-grey-500">{info}</small>}
    {error && <p className="text-red-600 text-sm italic">{error}</p>}
  </div>
);

Input.defaultProps = {
  type: 'text',
};

export default Input;
