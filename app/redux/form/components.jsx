import React from 'react';


export const SimpleInput = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    {touched &&
      ((error && <div className="error">{error}</div>) ||
        (warning && <div className="error">{warning}</div>))}
    <label htmlFor={input.name}>{label}</label>
    <input {...input} type={type}/>
  </div>
);
