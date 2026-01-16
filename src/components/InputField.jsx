import React from 'react'

export default function InputField({ label, id, type, value, autoComplete, onChange }) {
  return (
    <div className="mb-5 ">
      <label htmlFor={id} className="block mb-3 font-medium text-amber-100">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5`}
      />
    </div>
  );
}

