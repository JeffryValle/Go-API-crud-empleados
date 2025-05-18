import { Navbar, Nav } from 'react-bootstrap';

export const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg"> 
      <Navbar.Brand href="#home">Empleados</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#employee-table">Tabla de Empleados</Nav.Link>
          <Nav.Link href="#employee-form">Agregar Empleados</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
