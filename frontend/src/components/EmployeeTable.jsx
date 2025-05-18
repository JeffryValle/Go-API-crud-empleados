import { useEffect, useState } from "react";
import { EmployeeForm } from "./EmployeeForm";
import { actualizarEmpleado, crearEmpleado, eliminarEmpleado, obtenerAreaPorId, obtenerAreas, obtenerEmpleados } from "../services/api";
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';

// Funciones para traducir los códigos a palabras
const genero = { M: "Masculino", F: "Femenino" };
const estadoCivil = {
  S: "Soltero",
  C: "Casado",
  U: "Unión Libre",
  D: "Divorciado"
};

function formatFecha(fecha) {
  if (!fecha) return "";
  return new Date(fecha).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
}

export const EmployeeTable = () => {
  const [ showModal, setShowModal ] = useState(false);
  const [ empleados, setEmpleados ] = useState([]);
  const [ editEmpleado, setEditEmpleado ] = useState(null);
  const [ nombreArea, setNombreArea ] = useState("");
  const [ areas, setAreas ] = useState([]);

  const [ searchField, setSearchField ] = useState("nombre");
  const [ searchValue, setSearchValue ] = useState("");
  const [ filteredEmpleados, setFilteredEmpleados ] = useState([]);

  const EmpleadoToForm = (empleado) => {
    const areaObj = areas.find(a => a.nombre === empleado.area);
  return {
    identidad: empleado.id,
    nombre: empleado.nombre,
    edad: empleado.edad,
    genero: empleado.genero,
    estado_civil: empleado.estado_civil,
    correo: empleado.correo,
    cargo: empleado.cargo,
    area: areaObj ? String(areaObj.id) : "",
  };
}

  useEffect(() => {
  if (!searchValue) {
    setFilteredEmpleados(empleados);
    return;
  }
  setFilteredEmpleados(
    empleados.filter(emp => {
      const val = emp[searchField];
      if (val === undefined || val === null) return false;
      return String(val).toLowerCase().includes(searchValue.toLowerCase());
    })
  );
}, [searchValue, searchField, empleados]);

  useEffect(() => {
    obtenerAreas().then(setAreas);
  }, []);
  
  useEffect(() => {
    obtenerEmpleados().then(data => {
      setEmpleados(data);
    }).catch(error => {
      console.error("Error al obtener los empleados:", error);
    });
  }, []);

  // Agregar empleado
  const handleAgregarEmpleado = async (nuevoEmpleado) => {
    console.log("Nuevo empleado:", nuevoEmpleado);
  await crearEmpleado({
      id: nuevoEmpleado.identidad,
      nombre: nuevoEmpleado.nombre,
      edad: parseInt(nuevoEmpleado.edad, 10),
      genero: nuevoEmpleado.genero,
      estado_civil: nuevoEmpleado.estadoCivil,
      correo: nuevoEmpleado.correo,
      cargo: nuevoEmpleado.cargo,
      area: nuevoEmpleado.area
    });
  setShowModal(false);
  obtenerEmpleados().then(setEmpleados);
    Swal.fire({
      title: "Exitoso",
      text: "Empleado agregado correctamente",
      icon: "success",
    });
};

// Actualizar empleado
  const handleEditarEmpleado = async(empleado) => {
    console.log("Empleado a editar:", empleado);
    setEditEmpleado(EmpleadoToForm(empleado, areas));
    setShowModal(true);
  };

const handleActualizarEmpleado = async (empleadoActualizado) => {
  const payload = {
    identidad: empleadoActualizado.identidad,
    nombre: empleadoActualizado.nombre,
    edad: parseInt(empleadoActualizado.edad, 10),
    genero: empleadoActualizado.genero,
    estado_civil: empleadoActualizado.estadoCivil,
    correo: empleadoActualizado.correo,
    cargo: empleadoActualizado.cargo,
    area: empleadoActualizado.area
  };
  console.log("Empleado actualizado:", payload);
  await actualizarEmpleado(payload);
  setShowModal(false);
  setEditEmpleado(null);
  obtenerEmpleados().then(setEmpleados);
  Swal.fire({ title: "Exitoso", text: "Empleado actualizado correctamente", icon: "success" });
};

  // Eliminar empleado
  const handleEliminarEmpleado = async (identidad) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });
    if (confirm.isConfirmed) {
      await eliminarEmpleado(identidad);
      obtenerEmpleados().then(setEmpleados);
      Swal.fire({ title: "Eliminado", text: "Empleado eliminado correctamente", icon: "success" });
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Lista de Empleados</h2>
        <button
          className="btn btn-success"
          onClick={() => setShowModal(true)}
        >
          Agregar Empleado
        </button>
      </div>

      <div className="d-flex align-items-center mb-3">
        <label className="me-2 mb-0">Buscar por:</label>
        <select
          className="form-select me-2"
          style={{ width: 180 }}
          value={searchField}
          onChange={e => setSearchField(e.target.value)}
        >
          <option value="id">Identidad</option>
          <option value="nombre">Nombre</option>
          <option value="edad">Edad</option>
          <option value="genero">Género</option>
          <option value="estado_civil">Estado Civil</option>
          <option value="correo">Correo</option>
          <option value="cargo">Cargo</option>
          <option value="area">Área</option>
          <option value="fecha_ingreso">Fecha de Ingreso</option>
        </select>
        <input
          type="text"
          className="form-control"
          style={{ width: 250 }}
          placeholder="Buscar..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Identidad</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Genero</th>
            <th>Estado Civil</th>
            <th>Correo</th>
            <th>Cargo</th>
            <th>Area</th>
            <th>Fecha de Ingreso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          { filteredEmpleados.map((emp, idx) => (
            <tr key={idx}>
              <td>{ emp.id }</td>
              <td>{ emp.nombre }</td>
              <td>{ emp.edad }</td>
              <td>{ genero[emp.genero] || emp.genero }</td>
              <td>{ estadoCivil[emp.estado_civil] || emp.estado_civil }</td>
              <td>{ emp.correo }</td>
              <td>{ emp.cargo }</td>
              <td>{ emp.area }</td>
              <td>{ formatFecha(emp.fecha_ingreso) }</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditarEmpleado(emp)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleEliminarEmpleado(emp.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editEmpleado ? "Editar Empleado" : "Agregar Empleado"}</h5>
                <button type="button" className="btn-close" onClick={() => { setShowModal(false); setEditEmpleado(null); setNombreArea(""); }}></button>
              </div>
              <div className="modal-body">
                { nombreArea && (
                  <div className="alert alert-info py-2">
                    <strong>Área seleccionada:</strong> { nombreArea }
                  </div>
                )}
                <EmployeeForm
                  employee={editEmpleado}
                  onSave={editEmpleado ? handleActualizarEmpleado : handleAgregarEmpleado}
                  onCancel={() => { setShowModal(false); setEditEmpleado(null); setNombreArea(""); }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};