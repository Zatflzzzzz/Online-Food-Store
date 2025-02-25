import { verify } from "jsonwebtoken";
import { HTTP_UNAUTORIZED } from "../constants/http.status";

export default (req:any, res:any, next:any) => {
    const token = req.headers.access_token as string;
    
    if(!token) res.status(HTTP_UNAUTORIZED).send();
    
    try{
        const decodedUser = verify(token, process.env.JWT_SECRET!)
        req.user = decodedUser;
    }
    catch (error) {
        res.status(HTTP_UNAUTORIZED).send();
    }

    return next();
}