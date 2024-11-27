import React, { useState } from 'react'
import { Modal, Button, FloatingLabel, Form } from 'react-bootstrap';
import { saveRoleAPI } from '../services/allAPI';


const RoleAdd = ({onRoleAdded,searchQuery, setSearchQuery}) => {
    const [showModal, setShowModal] = useState(false);
    const [roleDetails, setRoleDetails] = useState({
     roles: '',
      permission: '',
    
    });
  

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleRole = async(event)=>{
      event.preventDefault();
      const{roles,permission} = roleDetails
      if(roles && permission){
          try{
              const result = await saveRoleAPI(roleDetails)
              console.log(result);
              handleClose(); 
          
              if(result.status>=200 && result.status<300){
                  alert("role details addedd successfully!!!")
                  onRoleAdded(result.data); 
                  handleClose()
              }else{
                  console.log(result);
                  
              }
              
          }catch(err){
              console.log(err);
              
          }
      }else{
          alert("Please fill the form!!!")
      }
  }
  
  return (
    <div className="d-flex align-items-center justify-content-between p-3 border bg-light">
  
      <div>
        <h3 style={{ color: 'black', margin: 0 }}>All Roles</h3>
      </div>
      <div className="d-flex align-items-center">
        <Form.Control type="text" placeholder="Search roles..." className="me-3" style={{ width: '250px', borderRadius: '5px' }}  onChange={(e) => setSearchQuery(e.target.value)}/>
        <button onClick={handleShow} style={{ backgroundColor: 'black',fontSize: '18px',borderRadius: '7px',color: 'white',padding: '5px 15px'}}>
          + Add Roles
        </button>
      </div>
      <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false} centered dialogClassName="modal-90w" style={{backgroundColor:'rgba(rgba(173, 216, 230, 1))'}}>
        <Modal.Header closeButton style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)' }}>
        <Modal.Title>Add Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
          <div className="border rounded p-3">
            {/* Role field */}
            <FloatingLabel className="mb-3" controlId="floatingRole" label="Enter Role*" style={{backgroundColor: 'rgba(240, 240, 240, 0.9)', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'}} >
              <Form.Control name="roles" type="text" placeholder="Enter Role" onChange={e=>setRoleDetails({...roleDetails,roles:e.target.value})}/>
            </FloatingLabel>

            {/* permission field */}
            <FloatingLabel className="mb-3" controlId="floatingPermission" label="Enter Permissions(read,write,delete*)"  style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'}} >
              <Form.Control   name="permission" type="" placeholder="Enter Permissions(read,write,delete*)" onChange={e=>setRoleDetails({...roleDetails,permission:e.target.value})} />
            </FloatingLabel>
          </div>
        </Modal.Body>
        {/* button */}
        <Modal.Footer style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)' }}>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="btn btn-info" variant="primary" onClick={handleRole}>
            Add Role
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default RoleAdd
