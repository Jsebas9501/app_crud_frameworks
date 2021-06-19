import React from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

export default function ModalEliminar({
  modalEliminar,
  peticionDelete,
  frameworkSeleccionado,
  abrirCerrarModalEliminar,
}) {
  return (
    <div>
      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar el Framework{" "}
          {frameworkSeleccionado && frameworkSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
