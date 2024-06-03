import React, { useState } from 'react'
import "./Banner.css"
import { useDispatch } from 'react-redux';
import { setSearch } from '../../../../storage/redux/menuItemSlice';

function Banner() {

    const [val,setVal] = useState("");
    const dispatch = useDispatch();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.target.value));
        setVal(e.target.value);
    }

  return (
    <div className='customer-banner'>
        <div
        className='m-auto d-flex align-items-center'
        style={{
            width: "400px",
            height: "50vh",
        }}>
            <div className='d-flex align-items-center' style={{width: "100%"}}>
                <input
                onChange={handleChange}
                value={val} 
                type="text"
                className='form-control rounded-pill'
                style={{
                    width: "100%",
                    padding: "20px"
                }}
                placeholder='Search for food items!'
                />
                <span style={{position: "relative", left: "-43px"}}>
                    <i className='bi bi-search'></i>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Banner