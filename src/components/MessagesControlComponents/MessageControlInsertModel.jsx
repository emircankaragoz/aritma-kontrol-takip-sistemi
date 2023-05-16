import React, { useState, useEffect } from "react";
import { RiAddBoxFill } from "react-icons/ri";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { AritmaCSS } from "@/styles";
import { SYSTEM_MESSAGES } from "../../../environment";
import {
  SulfirikAsitInsertForm,
  RenkGidericiInsertForm,
  DemirUcKlorurInsertForm,
} from "./AritmaMaddeKullanim";
import { TuzSodaSayacToplamaInsertForm } from "./Tuz";

export default function InsertOldDatasModal({ messageCode, date, session }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalBody, setModalBody] = useState(null);

  useEffect(() => {
    switch (messageCode) {
      case SYSTEM_MESSAGES.T1.code:
        setModalBody(
          <div>
            <TuzSodaSayacToplamaInsertForm date={date} session={session} />
          </div>
        );
        break;
      case SYSTEM_MESSAGES.M1.code:
        setModalBody(
          <div>
            <SulfirikAsitInsertForm date={date} session={session} />
          </div>
        );
        break;
      case SYSTEM_MESSAGES.M2.code:
        setModalBody(
          <div>
            <DemirUcKlorurInsertForm date={date} session={session} />
          </div>
        );
        break;
      case SYSTEM_MESSAGES.M3.code:
        setModalBody(
          <div>
            <RenkGidericiInsertForm date={date} session={session} />
          </div>
        );
        break;
      default:
        setModalBody(<div>Form bulunamadı.</div>);
        break;
    }
  }, [messageCode]);

  return (
    <>
      <Button
        variant="light"
        onClick={handleShow}
        className="btn mx-auto w-50 mb-2"
      >
        Hemen Ekle
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hemen Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
      </Modal>
    </>
  );
}
