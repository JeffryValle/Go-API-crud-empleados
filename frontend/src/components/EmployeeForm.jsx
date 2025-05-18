import { useState, useEffect } from 'react';
import { obtenerAreas } from '../services/api';

export const EmployeeForm = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    identidad: '',
    nombre: '',
    edad: '',
    genero: '',
    estadoCivil: '',
    correo: '',
    cargo: '',
    area: ''
  });

  const [ areas, setAreas ] = useState([]);
  const [ errors, setErrors ] = useState({});
  const [ submitted, setSubmitted ] = useState(false);

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  useEffect(() => {
    obtenerAreas()
      .then(data => setAreas(data))
      .catch(() => setAreas([]));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.identidad) newErrors.identidad = "La identidad es obligatoria.";
    else if (!/^\d{13}$/.test(formData.identidad)) newErrors.identidad = "La identidad debe tener 13 dígitos numéricos.";

    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio.";

    if (!formData.edad) newErrors.edad = "La edad es obligatoria.";
    else if (isNaN(formData.edad) || formData.edad < 18 || formData.edad > 99) newErrors.edad = "Edad debe ser un número entre 18 y 99.";

    if (!formData.genero) newErrors.genero = "Debe seleccionar un género.";

    if (!formData.estadoCivil) newErrors.estadoCivil = "Debe seleccionar un estado civil.";

    if (!formData.correo) newErrors.correo = "El correo es obligatorio.";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.correo)) newErrors.correo = "Correo no válido.";

    if (!formData.cargo) newErrors.cargo = "El cargo es obligatorio.";

    if (!formData.area) newErrors.area = "El área es obligatoria.";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSave(formData);
      setFormData({
        identidad: '',
        nombre: '',
        edad: '',
        genero: '',
        estadoCivil: '',
        correo: '',
        cargo: '',
        area: ''
      });
      setSubmitted(false);
      setErrors({});
    }
  };

  return (
    <form onSubmit={ handleSubmit }>
      <div className="row">
        <div className="col-md-6 mb-3">
          {submitted && errors.identidad && <div className="text-danger mb-1">{errors.identidad}</div>}
          <label className="form-label">Identidad</label>
          <input type="text" className="form-control" name="identidad" value={formData.identidad} onChange={handleChange} required />
        </div>
        <div className="col-md-6 mb-3">
          {submitted && errors.nombre && <div className="text-danger mb-1">{errors.nombre}</div>}
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="col-md-6 mb-3">
          {submitted && errors.edad && <div className="text-danger mb-1">{errors.edad}</div>}
          <label className="form-label">Edad</label>
          <input type="number" className="form-control" name="edad" value={formData.edad} onChange={handleChange} required />
        </div>
        <div className="col-md-6 mb-3">
          {submitted && errors.genero && <div className="text-danger mb-1">{errors.genero}</div>}
          <label className="form-label">Género</label>
          <select className="form-select" name="genero" value={formData.genero} onChange={handleChange} required>
            <option value="">Seleccione</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        <div className="col-md-6 mb-3">
          {submitted && errors.estadoCivil && <div className="text-danger mb-1">{errors.estadoCivil}</div>}
          <label className="form-label">Estado Civil</label>
          <select className="form-select" name="estadoCivil" value={formData.estadoCivil} onChange={handleChange} required>
            <option value="">Seleccione</option>
            <option value="S">Soltero</option>
            <option value="C">Casado</option>
            <option value="U">Unión Libre</option>
            <option value="D">Divorciado</option>
          </select>
        </div>
        <div className="col-md-6 mb-3">
          {submitted && errors.correo && <div className="text-danger mb-1">{errors.correo}</div>}
          <label className="form-label">Correo</label>
          <input type="email" className="form-control" name="correo" value={formData.correo} onChange={handleChange} required />
        </div>
        <div className="col-md-6 mb-3">
          {submitted && errors.cargo && <div className="text-danger mb-1">{errors.cargo}</div>}
          <label className="form-label">Cargo</label>
          <input type="text" className="form-control" name="cargo" value={formData.cargo} onChange={handleChange} required />
        </div>
        <div className="col-md-6 mb-3">
          {submitted && errors.area && <div className="text-danger mb-1">{errors.area}</div>}
          <label className="form-label">Área</label>
          <select
            className="form-select"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            { 
              areas.map( area => (
              <option key={ area.id } value={ area.id }>
                { area.nombre }
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary me-2">Guardar</button>
        <button type="button" className="btn btn-secondary" onClick={ onCancel }>Cancelar</button>
      </div>
    </form>
  );
};