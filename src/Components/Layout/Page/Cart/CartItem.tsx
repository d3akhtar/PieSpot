import React, { useState } from 'react'
import { cartItemModel, userModel } from '../../../../Interfaces'
import { useUpdateShoppingCartMutation } from '../../../../apis/shoppingCartApi';
import { useDispatch, useSelector } from 'react-redux';
import { MiniLoader } from '../CommonComponents';

interface cartItemProps{
    cartItem: cartItemModel
}

// https://via.placeholder.com/150 is the placeholder

function CartItem(props: cartItemProps) {
    var price:number;
    var menuItemId:number;
    if (props.cartItem.menuItem !== undefined && props.cartItem.quantity !== undefined){
        price = props.cartItem.menuItem?.price * props.cartItem.quantity;
    }
    else{
        price = -1;
    }
    if (props.cartItem.menuItemId != undefined){
        menuItemId = props.cartItem.menuItemId;
    }

    const loggedInUser : userModel = useSelector((state : any) => state.userAuthStore);

    const [shoppingCartUpdating,setShoppingCartUpdating] = useState<boolean>(false);

    const [updateShoppingCart] = useUpdateShoppingCartMutation();
    const handleIncrement = async (menuItemId:number) => {
        setShoppingCartUpdating(true);
        await updateShoppingCart({
            userId: loggedInUser.id, 
            menuItemId: menuItemId, 
            updateQuantityBy: 1
        });
        setShoppingCartUpdating(false);
    }
    const handleDecrement = async (menuItemId:number) => {
        setShoppingCartUpdating(true);
        await updateShoppingCart({
            userId: loggedInUser.id, 
            menuItemId: menuItemId, 
            updateQuantityBy: -1
        });
        setShoppingCartUpdating(false);
    }
    const handleRemoveCartItem = async (menuItemId:number) => {
        setShoppingCartUpdating(true);
        await updateShoppingCart({
            userId: loggedInUser.id, 
            menuItemId: menuItemId, 
            updateQuantityBy: 0
        });
        setShoppingCartUpdating(false);
    }

  return (
    <div className='row p-3 m-2 bg-light'>
        <div className='col-12 col-md-2 d-flex align-items-center'>
            <img className='w-100 image-box' src={props.cartItem.menuItem?.image} style={{borderRadius: "50%"}}></img>
        </div>
        <div className='col-12 col-md-3'>
            <div className='row ms-1'>
                <p className='h5'>{props.cartItem.menuItem?.name}</p>
            </div>
            <div className='row ms-1'>
                <p className='h5 mt-2 text-danger'>{props.cartItem.menuItem?.price}</p>
            </div>
            <div className='row mt-4 ms-1'>
                <div onClick={() => handleIncrement(menuItemId)} className='col-9 col-md-2 d-flex justify-content-center' style={{cursor:"pointer"}}>
                    <i className="bi bi-plus-circle-fill"></i>
                </div>
                {shoppingCartUpdating ? 
                (
                <div className='col-9 col-md-2 d-flex justify-content-center text-center'>
                <MiniLoader size={75}/>
                </div>
                ):
                (
                <div className='col-9 col-md-2 d-flex justify-content-center text-center'>
                {props.cartItem.quantity}
                </div>
                ) 
                }
                <div onClick={() => handleDecrement(menuItemId)} className='col-9 col-md-2 d-flex justify-content-center' style={{cursor:"pointer"}}>
                    <i className="bi bi-dash-circle-fill"></i>
                </div>
            </div>
        </div>
        <div className='col-12 col-md-7'>
            <div className='row me-1'>
                <p className='h3 text-end'>${price}</p>
            </div>
            <div className='row' style={{height:"5%"}}></div>
            <div className='row me-1 mt-5 d-flex justify-content-end'>
                <button onClick={() => handleRemoveCartItem(menuItemId)}  className='btn btn-danger w-25 p-2'>Remove</button>
            </div>
        </div>
    </div>
  )
}

export default CartItem