import React from 'react';
import '../css/App.css';
import Header from '../component/Header';
import Filter from '../component/Filter';
import Cars from '../component/Cars';

function App() {
  return (
    <div className="App">
      <Header heading={'Cars'} />
      <Filter />
      <div className='d-flex justify-content-center'>
        <Cars />
      </div>
    </div>
  );
}

export default App;
