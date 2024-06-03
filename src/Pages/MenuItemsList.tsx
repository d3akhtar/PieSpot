import React from 'react'
import { withAuth } from '../HOC'
import OrderTableRow from '../Components/Layout/Page/Order/OrderTableRow'
import { useGetOrdersWithUserIdQuery } from '../apis/orderApi'
import { useSelector } from 'react-redux'
import { menuItemModel, orderModel } from '../Interfaces'
import { useNavigate } from 'react-router-dom'
import { SD_Roles } from '../Utilities/staticDetails'
import withAdmin from '../HOC/withAdmin'
import { useGetMenuItemsQuery } from '../apis/menuItemApi'
import { MenuItemTableRow } from '../Components/Layout/Page/MenuItems'

function MenuItemsList() {
    const {data, isLoading,isSuccess,isError,error} = useGetMenuItemsQuery(null);
    const nav = useNavigate();

  return (
    <div className='p-5'>
        <div className='row w-100'>
            <div className='d-flex justify-content-between'>
                <span className='h1 text-success'>Menu Items List</span>
                <button className='btn btn-success my-3' onClick={() => nav("upsert/")}>Add New</button>
            </div>
        </div>
        <div className='row w-100 border'>
            <div className='col-12 col-md-2 border py-2'>
                Image
            </div>
            <div className='col-12 col-md-2 border py-2'>
                ID
            </div>
            <div className='col-12 col-md-3 border py-2 d-flex justify-content-end'>
                Name
            </div>
            <div className='col-12 col-md-2 border py-2 d-flex justify-content-end'>
                Category
            </div>
            <div className='col-12 col-md-1 border py-2 d-flex justify-content-end'>
                Price
            </div>
            <div className='col-12 col-md-1 border py-2 d-flex justify-content-end'>
                Special Tag
            </div>
            <div className="col-12 col-md-1 py-2 d-flex justify-content-end border">Action</div>
        </div>
        {!isLoading && isSuccess ? 
            (data.result
                .map((menuItem : menuItemModel, i: number) => {
                return <MenuItemTableRow menuItem={menuItem} key={i}/>
            })):
            (<></>)}
    </div>
  )
}

export default withAdmin(MenuItemsList)