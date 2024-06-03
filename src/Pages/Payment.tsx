import React from 'react'
import { useState } from 'react' // used to get the state from the useNavigate() hook
import { useLocation } from 'react-router-dom'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { PaymentForm } from '../Components/Layout/Page/Payment';
import OrderSummary from '../Components/Layout/Page/Order/OrderSummary';

function Payment() {
    const {
        state: {apiResult,formData,orderSummary}
    } = useLocation();

    // Make sure to call `loadStripe` outside of a component’s render to avoid
    // recreating the `Stripe` object on every render.
    const stripePromise = loadStripe("pk_test_51PI0hDFkPJTzN4ZkRt1pFZGxwotbl7mItrUtMixYCbDl1KmpuxQ1K3FJtBlCfXun6gdSh1DaVMSVxlqxQlXCzHTx00J4Lf3Dyy");

    const options = {
        // passing the client secret obtained from the server
        clientSecret: apiResult.clientSecret,
        layout: 'accordion'
    };
    
    return (
        <Elements stripe={stripePromise} options={options}>
            <div className='row m-5 p-5'>
                <div className='row w-100'>
                    <div className='offset-md-2 col-md-4 border'>
                        <div className='row mt-1 '><span className='text-success h2'>Order Summary</span></div>
                        <OrderSummary apiResult={apiResult} formData={formData} orderSummary={orderSummary}/>
                    </div>
                    <div className='col-md-4 border'>
                        <PaymentForm apiResult={apiResult} formData={formData} orderSummary={orderSummary}/>
                    </div>
                </div>
            </div>
        </Elements>
      );
}

export default Payment