import React, { useEffect, useState } from 'react';
import { Modal, Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getEditAPI } from '../services/allAPI.JS';
import { updateUserAPI } from '../services/allAPI.JS';

const Edit = () => {
  const [showModal, setShowModal] = useState(true);
  const [userDetails, setUserrDetails] = useState({
    username: "", email: "", mobilenumber: "", role: "", status: ""
  });

  const navigate = useNavigate(); 
  const { id } = useParams();

  const [errors, setErrors] = useState({
    email: '',
    mobilenumber: ''
  });

  const validatePhoneNumber = (number) => /^[0-9]{10}$/.test(number);
  const validateEmail = (email) => email.includes('@gmail.com');


  const handleClose = () => {
    setShowModal(false);
    navigate(-1); 
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const result = await getEditAPI(id); 
        if (result.status >= 200 && result.status < 300) {
          setUserrDetails(result.data); 
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };
    fetchUserDetails();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const { username, email, mobilenumber, role, status } = userDetails;
    let validationErrors = { email: '', mobilenumber: '' };

    if (!validateEmail(email)) {
      validationErrors.email = 'Invalid email. Please use a Gmail address.';
    }

    if (!validatePhoneNumber(mobilenumber)) {
      validationErrors.mobilenumber = 'Invalid phone number. It should be exactly 10 digits.';
    }

    if (validationErrors.email || validationErrors.mobilenumber) {
      setErrors(validationErrors);
      return;
    }

    if  (username && email && mobilenumber && role && status) {
      try {
        const result = await updateUserAPI(userDetails); 
        if (result.status >= 200 && result.status < 300) {
          alert('User details updated successfully!');
          handleClose();
        } else {
          console.error('Error updating user:', result);
        }
      } catch (err) {
        console.error('Error during update:', err);
      }
    } else {
      alert('Please fill in all the fields!');
    }
  };


  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false} centered dialogClassName="modal-90w" style={{backgroundColor:'rgba(rgba(173, 216, 230, 1))'}}>
    <Modal.Header closeButton style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)' }}>
    <Modal.Title>Edit User Details</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
      <div className="border rounded p-3">

          {/* Username field  */}
        <FloatingLabel className="mb-3" controlId="floatingUsername" label="User name*" style={{backgroundColor: 'rgba(240, 240, 240, 0.9)', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'}} >
          <Form.Control name="username" type="text" placeholder="Enter User Name"  value={userDetails.username}
              onChange={(e) => setUserrDetails({ ...userDetails, username: e.target.value })}  />
        </FloatingLabel>

    {/* email field */}
        <FloatingLabel className="mb-3" controlId="floatingEmail" label="E mail*"  style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'}} >
          <Form.Control   name="email" type="email" placeholder="Enter Email" value={userDetails.email}
     onChange={(e) => {
      setUserrDetails({ ...userDetails, email: e.target.value });
      setErrors({ ...errors, email: '' }); 
    }}
  />
  {errors.email && <small className="text-danger">{errors.email}</small>} 
        </FloatingLabel>

        {/* mobile number */}
        <FloatingLabel className="mb-3" controlId="floatingMobilenumber" label=" Mobile number*" style={{backgroundColor: 'rgba(240, 240, 240, 0.9)', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'}} >
          <Form.Control name="mobilenumber" type="text" placeholder=" Mobile number" value={userDetails.mobilenumber}
            onChange={(e) => {setUserrDetails({ ...userDetails, mobilenumber: e.target.value });
              setErrors({ ...errors, mobilenumber: '' });   }}/>
          {errors.mobilenumber && <small className="text-danger">{errors.mobilenumber}</small>}
        </FloatingLabel>

        {/* Role field */}
        <FloatingLabel className="mb-3" controlId="floatingRole" label="Role*" style={{backgroundColor: 'rgba(240, 240, 240, 0.9)', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'}} >
          <Form.Control name="role" type="text" placeholder="Enter Role" value={userDetails.role}
              onChange={(e) => setUserrDetails({ ...userDetails, role: e.target.value })}/>
        </FloatingLabel>

        {/* status */}
        <FloatingLabel controlId="floatingStatus" style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'}}>
          <Form.Select name="status" aria-label="Select Status" value={userDetails.status}
              onChange={(e) => setUserrDetails({ ...userDetails, status: e.target.value })}>
            <option>Select Status*</option>
            <option>Active</option>
            <option>Inactive</option>
          </Form.Select>
        </FloatingLabel>

      </div>
    </Modal.Body>
    <Modal.Footer style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)' }}>

      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>

      <Button onClick={handleUpdate} className="btn btn-success" variant="primary">
       Save updation
      </Button>

    </Modal.Footer>
  </Modal>
  )
}

export default Edit