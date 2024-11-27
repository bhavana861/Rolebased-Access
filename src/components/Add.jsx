import React, { useState } from 'react';
import { Modal, Button, FloatingLabel, Form } from 'react-bootstrap';
import { saveUserAPI } from '../services/allAPI.JS';

const Add = ({ onUserAdded, searchQuery, setSearchQuery }) => {
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    mobilenumber: '',
    role: '',
    status: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    mobilenumber: '',
  });

  const handleShow = () => setShowModal(true);

  const handleClose = () => {
    setShowModal(false);
    // Reset the form and errors when closing the modal
    setUserDetails({
      username: '',
      email: '',
      mobilenumber: '',
      role: '',
      status: '',
    });
    setErrors({
      email: '',
      mobilenumber: '',
    });
  };

  const validatePhoneNumber = (number) => /^[0-9]{10}$/.test(number);
  const validateEmail = (email) => email.includes('@gmail.com');

  const handleUser = async (event) => {
    event.preventDefault();
    const { username, email, mobilenumber, role, status } = userDetails;
    let validationErrors = { email: '', mobilenumber: '' };

    // Email validation
    if (!validateEmail(email)) {
      validationErrors.email = 'Invalid email. Please use a Gmail address.';
    }

    // Mobile number validation
    if (!validatePhoneNumber(mobilenumber)) {
      validationErrors.mobilenumber = 'Invalid phone number. It should be exactly 10 digits.';
    }

    // Check for validation errors
    if (validationErrors.email || validationErrors.mobilenumber) {
      setErrors(validationErrors);
      return;
    }

    if (username && email && mobilenumber && role && status) {
      try {
        const result = await saveUserAPI(userDetails);
        if (result.status >= 200 && result.status < 300) {
          alert('User details added successfully!');
          onUserAdded(result.data); 
          handleClose(); 
        } else {
          console.error('Failed to add user:', result);
        }
      } catch (err) {
        console.error('Error adding user:', err);
      }
    } else {
      alert('Please fill the form completely!');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-3 border bg-light">
      <div>
        <h3 style={{ color: 'black', margin: 0 }}>All Users</h3>
      </div>
      <div className="d-flex align-items-center">
        {/* Search Field */}
        <Form.Control type="text" placeholder="Search users by their names..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          className="me-3" style={{ width: '250px', borderRadius: '5px' }}/>
        <button onClick={handleShow} style={{backgroundColor: 'black',fontSize: '18px',borderRadius: '7px',color: 'white',padding: '5px 15px'}}>
          + Add User
        </button>
      </div>
      <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false} centered  style={{backgroundColor:'rgba(rgba(173, 216, 230, 1))'}}>
        <Modal.Header closeButton style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)'}}>
          <Modal.Title>Add User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
          {/* Username Field */}
          <FloatingLabel className="mb-3" controlId="floatingUsername" label="Enter User Name*" style={{backgroundColor: 'rgba(240, 240, 240, 0.9)', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'}}>
            <Form.Control
              name="username"
              type="text"
              placeholder="Enter User Name"
              value={userDetails.username}
              onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
            />
          </FloatingLabel>

          {/* Email Field */}
          <FloatingLabel className="mb-3" controlId="floatingEmail" label="Enter Email*" style={{backgroundColor: 'rgba(240, 240, 240, 0.9)', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'}}>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter Email"
              value={userDetails.email}
              onChange={(e) => {
                setUserDetails({ ...userDetails, email: e.target.value });
                setErrors({ ...errors, email: '' }); 
              }}
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </FloatingLabel>

          {/* Mobile Number Field */}
          <FloatingLabel className="mb-3" controlId="floatingMobilenumber" label="Enter Mobile Number*" style={{backgroundColor: 'rgba(240, 240, 240, 0.9)', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'}}>
            <Form.Control
              name="mobilenumber"
              type="text"
              placeholder="Enter Mobile Number"
              value={userDetails.mobilenumber}
              onChange={(e) => {
                setUserDetails({ ...userDetails, mobilenumber: e.target.value });
                setErrors({ ...errors, mobilenumber: '' }); 
              }}
            />
            {errors.mobilenumber && <small className="text-danger">{errors.mobilenumber}</small>}
          </FloatingLabel>

          {/* Role Field */}
          <FloatingLabel className="mb-3" controlId="floatingRole" label="Enter Role*" style={{backgroundColor: 'rgba(240, 240, 240, 0.9)', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'}}>
            <Form.Control
              name="role"
              type="text"
              placeholder="Enter Role"
              value={userDetails.role}
              onChange={(e) => setUserDetails({ ...userDetails, role: e.target.value })}
            />
          </FloatingLabel>

          {/* Status Field */}
          <FloatingLabel controlId="floatingStatus" label="" style={{backgroundColor: 'rgba(240, 240, 240, 0.9)', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'}}>
            <Form.Select
              name="status"
              aria-label="Select Status"
              value={userDetails.status}
              onChange={(e) => setUserDetails({ ...userDetails, status: e.target.value })}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)' }}>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUser} className="btn btn-info">
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Add;
