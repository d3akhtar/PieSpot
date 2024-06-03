import { SD_Status } from "../Utilities/staticDetails";
import orderDetailsCreateDtoModel from "./orderDetailsCreateDtoModel";

export default interface orderModel {
    orderHeaderID? : number
    pickupName: string;
    pickupPhoneNumber: string;
    pickupEmail: string;
    applicationUserId: string;
    orderTotal: number;
    orderDate?: string
    stripePaymentIntentId: string;
    status: SD_Status;
    totalItems: number;
    orderDetailsCreateDTOCollection: orderDetailsCreateDtoModel[];
  }