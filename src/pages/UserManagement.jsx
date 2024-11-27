import { useEffect, useState } from 'react';
import Add from '../components/Add';
import { Link } from 'react-router-dom';
import { getAllUserAPI } from '../services/allAPI.JS';
import { removeUserAPI } from '../services/allAPI.JS';

const UserManagement = () => {
  const [allUser, setAllUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 

  useEffect(() => {
    getAllUser();
  }, []);

  useEffect(() => {
    // Dynamically filter users based on the search query
    if (searchQuery === '') {
      setFilteredUsers(allUser);
    } else {
      setFilteredUsers(
        allUser.filter((user) =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, allUser]);

  // Fetch users and display
  const getAllUser = async () => {
    try {
      const result = await getAllUserAPI();
      if (result.status >= 200 && result.status < 300) {
        setAllUser(result.data);
        setFilteredUsers(result.data); 
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  // Add user handler
  const handleUserAdded = (newUser) => {
    setAllUser((prevUsers) => [...prevUsers, newUser]);
  };

  // Delete user handler
  const deleteUser = async (id) => {
    try {
      await removeUserAPI(id);
      getAllUser();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', background: 'linear-gradient(90deg, #2c003e, #060b26, #000000)', WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent' }}>
          User Management
        </h1>
      </div>
      <Add onUserAdded={handleUserAdded} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',width: '100%',marginTop: '0px'}}>
        <table style={{width: '100%',borderCollapse: 'collapse',textAlign: 'left',border: '1px solid #ddd',}}>
          <thead style={{ backgroundColor: '#f4f4f4' }}>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} style={{ height: '40px' }}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.mobilenumber}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <Link to={`/edit/${user.id}`}>
                    <i style={{ fontSize: '20px', marginLeft: '20px' }} className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <i onClick={() => deleteUser(user?.id)} style={{fontSize: '20px',marginLeft: '20px',color: 'red',}}className="fa-solid fa-trash"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
