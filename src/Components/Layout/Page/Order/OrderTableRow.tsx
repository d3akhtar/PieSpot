import React from 'react'
import { orderModel } from '../../../../Interfaces'
import { useNavigate } from 'react-router-dom';
import { getStatusColor } from '../../../../Helper';

interface OrderTableRowProps {
    order: orderModel
}

function OrderTableRow(props: OrderTableRowProps) {
    const navigate = useNavigate();
  return (
    <div className='row w-100 border'>
        <div className='col-12 col-md-1 border py-2'>
            {props.order.orderHeaderID}
        </div>
        <div className='col-12 col-md-1 border py-2'>
            {props.order.pickupName}
        </div>
        <div className='col-12 col-md-3 border py-2 d-flex justify-content-end'>
            {props.order.pickupPhoneNumber}
        </div>
        <div className='col-12 col-md-2 border py-2 d-flex justify-content-end'>
            ${props.order.orderTotal}
        </div>
        <div className='col-12 col-md-1 border py-2 d-flex justify-content-end'>
            {props.order.totalItems}
        </div>
        <div className='col-12 col-md-1 border py-2 d-flex justify-content-end'>
            {new Date(props.order.orderDate!).toLocaleDateString()}
        </div>
        <div className="col-12 col-md-1 py-3 d-flex justify-content-end border">
            <span className={`badge bg-${getStatusColor(props.order.status)}`}>{props.order.status}</span>
        </div>
        <div className='col-12 col-md-2 border py-2 d-flex justify-content-center'>
            <button 
            onClick={() => {navigate(`/order/orderDetails/${props.order.orderHeaderID}`)}} 
            className='btn btn-success'>
                Details
            </button>
        </div>
    </div>
  )
}

export default OrderTableRow