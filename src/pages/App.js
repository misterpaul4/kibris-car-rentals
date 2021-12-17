import '../css/App.css';
import Header from '../component/Header';
import Filter from '../component/Filter';
import Cars from '../component/Cars';

function App() {
  return (
    <div className="App">
      <Header />
      <Filter />
      <div className='d-flex justify-content-center'>
        <Cars />
      </div>
    </div>
  );
}

export default App;
