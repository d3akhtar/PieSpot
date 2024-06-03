import React from 'react'
import { CartSummary } from '../Components/Layout/Page/Cart'
import CartPickupDetails from '../Components/Layout/Page/Cart/CartPickupDetails'
import withAuth from '../HOC/withAuth'

function ShoppingCart() {
  return (
    <div className='row w-100' style={{marginTop: "10px"}}>
        <div className='col-lg-6 col-12 p-5' style={{fontWeight: 300}}>
          <div className='w-100 text-success h3 text-center'>Cart Summary</div> 
            <CartSummary/>
        </div>
        <div className='col-lg-6 col-12' style={{fontWeight: 300}}>
            <div className='row' style={{height:"7%"}}></div>
            <div className='row border w-100 text-center'>
              <div className='col-12 p-4 col-md-12'>
                <span className='text-success h1' style={{fontWeight:"100"}}>User Details</span>
              </div>
            </div>
            <CartPickupDetails/>
        </div>
    </div>
  )
}

export default withAuth(ShoppingCart)