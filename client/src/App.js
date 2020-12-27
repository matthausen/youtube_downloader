import React, { useEffect } from 'react';
import ReactGA from "react-ga";
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  useEffect(() => {
    ReactGA.initialize('UA-185972921-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  })
  return (
    <div className="App">
      <SearchBar />
    </div>
  );
}

export default App;