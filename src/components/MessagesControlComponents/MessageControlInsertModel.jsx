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
import {
  AkmAnaliziInsertForm,
  AerobikHavuzuInsertForm,
  AmonyumAzotAnalizBiyolojikInsertForm,
  AmonyumAzotAnalizCikisInsertForm,
  AmonyumAzotAnalizDengelemeInsertForm,
  AnaerobikHavuzuInsertForm,
  AtiksuAritmaGirisCikisInsertForm,
  BiyolojikCokeltimHavuzuInsertForm,
  DengelemeHavuzuInsertForm,
  DesarjInsertForm,
  FiltrepresInsertForm,
  GeriDevirHaznesiInsertForm,
} from "./Aritma";
import { TuzSodaSayacToplamaInsertForm } from "./Tuz";
import { UserService, EmailService } from "@/services";
import moment from "moment";

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
      case SYSTEM_MESSAGES.A1.code:
        setModalBody(
          <div>
            <AkmAnaliziInsertForm date={date} session={session} />
          </div>
        );
        break;
      case SYSTEM_MESSAGES.A2.code:
        setModalBody(
          <div>
            <AerobikHavuzuInsertForm date={date} session={session} />
          </div>
        );
        break;
      case SYSTEM_MESSAGES.A3.code:
        setModalBody(
          <div>
            <AmonyumAzotAnalizBiyolojikInsertForm
              date={date}
              session={session}
            />
          </div>
        );
        break;
      case SYSTEM_MESSAGES.A4.code:
        setModalBody(
          <div>
            <AmonyumAzotAnalizCikisInsertForm date={date} session={session} />
          </div>
        );
        break;

      case SYSTEM_MESSAGES.A5.code:
        setModalBody(
          <div>
            <AmonyumAzotAnalizDengelemeInsertForm
              date={date}
              session={session}
            />
          </div>
        );
        break;
      case SYSTEM_MESSAGES.A6.code:
        setModalBody(
          <div>
            <AnaerobikHavuzuInsertForm date={date} session={session} />
          </div>
        );
        break;
      case SYSTEM_MESSAGES.A7.code:
        setModalBody(
          <div>
            <AtiksuAritmaGirisCikisInsertForm date={date} session={session} />
          </div>
        );
        break;
      case SYSTEM_MESSAGES.A8.code:
        setModalBody(
          <div>
            <BiyolojikCokeltimHavuzuInsertForm date={date} session={session} />
          </div>
        );
        break;
      case SYSTEM_MESSAGES.A9.code:
        setModalBody(
          <div>
            <DengelemeHavuzuInsertForm date={date} session={session} />
          </div>
        );
        break;
      case SYSTEM_MESSAGES.A10.code:
        setModalBody(
          <div>
            <DesarjInsertForm date={date} session={session} />
          </div>
        );
        break;
      case SYSTEM_MESSAGES.A11.code:
        setModalBody(
          <div>
            <FiltrepresInsertForm date={date} session={session} />
          </div>
        );
        break;
      case SYSTEM_MESSAGES.A13.code:
        setModalBody(
          <div>
            <GeriDevirHaznesiInsertForm date={date} session={session} />
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
