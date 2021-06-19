import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import ModalInsertar from "./components/ModalInsertar";
import ModalEditar from "./components/ModalEditar";
import ModalEliminar from "./components/ModalEliminar";

function App() {
  const baseUrl = "http://localhost/apiFrameworks/";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [frameworkSeleccionado, setFrameworkSeleccionado] = useState({
    id: "",
    nombre: "",
    lanzamiento: "",
    desarrollador: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFrameworkSeleccionado((prevent) => ({ ...prevent, [name]: value }));
    console.log(frameworkSeleccionado);
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const peticionGet = async () => {
    await axios.get(baseUrl).then((respuesta) => {
      setData(respuesta.data);
    });
  };

  const peticionPost = async () => {
    let f = new FormData();
    f.append("nombre", frameworkSeleccionado.nombre);
    f.append("lanzamiento", frameworkSeleccionado.lanzamiento);
    f.append("desarrollador", frameworkSeleccionado.desarrollador);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f).then((respuesta) => {
      setData(data.concat(respuesta.data));
      abrirCerrarModalInsertar();
    });
  };

  const peticionPut = async () => {
    var f = new FormData();
    f.append("nombre", frameworkSeleccionado.nombre);
    f.append("lanzamiento", frameworkSeleccionado.lanzamiento);
    f.append("desarrollador", frameworkSeleccionado.desarrollador);
    f.append("METHOD", "PUT");
    await axios
      .post(baseUrl, f, { params: { id: frameworkSeleccionado.id } })
      .then((response) => {
        let dataNueva = data;
        dataNueva.map((framework) => {
          if (framework.id === frameworkSeleccionado.id) {
            framework.nombre = frameworkSeleccionado.nombre;
            framework.lanzamiento = frameworkSeleccionado.lanzamiento;
            framework.desarrollador = frameworkSeleccionado.desarrollador;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionDelete = async () => {
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(baseUrl, f, { params: { id: frameworkSeleccionado.id } })
      .then((response) => {
        setData(
          data.filter((framework) => framework.id !== frameworkSeleccionado.id)
        );
        abrirCerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const seleccionarFramework = (framework, caso) => {
    setFrameworkSeleccionado(framework);

    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div className="col-auto p-5 text-center">
      <br />
      <button
        className="btn btn-success"
        onClick={() => abrirCerrarModalInsertar()}
      >
        Insertar
      </button>
      <br />
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Lanzamiento</th>
            <th>Desarrollador</th>
          </tr>
        </thead>
        <tbody>
          {data.map((framework) => (
            <tr key={framework.id}>
              <td>{framework.id}</td>
              <td>{framework.nombre}</td>
              <td>{framework.lanzamiento}</td>
              <td>{framework.desarrollador}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => seleccionarFramework(framework, "Editar")}
                >
                  Editar
                </button>
                {"  "}
                <button
                  className="btn btn-danger"
                  onClick={() => seleccionarFramework(framework, "Eliminar")}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalInsertar
        modalInsertar={modalInsertar}
        abrirCerrarModalInsertar={abrirCerrarModalInsertar}
        handleChange={handleChange}
        peticionPost={peticionPost}
      />
      <ModalEditar
        modalEditar={modalEditar}
        abrirCerrarModalEditar={abrirCerrarModalEditar}
        handleChange={handleChange}
        peticionPut={peticionPut}
        frameworkSeleccionado={frameworkSeleccionado}
      />
      <ModalEliminar
        modalEliminar={modalEliminar}
        peticionDelete={peticionDelete}
        abrirCerrarModalEliminar={abrirCerrarModalEliminar}
        frameworkSeleccionado={frameworkSeleccionado}
      />
    </div>
  );
}

export default App;
