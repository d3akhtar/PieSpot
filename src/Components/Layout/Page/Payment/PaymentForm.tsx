import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { toastNotify } from '../../../../Helper';
import { apiResponseModel, cartItemModel, orderDetailsCreateDtoModel, orderModel } from '../../../../Interfaces';
import { orderSummaryProps } from '../Order/OrderSummary';
import { SD_Status } from '../../../../Utilities/staticDetails';
import { useAddOrderMutation } from '../../../../apis/orderApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const PaymentForm = ({apiResult, formData, orderSummary}: orderSummaryProps) => {

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [isProcessing,setIsProcessing] = useState<boolean>(false);

    const [createOrder] = useAddOrderMutation(); 

    const handleSubmit = async (event : any) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
        }

        setIsProcessing(true);

        const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
            return_url: "https://example.com/order/123/complete",
            },
            redirect: "if_required"
        });

        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            if (result.error.message != undefined){
                toastNotify(result.error.message, "error");
            }
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.

            // {
            //     "pickupName": "string",
            //     "pickupPhoneNumber": "string",
            //     "pickupEmail": "string",
            //     "applicationUserId": "string",
            //     "orderTotal": 0,
            //     "stripePaymentIntentId": "string",
            //     "status": "string",
            //     "totalItems": 0,
            //     "orderDetailsCreateDTOCollection": [
            //       {
            //         "menuItemId": 0,
            //         "quantity": 0,
            //         "itemName": "string",
            //         "price": 0
            //       }
            //     ]
            //   }

            let totalItems : number = 0;
            const orderDetailsCreateDTOs: orderDetailsCreateDtoModel[] = [];
            apiResult.cartItems.forEach((cartItem: cartItemModel) => {
                if (cartItem.menuItem != undefined && cartItem.quantity != undefined){
                    const orderDetailsCreateDTO : orderDetailsCreateDtoModel = {
                        menuItemId: cartItem.menuItem?.id,
                        quantity: cartItem.quantity,
                        itemName: cartItem.menuItem?.name,
                        price: cartItem.menuItem.price * cartItem.quantity
                    }
                    orderDetailsCreateDTOs.push(orderDetailsCreateDTO);
                    totalItems += cartItem.quantity;
                }
            })

            const order : orderModel = {
                pickupName: formData.name,
                pickupEmail: formData.email,
                pickupPhoneNumber: formData.phoneNumber,
                applicationUserId: apiResult.userId,
                orderTotal: apiResult.cartTotal,
                stripePaymentIntentId: apiResult.stripePaymentIntentId,
                status: result.paymentIntent.status == "succeeded" ? SD_Status.CONFIRMED:SD_Status.PENDING, 
                totalItems: totalItems,
                orderDetailsCreateDTOCollection: orderDetailsCreateDTOs
            }
            const response : apiResponseModel = await createOrder(order);

            if (response){
                if (response.data?.result.status == SD_Status.CONFIRMED){
                    navigate(`/order/orderConfirmed/${response.data?.result.orderHeaderID}`);
                }
                else{
                    navigate("/failed");
                }
            }
        }

        setIsProcessing(false);
    };
  
  return (
    <form onSubmit={handleSubmit} className='pt-3'>
        <PaymentElement />
        <button className='w-100 btn-success btn mt-3' disabled={!stripe || isProcessing}>{isProcessing ? "Processing...":"Submit"}</button>
    </form>
  );
};

export default PaymentForm;