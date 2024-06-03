import { useSelector } from "react-redux";
import { userModel } from "../Interfaces";
import { AccessDenied } from "../Pages";
import { getJwtToken, toastNotify } from "../Helper";
import { SD_Roles } from "../Utilities/staticDetails";

const withAdmin = (WrappedComponent : any) => {
    return(props: any) => {
        const token = localStorage.getItem("token");
        if (!token){
            window.location.replace("/login")
            return null; 
        }
        else{
            const decodedToken = getJwtToken(token);
            if (decodedToken.role == SD_Roles.ADMIN){
                return <WrappedComponent {...props}/>
            }
            else{
                window.location.replace("/accessDenied")
                return null; 
            }
        }
    }
}

export default withAdmin;