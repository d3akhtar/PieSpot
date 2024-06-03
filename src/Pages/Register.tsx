import React, { useState } from 'react'
import { SD_Roles } from '../Utilities/staticDetails'
import { apiResponseModel, userModel } from '../Interfaces'
import { inputHelper, toastNotify } from '../Helper';
import { useRegisterUserMutation } from '../apis/authApi';
import { useNavigate } from 'react-router-dom';

function Register() {

  const initialFormData = 
  {
    fullName: "",
    email: "",
    password: "",
    role: ""
  };

  const [formData,setFormData] = useState(initialFormData);
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const nav = useNavigate();

  const [register] = useRegisterUserMutation();

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault();
    const tempData = inputHelper(e, formData);
    setFormData(tempData);
  }
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      setIsLoading(true);

      const userCredentials = {
        userName: formData.email,
        name: formData.fullName,
        password: formData.password,
        role: formData.role
      }
      const response:apiResponseModel = await register(userCredentials);
      if (response.data){
        toastNotify("Registration was successful!");
        nav("/login")
      }
      if (response.error){
        toastNotify(response.error.data.errorMessages[response.error.data.errorMessages.length - 1], "error");
      }
      setFormData(initialFormData);

      (document.getElementById("role-select") as HTMLSelectElement).value = "default";

      setIsLoading(false);
  }
  

  return (
    <div>
        <div className='row w-100' style={{height:"60px"}}></div>
        <div className='row w-100'>
            <span className='h1 text-center'>Register</span>
        </div>
        <div className='row w-100 p-4'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='m-3 d-flex justify-content-center'>
                    <input onChange={handleInputChange} name="email" className='form-control w-50' placeholder='Enter Username' value={formData.email}></input>
                </div>
                <div className='m-3 d-flex justify-content-center'>
                    <input onChange={handleInputChange} name="fullName" className='form-control w-50' placeholder='Enter Name' value={formData.fullName}></input>
                </div>
                <div className='m-3 d-flex justify-content-center'>
                    <input onChange={handleInputChange} name="password" type="password" className='form-control w-50' placeholder='Enter Password' value={formData.password}></input>
                </div>
                <div className='m-3 d-flex justify-content-center'>
                    <select id="role-select" onChange={handleInputChange} name="role" className='form-select form-control w-50'>
                        <option value="default" selected disabled>--Select--</option>
                        <option value={SD_Roles.CUSTOMER}>Customer</option>
                        <option value={SD_Roles.ADMIN}>Admin</option>
                    </select>
                </div>
                <div className='m-3 d-flex justify-content-center'>
                    <button type="submit" className='mt-5 btn btn-success form-control' style={{width:"5%"}}>Register</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register