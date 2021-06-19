import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function ModalEditar({
  modalEditar,
  handleChange,
  abrirCerrarModalEditar,
  peticionPut,
  frameworkSeleccionado,
}) {
  return (
    <div>
      <Modal isOpen={modalEditar}>
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
              value={frameworkSeleccionado && frameworkSeleccionado.nombre}
            />
            <br />
            <label>Lanzamiento: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="lanzamiento"
              onChange={handleChange}
              value={frameworkSeleccionado && frameworkSeleccionado.lanzamiento}
            />
            <br />
            <label>Desarrollador: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="desarrollador"
              onChange={handleChange}
              value={
                frameworkSeleccionado && frameworkSeleccionado.desarrollador
              }
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPut()}>
            Insertar
          </button>
          {"   "}
          <button
            className="btn btn-danger"
            onClick={() => {
              abrirCerrarModalEditar();
            }}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
