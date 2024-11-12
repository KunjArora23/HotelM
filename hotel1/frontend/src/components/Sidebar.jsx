import React from 'react';

const Sidebar = ({ onSidebarClick }) => {
  return (
    <div className="w-1/5 bg-gray-800 text-white p-5">
      <h1 className="text-2xl font-bold mb-10">Hotel Admin</h1>
      <ul>
        <li className="mb-4 hover:bg-gray-600 p-2 rounded cursor-pointer" onClick={() => onSidebarClick('addRoom')}>
          Add Room
        </li>
        <li className="mb-4 hover:bg-gray-600 p-2 rounded cursor-pointer" onClick={() => onSidebarClick('deleteRoom')}>
          Delete Room
        </li>
        <li className="mb-4 hover:bg-gray-600 p-2 rounded cursor-pointer" onClick={() => onSidebarClick('showRooms')}>
          Show Rooms
        </li>
        <li className="mb-4 hover:bg-gray-600 p-2 rounded cursor-pointer" onClick={() => onSidebarClick('dashboard')}>
          Dashboard
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
