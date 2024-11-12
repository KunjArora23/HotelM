import React from 'react';

const ProgressBar = ({ label, value, max }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h3 className="text-xl mb-4">{label}</h3>
      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          style={{ width: `${percentage}%` }}
          className="h-full bg-green-500"
        ></div>
      </div>
      <p className="mt-2 text-sm">{value} of {max}</p>
    </div>
  );
}

export default ProgressBar;
