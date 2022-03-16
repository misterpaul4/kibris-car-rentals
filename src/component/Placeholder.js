import React from "react";
// import Spinner from 'react-bootstrap/Spinner';
import Placeholder from 'react-bootstrap/Placeholder';
import '../css/Cars.css';

const Loader = () => {
  return (
    <div className="container cars-container p-3">
      <Placeholder as="p" animation="glow">
        <Placeholder className="lg-height loader-bg" size="lg" xs={12} />
      </Placeholder>
    </div>
  )
}

export default Loader;
