import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function ModalInsertar({
  modalInsertar,
  abrirCerrarModalInsertar,
  handleChange,
  peticionPost,
}) {
  return (
    <div>
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Framework</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={handleChange}
            />
            <br />
            <label>Lanzamiento: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="lanzamiento"
              onChange={handleChange}
            />
            <br />
            <label>Desarrollador: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="desarrollador"
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPost()}>
            Insertar
          </button>
          {"   "}
          <button
            className="btn btn-danger"
            onClick={() => {
              abrirCerrarModalInsertar();
            }}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
