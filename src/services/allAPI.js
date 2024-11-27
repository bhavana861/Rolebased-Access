import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"

// user management

// post http request called Add component when user click on add button
export const saveUserAPI = async (userDetails)=>{
    return await commonAPI("POST",`${SERVERURL}/uploadDetails`,userDetails)
 }
// display data on the broswser
 export const getAllUserAPI = async () => {
    return commonAPI('GET', `${SERVERURL}/uploadDetails`, '');
  };
  
//   delete data
  export const removeUserAPI = async (id) => {
    return commonAPI('DELETE', `${SERVERURL}/uploadDetails/${id}`, {});
  };
 
//   get data for edit
  export const getEditAPI = async (id) => {
    return commonAPI('GET', `${SERVERURL}/uploadDetails/${id}`, ''); 
  };
  
//   update edited data
  export const updateUserAPI = async (userDetails) => {
    return commonAPI('PUT', `${SERVERURL}/uploadDetails/${userDetails.id}`, userDetails); 
  };


// Role management


  export const saveRoleAPI = async (roleDetails)=>{
    return await commonAPI("POST",`${SERVERURL}/uploadRoledetails`,roleDetails)
 }

 export const getAllRoleAPI = async () => {
    return commonAPI('GET', `${SERVERURL}/uploadRoledetails`, '');
  };

  //   delete data
  export const removeRoleAPI = async (id) => {
    return commonAPI('DELETE', `${SERVERURL}/uploadRoledetails/${id}`, {});
  };
  export const getRoleEditAPI = async (id) => {
    return commonAPI('GET', `${SERVERURL}/uploadRoledetails/${id}`, ''); 
  };
  

  export const updateRoleAPI = async (roleDetails) => {
    return commonAPI('PUT', `${SERVERURL}/uploadRoledetails/${roleDetails.id}`, roleDetails); 
  };
