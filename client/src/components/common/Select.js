import React from 'react';
import classnames from 'classnames';

const Select = ({ name, value, error, info, onChange, options, label }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div>
      <label className="block text-orange-500 font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <select
        className={classnames(
          'shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline',
          { 'border-red-600': error }
        )}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="text-blue-600">{info}</small>}
      {error && <p className="text-red-600 italic">{error}</p>}
    </div>
  );
};

export default Select;
