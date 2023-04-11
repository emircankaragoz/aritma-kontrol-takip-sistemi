import React, { useState } from "react";
import { RiMore2Fill } from "react-icons/ri";
import Modal from "react-bootstrap/Modal";
import ModalForm from "./ModalForm";
import { PanelCSS } from "@/styles";

export default function ModalComponent({ employeeIdToBeUpdated }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <span variant="primary" onClick={handleShow} className="fs-5" style={{cursor: 'pointer'}}>
        <RiMore2Fill className={PanelCSS.updateButton}/>
      </span>

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
