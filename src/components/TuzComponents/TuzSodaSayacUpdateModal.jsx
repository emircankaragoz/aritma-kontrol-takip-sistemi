import React, { useState } from "react";
import { RiMore2Fill } from "react-icons/ri";
import Modal from "react-bootstrap/Modal";
import { TuzCSS } from "@/styles";
import { TuzSodaSayacUpdateModalForm } from "..";

export default function TuzSodaSayacUpdateModalComponent({
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
        <RiMore2Fill className={TuzCSS.updateButton} />
      </span>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Bilgileri Güncelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TuzSodaSayacUpdateModalForm formIdToBeUpdated={formIdToBeUpdated} />
        </Modal.Body>
      </Modal>
    </>
  );
}
