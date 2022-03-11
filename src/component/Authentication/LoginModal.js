import React from "react";
import Modal from 'react-bootstrap/Modal';
import LogIn from "./LogIn";

const LoginModal = () => {

  return (
    <Modal
      show={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="auth-container container-fluid text-center"
      size="md"
    >
      <Modal.Header closeButton className="border-0">
      </Modal.Header>
      <Modal.Body>
      <LogIn modalClass="auth-container" />
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
