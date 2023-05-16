import React, { useState } from "react";
import { RiMore2Fill } from "react-icons/ri";
import Modal from "react-bootstrap/Modal";
import { AritmaCSS } from "@/styles";
import RenkGidericiUpdateModelForm from "./RenkGidericiUpdateModalForm";


export default function RenkGidericiUpdateModal({
  formIdToBeUpdated,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <span
        variant="primary"
        onClick={handleShow}
        className="fs-5"
        style={{ cursor: "pointer" }}
      >
        <RiMore2Fill className={AritmaCSS.updateButton} />
      </span>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Bilgilerini Güncelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RenkGidericiUpdateModelForm formIdToBeUpdated={formIdToBeUpdated} />
        </Modal.Body>
      </Modal>
    </>
  );
}
