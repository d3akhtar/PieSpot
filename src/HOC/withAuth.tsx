import { useSelector } from "react-redux";
import { userModel } from "../Interfaces";
import { AccessDenied } from "../Pages";
import { toastNotify } from "../Helper";

const withAuth = (WrappedComponent : any) => {
    return(props: any) => {
        if (!localStorage.getItem("token")){
            window.location.replace("/login")
            return null; 
        }
        return <WrappedComponent {...props}/>
    }
}

export default withAuth;