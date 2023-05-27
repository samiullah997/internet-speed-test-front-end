import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PlaceList = () => {
  const [loading, setLoading] = useState(true);
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  let i = 0;

  useEffect(() => {
    const apiEndPoint = `http://localhost:3001/api/places?search_term=${searchTerm}`;
    fetch(apiEndPoint)
      .then((responce) => responce.json())
      .then((places) => {
        setLoadedPlaces(places.places);
        setLoading(false);
      });
  }, [searchTerm]);

  const onSearchTextChange = (e) => {
    // setLoading(true);
    setSearchTerm(e.target.value);
  };

  const setDataSection = () => (
    <div>
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="text-4xl text-gray-600 font-semibold">Places</h2>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex bg-gray-50 items-center p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input className="bg-gray-50 outline-none ml-1 block " value={searchTerm} onChange={onSearchTextChange} type="text" name="" id="" placeholder="search..." />
          </div>
          <div className="lg:ml-40 ml-10 space-x-8">
            <Link to="/new-internet-speed">
              <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" type="button">New Log</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  City
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Recent Upload Speed
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Recent Upload Speed Units
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Number of Measurements
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loadedPlaces.map((place) => (
                /* eslint-disable-next-line no-plusplus */
                <tr key={i++}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img className="w-full h-full rounded-full" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="profile" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {place.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{place.city}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{place.most_recent_download_speed}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{place.most_recent_download_units}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{place.number_of_measurments}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  return setDataSection();
};

export default PlaceList;
