import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import OrderSummary from '../Components/Layout/Page/Order/OrderSummary';
import { useGetOrderWithIdQuery, useUpdateOrderMutation } from '../apis/orderApi';
import { MainLoader, MiniLoader } from '../Components/Layout/Page/CommonComponents';
import { cartItemModel, userModel } from '../Interfaces';
import { SD_Roles, SD_Status } from '../Utilities/staticDetails';
import orderUpdateModel from '../Interfaces/orderUpdateModel';
import { useSelector } from 'react-redux';
import { getStatusColor } from '../Helper';

function OrderDetails() {
    const {orderHeaderID} = useParams();
    const {data,isLoading,isSuccess} = useGetOrderWithIdQuery(orderHeaderID);
    const navigate = useNavigate();

    const [updateOrder] = useUpdateOrderMutation();

    const loggedInUser:userModel = useSelector((state : any) => state.userAuthStore);
    
    const handleGetNextStatusObject = (status: string) => {
        switch(status){
            case SD_Status.CONFIRMED: return { color: "info", value: SD_Status.BEING_COOKED};
            case SD_Status.BEING_COOKED: return { color: "warning", value: SD_Status.READY_FOR_PICKUP};
            case SD_Status.READY_FOR_PICKUP: return { color: "success", value: SD_Status.COMPLETED};
            case SD_Status.COMPLETED: return { color: "success", value: SD_Status.COMPLETED};
        }
    }

    const nextStatus = !isLoading && isSuccess ? (handleGetNextStatusObject(data.result.status)):(undefined);

    const handleUpdateStatus = async () => {
        const updatedOrder : orderUpdateModel =
        {
            orderHeaderID: parseInt(orderHeaderID!),
            pickupName: data.result.pickupName,
            pickupEmail: data.result.pickupEmail,
            pickupPhoneNumber: data.result.pickupPhoneNumber,
            stripePaymentIntentId: data.result.stripePaymentIntentId,
            status: nextStatus!.value
        };
        const result = await updateOrder(updatedOrder);

    }
    const handleCancelOrder = async () => {
        const updatedOrder : orderUpdateModel =
        {
            orderHeaderID: parseInt(orderHeaderID!),
            pickupName: data.result.pickupName,
            pickupEmail: data.result.pickupEmail,
            pickupPhoneNumber: data.result.pickupPhoneNumber,
            stripePaymentIntentId: data.result.stripePaymentIntentId,
            status: SD_Status.CANCELLED
        };
        const result = await updateOrder(updatedOrder);
    }

    var cartItems : cartItemModel[] = [];

    if (!isLoading && isSuccess){
        data.result.orderDetails.forEach((orderDetail : any) => {
            cartItems.push({
                menuItemId: orderDetail.menuItemId,
                menuItem: orderDetail.menuItem,
                quantity: orderDetail.quantity
            })
        })
    }
    

    
    return (
    <div className=''>
        <div className='d-flex align-items-center justify-content-center' style={{height: "70vh"}}>
            {!isLoading && isSuccess ? 
            ((<div className=''>
                <div className='d-flex justify-content-between align-items-center'>
                    <h3 className='text-success'>Order Summary</h3>
                    <span className={`ms-3 btn btn-outline-${getStatusColor(data.result.status)} fs-6`}>
                        {data.result.status}
                    </span>
                </div>
                <OrderSummary 
                    formData = {
                        {
                            name: data.result.pickupName,
                            email: data.result.pickupEmail,
                            phoneNumber: data.result.pickupPhoneNumber
                        }
                    }
                    apiResult= 
                    {
                        {
                            orderHeaderID: orderHeaderID,
                            cartItems: cartItems,
                            status: data.result.status,
                            stripePaymentIntentId: data.result.stripePaymentIntentId
                        }
                    }
                    orderSummary =
                    {
                        {
                            totalPrice: data.result.orderTotal,
                            totalItems: data.result.totalItems
                        }
                    }
                />
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                        <button className='btn btn-secondary' onClick={() => navigate(-1)}>Back To Orders</button>
                        {loggedInUser.role == SD_Roles.ADMIN && data.result.status != SD_Status.CANCELLED? 
                        (<div>
                            {data.result.status != SD_Status.COMPLETED ? (<button className='btn btn-danger mx-3' onClick={handleCancelOrder}>Cancel</button>):(<></>)}
                            <button disabled={data.result.status == SD_Status.COMPLETED} className={`btn btn-${nextStatus!.color}`} onClick={handleUpdateStatus}>{nextStatus!.value}</button>
                    </div>):
                (<></>) }
                </div>
            </div>)):
            (<MainLoader/>)}
        </div>
    </div>
  )
}

export default OrderDetails