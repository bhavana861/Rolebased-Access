import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaUser, FaUserShield } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column vh-100  shadow" style={{ width: '250px',backgroundColor:'whitesmoke' }}>
      <h3 className="text-center mb-4 p-3 text-light" style={{ background: 'purple', height: '100px' }}>
        RBAC Dashboard
      </h3>
      <Nav className="flex-column px-3">
        <Nav.Link href="/" className="d-flex align-items-center my-2 sidebar-link text-dark" >
          <FaUser className="me-2" /> 
          User Management
        </Nav.Link>
        <Nav.Link  href="/role" className="d-flex align-items-center my-2 sidebar-link text-dark" >
          <FaUserShield className="me-2" />
          Role Management
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
