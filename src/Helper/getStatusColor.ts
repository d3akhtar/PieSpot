import { SD_Status } from "../Utilities/staticDetails";

const getStatusColor  = (status : SD_Status): string => {
    switch(status){
        case SD_Status.CONFIRMED : return "primary";
        case SD_Status.CANCELLED : return "danger";
        case SD_Status.PENDING : return "secondary";
        case SD_Status.COMPLETED : return "success";
        case SD_Status.BEING_COOKED : return "info";
        case SD_Status.READY_FOR_PICKUP : return "warning";
    }
}

export default getStatusColor ;