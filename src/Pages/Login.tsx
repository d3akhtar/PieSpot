import React, { useState } from 'react'
import { useLoginUserMutation } from '../apis/authApi';
import { getJwtToken, inputHelper } from '../Helper';
import { apiResponseModel } from '../Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from '../storage/redux/userAuthSlice';
import { useNavigate } from 'react-router-dom';
import { MiniLoader } from '../Components/Layout/Page/CommonComponents';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loggedInUser = useSelector((state:any) => state.userAuthStore);

    const initialFormData = 
    {
      username: "",
      password: "",
    };
  
    const [formData,setFormData] = useState(initialFormData);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [error,setError] = useState("");
  
    const [login] = useLoginUserMutation();
  
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      e.preventDefault();
      const tempData = inputHelper(e, formData);
      setFormData(tempData);
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setIsLoading(true);
  
        const userCredentials = {
          username: formData.username,
          password: formData.password,
        }
        const response:apiResponseModel = await login(userCredentials);
        if (response.data){
        setError("");
          const token = response.data.result.token;
          localStorage.setItem("token", response.data.result.token);
          const decodedToken = getJwtToken(token);
          if (decodedToken !== undefined){
            dispatch(setLoggedInUser(decodedToken));
            navigate("/");
          }
        }
        if (response.error){
          setError(response.error.data.errorMessages[response.error.data.errorMessages.length - 1]);
        }
        setFormData(initialFormData);
    
        setIsLoading(false);
    }
  return (
    <div>
        <div className='row w-100' style={{height:"60px"}}></div>
        <div className='row w-100'>
            <span className='h1 text-center'>Login</span>
        </div>
        <div className='row w-100 p-4'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='m-3 d-flex justify-content-center'>
                    <input onChange={handleInputChange} value={formData.username} name="username" className='form-control w-50' placeholder='Enter Username'></input>
                </div>
                <div className='m-3 d-flex justify-content-center'>
                    <input onChange={handleInputChange} value={formData.password} name="password" type="password" className='form-control w-50' placeholder='Enter Password'></input>
                </div>
                {error == "" ? (<></>):(
                    <div className='text-center'>
                        <p className='text-danger'>{error}</p>
                    </div>
                )}
                <div className='d-flex justify-content-center'>
                    <button type="submit" className='mt-1 btn btn-success form-control' style={{width:"5%"}}>Login</button>
                </div>
                {isLoading ? 
                    (<div className='mt-5 d-flex justify-content-center'>
                        <MiniLoader/>
                    </div>):
                    (<></>)
                }
            </form>
        </div>
    </div>
  )
}

export default Login