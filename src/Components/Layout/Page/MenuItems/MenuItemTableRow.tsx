import React from 'react'
import { menuItemModel, orderModel } from '../../../../Interfaces'
import { useNavigate } from 'react-router-dom';
import { getStatusColor } from '../../../../Helper';
import { useDeleteMenuItemMutation } from '../../../../apis/menuItemApi';

interface MenuItemTableRowProps {
    menuItem: menuItemModel
}

function MenuItemTableRow(props: MenuItemTableRowProps) {
    const navigate = useNavigate();
    const [deleteMenuItem] = useDeleteMenuItemMutation();
  return (
    <div className='row w-100 border'>
        <div className='col-12 col-md-2 border py-2'>
            <img alt="no content" src={props.menuItem.image} style={{width: "100%", maxWidth: "120px", border:"1px solid black"}}></img>
        </div>
        <div className='col-12 col-md-2 border py-2'>
            {props.menuItem.id}
        </div>
        <div className='col-12 col-md-3 border py-2 d-flex justify-content-end'>
            {props.menuItem.name}
        </div>
        <div className='col-12 col-md-2 border py-2 d-flex justify-content-end'>
            {props.menuItem.category}
        </div>
        <div className='col-12 col-md-1 border py-2 d-flex justify-content-end'>
            ${props.menuItem.price}
        </div>
        <div className='col-12 col-md-1 border py-2 d-flex justify-content-end'>
            {props.menuItem.specialTag}
        </div>
        <div className="col-12 col-md-1 py-3 d-flex justify-content-end border d-flex justify-content-center align-items-center">
            <div className='w-50 d-flex justify-content-center align-items-center'>
                <button className='btn m-1 form-control btn-info' onClick={() => navigate(`upsert/${props.menuItem.id}`)}><i className="bi bi-pencil-square"></i></button>
                <button className='btn m-1 form-control btn-danger' onClick={() => deleteMenuItem(props.menuItem.id)}><i className="bi bi-trash"></i></button>
            </div>
        </div>
    </div>
  )
}

export default MenuItemTableRow