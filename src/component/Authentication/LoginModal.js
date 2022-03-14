import React from "react";
import { connect } from 'react-redux';
import { hideModal } from "../../actions";
import Modal from 'react-bootstrap/Modal';
import LogIn from "./LogIn";

const LoginModal = ({
  revealModal: auth,
  hideLoginModal
}) => {
  const handleClose = () => {
    hideLoginModal();
  }

  return (
    <Modal
      show={auth.revealModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="auth-container container-fluid text-center"
      size="md"
      onHide={handleClose}
    >
      <Modal.Header closeButton className="border-0">
      </Modal.Header>
      <Modal.Body>
      <LogIn redirect={false} reload={true} modalClass="auth-container" />
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = state => ({
  revealModal: state.auth
});


const mapDispatchToProps = dispatch => ({
  hideLoginModal: () => {
    dispatch(hideModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
