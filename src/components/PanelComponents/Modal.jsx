import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalForm from "./ModalForm";

export default function ModalComponent({ employeeIdToBeUpdated }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Güncelle
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kullanıcı Bilgileri Güncelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalForm employeeIdToBeUpdated={employeeIdToBeUpdated} />
        </Modal.Body>
      </Modal>
    </>
  );
}
