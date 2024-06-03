import React from 'react'
import { useParams } from 'react-router-dom';

let confirmedImage = require("../Assets/Images/confirmed.jpg");

function OrderConfirmed() {
    const {orderHeaderId} = useParams();

    return (
        <div className='text-align-center'>
            <div className='row w-100 mb-5'>
                <span className='text-success text-center' style={{fontSize:"130px"}}>
                    <i className="bi bi-check2-circle"></i>
                </span>
                <span className='text-success text-center h3'>
                    Your Order Has Been Confirmed!
                </span>
                <span className='text-success text-center h3'>
                    Your Order Id: {orderHeaderId}
                </span>
                <span className='text-center' style={{fontWeight:"bold"}}>
                    We will cook soon!
                </span>
                <div className='mt-3 d-flex justify-content-center'>
                    <img className='w-25' src={confirmedImage} style={{border: "1px solid black", borderRadius:"10px"}}></img>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirmed