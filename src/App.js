import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/redux/config/store';
import PlaceList from './components/PlaceList';
import InternetSpeeds from './components/InternetSpeeds';

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="bg-white p-8 rounded-md w-full">
        <Routes>
          <Route index element={<PlaceList />} />
          <Route path="new-internet-speed" element={<InternetSpeeds />} />
        </Routes>
      </div>
    </Router>
  </Provider>
);

export default App;
