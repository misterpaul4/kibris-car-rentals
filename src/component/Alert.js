import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { hideAlert } from '../actions';
import '../css/Alert.css';

const Alert = ({
  alertState: alart,
  removeAlert,
}) => {


  useEffect(() => {
    setTimeout(() => {
      removeAlert()
    }, 3000)

    return null;
  }, [removeAlert]);

  return (
    <div className="alert-container">
      <p className={alart.positiveOutcome ? "alert-message rounded bg-green" : "alert-message rounded bg-red"}>{alart.message}</p>
    </div>
  )
}

const mapStateToProps = state => ({
  alertState: state.alart
});

const mapDispatchToProps = dispatch => ({
  removeAlert: status => {
    dispatch(hideAlert(status));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
