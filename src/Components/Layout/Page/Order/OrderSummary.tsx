import React from 'react'
import OrderSummaryMenuItem from './OrderSummaryMenuItem'
import { cartItemModel, userModel } from '../../../../Interfaces';
import { getStatusColor } from '../../../../Helper';
import { useNavigate } from 'react-router-dom';
import { SD_Roles, SD_Status } from '../../../../Utilities/staticDetails';
import { useSelector } from 'react-redux';
import { useUpdateOrderMutation } from '../../../../apis/orderApi';
import orderUpdateModel from '../../../../Interfaces/orderUpdateModel';

export interface orderSummaryProps {
    apiResult: any,
    formData: any,
    orderSummary: any,
}

function OrderSummary(props: orderSummaryProps) {
    return (
    <div>
        <div className='row border mt-1 '><span className='ms-2'>Name: {props.formData.name}</span></div>
        <div className='row border'><span className='ms-2'>Email: {props.formData.email}</span></div>
        <div className='row border'><span className='ms-2'>Phone: {props.formData.phoneNumber}</span></div>
        <div className='row border'>
            <span className='ms-2 text-success h4 mt-3'>Menu Items </span>
            {
                props.apiResult.cartItems.map((cartItem: cartItemModel, i:number) => {
                    return <OrderSummaryMenuItem cartItem={cartItem} key={i}/>
                })
            }
            <div className='row ms-2 mt-2'>
                <div className='d-flex justify-content-center' style={{border:"1px solid black"}}></div>
               <div className='d-flex justify-content-end'>
                    <span className='text-danger h2'>${props.orderSummary.totalPrice}</span>
               </div>
            </div>
        </div>
    </div>
  )
}

export default OrderSummary