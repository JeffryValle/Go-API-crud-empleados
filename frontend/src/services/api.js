
const apiUrl = "http://localhost:4000"; // API URL de mi servidor backend

export const obtenerEmpleados = async () => {
    const resp = await fetch(`${apiUrl}/empleados`);
    if (!resp.ok) {
        throw new Error("Error al obtener los empleados");
    }
    const data = await resp.json();
    return data;
}

export const obtenerAreas = async () => {
    const resp = await fetch(`${apiUrl}/areas`);
    if (!resp.ok) {
        throw new Error("Error al obtener las áreas");
    }
    const data = await resp.json();
    return data;
}

export const crearEmpleado = async (empleado) => {
    const resp = await fetch(`${apiUrl}/empleados`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empleado)
    });
    if (!resp.ok) {
        throw new Error("Error al crear el empleado");
    }
    const data = await resp.json();
    return data;
}

export const actualizarEmpleado = async (empleado) => {
    const resp = await fetch(`${apiUrl}/empleados/${empleado.identidad}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empleado)
    });
    if (!resp.ok) {
        throw new Error("Error al actualizar el empleado");
    }
    return await resp.json();
};

export const eliminarEmpleado = async (identidad) => {
    const resp = await fetch(`${apiUrl}/empleados/${identidad}`, {
        method: "DELETE"
    });
    if (!resp.ok) {
        throw new Error("Error al eliminar el empleado");
    }
    return await resp.json();
};

export const obtenerAreaPorId = async (id) => {
    const resp = await fetch(`${apiUrl}/areas/${id}`);
    if (!resp.ok) {
        throw new Error("Error al obtener el área");
    }
    return await resp.json();
};