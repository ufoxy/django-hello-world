import React from 'react';
import { Routes, Route, HashRouter } from "react-router-dom";
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Home from '../src/pages/Home/Home';

function App() {

  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;

