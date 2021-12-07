import '../css/App.css';
import Header from '../component/Header';
import Filter from '../component/Filter';
import Cars from '../component/Cars';

function App() {
  return (
    <div className="App">
      <Header />
      <Filter />
       <Cars />
    </div>
  );
}

export default App;
