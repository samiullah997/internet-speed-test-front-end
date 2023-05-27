import React, { useEffect, useState } from 'react';
import { ReactInternetSpeedMeter } from 'react-internet-meter';
import { Link, useNavigate } from 'react-router-dom';

const InternetSpeeds = () => {
  const [testInProgress, setTestInProgress] = useState(false);
  const [downloadSpeeds, setDownloadSpeeds] = useState([]);
  const [latestDownloadSpeeds, setLatestDownloadSpeeds] = useState(null);
  const [placeName, setPlaceName] = useState('');
  const [placeCity, setPlaceCity] = useState('');
  const [placeAddress, setPlaceAddress] = useState('');
  const navigate = useNavigate();
  const MAX_REQUESTS_FOR_SPEED_TEST = 5;
  const SPEED_TEST_PING_INTERVAL_MS = 1000;

  useEffect(() => {
    if (latestDownloadSpeeds) {
      const newDownloadSpeeds = [...downloadSpeeds, latestDownloadSpeeds];
      setDownloadSpeeds(newDownloadSpeeds);
      const sufficientDataPoints = newDownloadSpeeds.length >= MAX_REQUESTS_FOR_SPEED_TEST;
      if (sufficientDataPoints) {
        const apiEndPoint = 'http://localhost:3001/api/internet_speed';
        const data = {
          download_units: 'mbps',
          download_speed:
            ((1.0 * newDownloadSpeeds
              .reduce((a, b) => a + parseFloat(b), 0)) / downloadSpeeds.length),
          name: placeName,
          city: placeCity,
          address: placeAddress,
        };

        fetch(apiEndPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then((response) => {
          if (response.ok) {
            navigate('/');
          } else {
            window.location.reload();
            /* eslint-disable no-console */
            console.log(`Server Erro: ${response}`);
          }
          setTestInProgress(false);
          setDownloadSpeeds([]);
        }).catch((err) => {
          window.location.reload();
          console.log('Network Error: ', err);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestDownloadSpeeds]);
  return (
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
                onChange={(e) => setPlaceName(e.target.value)}
              />
            </label>
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="address">
              Address
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="Address"
                onChange={(e) => setPlaceAddress(e.target.value)}
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
                onChange={(e) => setPlaceCity(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="mb-6 text-center">
          {testInProgress
            && (
              <div>
                <div>Testing...</div>
                <ReactInternetSpeedMeter
                  txtSubHeading="Internet is too slow"
                  outputType="alert"
                  customClassName={null}
                  txtMainHeading="Opps..."
                  pingInterval={SPEED_TEST_PING_INTERVAL_MS} // milliseconds
                  thresholdUnit="megabyte" // "byte" , "kilobyte", "megabyte"
                  threshold={0}
                  imageUrl="https://cdn.speedcheck.org/images/reviews/google-fiber-speed-test-mobile.jpg"
                  downloadSize="157000" // bytes
                  callbackFunctionOnNetworkTest={(speed) => setLatestDownloadSpeeds(speed)}
                />
              </div>
            )}
          {!testInProgress && downloadSpeeds.length === 0 && (
            <button
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => setTestInProgress(true)}
            >
              Start Speed Test
            </button>
          )}
        </div>
        <hr className="mb-6 border-t" />
      </div>
    </div>
  );
};

export default InternetSpeeds;
