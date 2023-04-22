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
