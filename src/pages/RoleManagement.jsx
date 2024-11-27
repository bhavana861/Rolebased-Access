import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RoleAdd from '../components/RoleAdd';
import { getAllRoleAPI } from '../services/allAPI';
import { removeRoleAPI } from '../services/allAPI';


const RoleManagement = () => {
  const [allRole, setAllRole] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 


  useEffect(() => {
    getAllRole();
  }, []);

  useEffect(() => {
    // Dynamically filter users based on the search query
    if (searchQuery === '') {
      setFilteredRoles(allRole);
    } else {
      setFilteredRoles(
        allRole.filter((roless) =>
          roless.roles.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, allRole]);

    // Add role handler
    const handleRolesAdded = (newRoles) => {
      setAllRole((prevRoles) => [...prevRoles, newRoles]);
    };
  

    // Fetch roles and display
  const getAllRole = async () => {
    try {
      const result = await getAllRoleAPI();
      if (result.status >= 200 && result.status < 300) {
        setAllRole(result.data);
        setFilteredRoles(result.data);
     
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

    // Delete user handler
    const deleteRole = async (id) => {
      try {
        await removeRoleAPI(id);
        getAllRole();
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <div >
    
    <div style={{ padding: '20px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', background: 'linear-gradient(90deg, #2c003e, #060b26, #000000)', WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent'}}>
          Role Management
          </h1>
        </div>
        <RoleAdd onRoleAdded={handleRolesAdded} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '0px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', border: '1px solid #ddd' }}>
              <thead style={{ backgroundColor: '#f4f4f4' }}>
                <tr>
                  <th>ID</th>
                  <th>Role</th>
                  <th>Permissions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
  {
    filteredRoles.map((roless,index)=>(
      <tr key={roless.id} style={{ height: '40px' }}>
      <td>{index + 1}</td>
      <td>{roless.roles}</td>
      <td>{roless.permission}</td>
      <td>
        <Link to={`/editrole/${roless.id}`}>
          <i  style={{ fontSize: '20px', marginLeft: '20px' }} className="fa-solid fa-pen-to-square"></i>
        </Link>
        <i onClick={()=>deleteRole(roless?.id)} style={{fontSize: '20px',marginLeft: '20px',color: 'red'}}className="fa-solid fa-trash"
        ></i>
      </td>
    </tr>
    ))
  }
              </tbody>
            </table>
          </div>
        </div>
  );
};

export default RoleManagement;
