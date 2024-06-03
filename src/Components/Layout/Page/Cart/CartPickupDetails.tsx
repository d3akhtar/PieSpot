import React, { useState } from 'react'
import { apiResponseModel, cartItemModel, userModel } from '../../../../Interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '@reduxjs/toolkit/query'
import { inputHelper } from '../../../../Helper';
import { MiniLoader } from '../CommonComponents';
import { useSendPaymentMutation } from '../../../../apis/paymentApi';
import { useNavigate } from 'react-router-dom';

function CartPickupDetails() {
    const cartItems: cartItemModel[] = useSelector((state:any) => state.shoppingCartStore.cartItems);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const loggedInUser : userModel = useSelector((state : any) => state.userAuthStore)

    const [sendPayment] = useSendPaymentMutation();

    const navigate = useNavigate();

    const initialUserData = {
        name: loggedInUser.fullName,
        email: loggedInUser.email,
        phoneNumber: ""
    }

    const [formData,setFormData] = useState(initialUserData);

    var totalPrice = 0;
    cartItems.forEach((cartItem: cartItemModel) => {
        var price:number;
        if (cartItem.menuItem !== undefined && cartItem.quantity !== undefined){
            price = cartItem.menuItem?.price * cartItem.quantity;
        }
        else{
            price = 0;
        }
        totalPrice += price;
    })

    const handleUserInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const tempData = inputHelper(e, formData);
        setFormData(tempData);
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const result : apiResponseModel = await sendPayment(loggedInUser.id);
        if (result.data?.isSuccess){
            const totalItems = cartItems.length;
            const orderSummary = {totalPrice,totalItems};
            console.log(result.data.result);
            console.log(loggedInUser);
            navigate("/payment", {
                state: {apiResult: result.data.result, formData, orderSummary}
            })
        }
        else{
        }
        setIsLoading(false);
    }

  return (
    <div className='row border w-100 p-5'>
        <form onSubmit={handleSubmit}>
            <label htmlFor='name' style={{marginLeft:"-6px"}}>Pickup name</label>
            <input onChange={handleUserInput} id='name' name='name' className='form-control' placeholder='name...' value={formData.name}></input>
            <label className='mt-3' htmlFor='name' style={{marginLeft:"-6px"}}>Pickup email</label>
            <input onChange={handleUserInput} id='email' name='email' className='form-control' placeholder='email...' value={formData.email}></input>
            <label className='mt-3' htmlFor='name' style={{marginLeft:"-6px"}}>Pickup phone number</label>
            <input type="number" onChange={handleUserInput} id='phone' name='phoneNumber' className='form-control' placeholder='phone number...' value={formData.phoneNumber}></input>
            <div className='mt-3 py-3 border bg-light' style={{borderRadius:"5px"}}>
                <span className='h4 ms-3'>Grand Total: ${totalPrice}</span><br></br>
                <span className='h4 ms-3'>No. Of Items: {cartItems.length}</span>
            </div>
            {isLoading ? 
            (<button disabled className='btn btn-success form-control p-3 mt-4'><span className='h3'><MiniLoader/></span></button>):
            (<button className='btn btn-success w-100 p-2 mt-4'><span className='h3 p-2'>Looks Good? Place Order!</span></button>)
            }
        </form>
    </div>
  )
}

export default CartPickupDetails