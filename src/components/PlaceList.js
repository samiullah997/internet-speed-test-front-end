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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Recent Upload Speed</th>
            <th>Recent Upload Speed Units</th>
            <th>Number of Measurements</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{place.name}</td>
            <td>{place.city}</td>
            <td>{place.most_recent_download_speed}</td>
            <td>{place.most_recent_download_units}</td>
            <td>{place.number_of_measurments}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ));
  if (loading) {
    return <div>Loading...</div>;
  }
  return setDataSection;
};

export default PlaceList;
