import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Button, FloatingLabel, Form } from 'react-bootstrap';
import { getRoleEditAPI } from '../services/allAPI.JS';
import { updateRoleAPI } from '../services/allAPI.JS';


const RoleEdit = () => {
  const [showModal, setShowModal] = useState(true);
  const [roleDetails, setRolesDetails] = useState({
    roles: "", permission: ""
  });
  const navigate = useNavigate(); 
  const { id } = useParams();


  const handleClose = () => {
    setShowModal(false);
    navigate(-1); 
  };

  useEffect(() => {
    const fetchRoleDetails = async () => {
      try {
        const result = await getRoleEditAPI(id); 
        if (result.status >= 200 && result.status < 300) {
          setRolesDetails(result.data); 
        }
      } catch (err) {
        console.error('Error fetching Role details:', err);
      }
    };
    fetchRoleDetails();
  }, [id]);

  const handleRoleUpdate = async (event) => {
    event.preventDefault();
    const { roles,permission} = roleDetails;
    if  (roles&&permission) {
      try {
        const result = await updateRoleAPI(roleDetails); 
        if (result.status >= 200 && result.status < 300) {
          alert('Role details updated successfully!');
          handleClose();
        } else {
          console.error('Error updating Role:', result);
        }
      } catch (err) {
        console.error('Error during update:', err);
      }
    } else {
      alert('Please fill in all the fields!');
    }
  };



  return (
    <div>
      <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false} centered dialogClassName="modal-90w"
        style={{ backgroundColor:'rgba(rgba(173, 216, 230, 1))'}}>
        <Modal.Header closeButton style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)' }}>
          <Modal.Title>Edit Role Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}>
          <div className="border rounded p-3">

            {/* Role field */}
            <FloatingLabel className="mb-3" controlId="floatingRole" label="Role*" style={{backgroundColor: 'rgba(240, 240, 240, 0.9)', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)' }}>
              <Form.Control name="role" type="text" placeholder="Enter Role" style={{backgroundColor: 'rgba(240, 240, 240, 0.9)',
                  boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'}} value={roleDetails.roles}
                  onChange={(e) => setRolesDetails({ ...roleDetails,roles: e.target.value })}/>
            </FloatingLabel>

            {/* permission feild */}
            <FloatingLabel  className="mb-3"  controlId="floatingPermission"  label="Permissions(read, write, delete*)"  style={{backgroundColor: 'rgba(240, 240, 240, 0.9)',boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',}}>
              <Form.Control name="permission" type="text" placeholder="Enter Permissions" style={{backgroundColor: 'rgba(240, 240, 240, 0.9)', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)', }}  value={roleDetails.permission}
              onChange={(e) => setRolesDetails({ ...roleDetails, permission: e.target.value })}/>
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)' }}>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="btn btn-info" variant="primary" onClick={handleRoleUpdate}>
            Save updation
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoleEdit;
