import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalForm from "./ModalForm";

export default function ModalComponent({dataId}) {
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
          <Modal.Title>Bilgileri Güncelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalForm dataId={dataId} />
        </Modal.Body>
      </Modal>
    </>
  );
}
