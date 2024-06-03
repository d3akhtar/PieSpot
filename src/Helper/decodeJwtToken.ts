import jwt_decode from 'jwt-decode';
import { userModel } from '../Interfaces';
const getJwtToken = (token: string): userModel => {
    return jwt_decode(token);
}

export default getJwtToken;