import { SD_Status } from "../Utilities/staticDetails";

export default interface orderUpdateModel {
    orderHeaderID: number,
    pickupName: string,
    pickupEmail: string,
    pickupPhoneNumber: string
    stripePaymentIntentId: string,
    status: SD_Status
}