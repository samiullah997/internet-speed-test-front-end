import React, { useState, useEffect } from 'react';

const PlaceList = () => {
  const [loading, setLoading] = useState(true);
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    const apiEndPoint = 'http://localhost:3001/api/places';
    fetch(apiEndPoint)
      .then((responce) => responce.json())
      .then((places) => {
        setLoadedPlaces(places.places);
        setLoading(false);
      });
  }, []);

  const setDataSection = loadedPlaces.map((place) => (
    <div key={place.name}>
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
            
          </table>
        </div>
      </div>
    </div>
  ));
  if (loading) {
    return <div>Loading...</div>;
  }
  return setDataSection;
};

export default PlaceList;
