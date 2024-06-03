import React from 'react'
import { withAuth } from '../HOC'
import OrderTableRow from '../Components/Layout/Page/Order/OrderTableRow'
import { useGetOrdersWithUserIdQuery } from '../apis/orderApi'
import { useSelector } from 'react-redux'
import { orderModel } from '../Interfaces'
import { useNavigate } from 'react-router-dom'
import { SD_Roles } from '../Utilities/staticDetails'

function OrdersList() {

    const loggedInUser = useSelector((state : any) => state.userAuthStore);
    const {data, isLoading,isSuccess,isError,error} = useGetOrdersWithUserIdQuery(loggedInUser.id);

  return (
    <div className='p-5'>
        <div className='row w-100'>
            <span className='h1 text-success'>Orders List</span>
        </div>
        <div className='row w-100 border'>
            <div className='col-12 col-md-1 border py-2'>
                ID
            </div>
            <div className='col-12 col-md-1 border py-2'>
                Name
            </div>
            <div className='col-12 col-md-3 border py-2 d-flex justify-content-end'>
                Phone
            </div>
            <div className='col-12 col-md-2 border py-2 d-flex justify-content-end'>
                Total
            </div>
            <div className='col-12 col-md-1 border py-2 d-flex justify-content-end'>
                Items
            </div>
            <div className='col-12 col-md-1 border py-2 d-flex justify-content-end'>
                Date
            </div>
            <div className="col-12 col-md-1 py-2 d-flex justify-content-end border">Status</div>
            <div className='col-12 col-md-2 border py-2 d-flex justify-content-end'>
            </div>
        </div>
        {!isLoading && isSuccess ? 
            (data.result
                .map((order : orderModel, i: number) => {
                return <OrderTableRow order={order} key={i}/>
            })):
            (<></>)}
    </div>
  )
}

export default withAuth(OrdersList)