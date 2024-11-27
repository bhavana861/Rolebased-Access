import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserManagement from './pages/UserManagement';
import RoleManagement from './pages/RoleManagement';
import Sidebar from './components/Sidebar';
import Add from './components/Add';
import Edit from './components/Edit';
import RoleAdd from './components/RoleAdd';
import RoleEdit from './components/RoleEdit';

function App() {
  return (
    <div className="d-flex">
         <Sidebar />
      <div className="flex-grow-1 p-3">
        <Routes>
          <Route path="/" element={<UserManagement/>}/>
          <Route path="/role" element={<RoleManagement/>} />
          <Route path="/add" element={<Add/>} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path='addrole' element={<RoleAdd/>}/>
          <Route path='/editrole/:id' element={<RoleEdit/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
