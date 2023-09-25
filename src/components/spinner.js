// Spinner.js
import React from 'react';

const Spinner = () => (
  <div
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 9999,
    }}
  >
    <div
      style={{
        border: '4px solid rgba(0, 0, 0, 0.3)',
        borderTop: '4px solid #000',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 2s linear infinite',
      }}
    ></div>
  </div>
);

export default Spinner;
