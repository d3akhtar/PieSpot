import React from 'react'
import { cartItemModel, menuItemModel } from '../../../../Interfaces'

interface orderSummaryMenuItemProps {
    cartItem: cartItemModel,
}

function OrderSummaryMenuItem(props : orderSummaryMenuItemProps) {
    var price;
    if (props.cartItem.menuItem != undefined && props.cartItem.quantity != undefined){
        price = props.cartItem.menuItem.price * props.cartItem.quantity;
    }
  return (
    <div className='row ms-2 mt-2'>
        <div className='col-md-4'>
            {props.cartItem.menuItem?.name}
        </div>
        <div className='col-md-8'>
            ${props.cartItem.menuItem?.price} x {props.cartItem.quantity} = ${price}
        </div>
    </div>
  )
}

export default OrderSummaryMenuItem