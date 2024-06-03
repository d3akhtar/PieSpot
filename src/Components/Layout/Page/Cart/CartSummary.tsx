import React from 'react'
import { store } from '../../../../storage'
import { useSelector } from 'react-redux'
import { cartItemModel } from '../../../../Interfaces';
import CartItem from './CartItem';

function CartSummary() {
    const cartItems = useSelector((state:any) => state.shoppingCartStore.cartItems);

  return (
    <div>
        {
            cartItems.map((cartItem: cartItemModel, i: number) => {
                return <CartItem cartItem={cartItem} key={i}/>
            })
        }    
    </div>
  )
}

export default CartSummary