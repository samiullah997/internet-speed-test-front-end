import React from 'react';
import { Link } from 'react-router-dom';

const InternetSpeeds = () => (
  <div className="flex flex-col items-center">
    <div className="flex items-center justify-between pb-6 w-full">
      <Link to="/">
        <div>
          <h2 className="text-4xl text-gray-600 font-semibold">Log Internet Speed</h2>
        </div>
      </Link>
    </div>
    <div className="w-6/12">
      <div className="mb-4 md:flex flex-col md:justify-between">
        <div className="mb-4 md:mb-0">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="placeName">
            Place Name
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="placeName"
              type="text"
              placeholder="Place Name"
            />
          </label>
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="city">
            City
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="city"
              type="text"
              placeholder="city"
            />
          </label>
        </div>
      </div>
      <div className="mb-6 text-center">
        <button
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="button"
        >
          Start Speed Test
        </button>
      </div>
      <hr className="mb-6 border-t" />
    </div>
  </div>
);

export default InternetSpeeds;
