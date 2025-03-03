import {verify} from "jsonwebtoken";
import {HTTP_UNAUTORIZED} from "../constants/http.status";

export default (req:any, res:any, next:any) => {
    const token = req.headers.access_token as string;
    
    if(!token) res.status(HTTP_UNAUTORIZED).send();
    
    try{
        req.user = verify(token, process.env.JWT_SECRET!);
    }
    catch (error) {
        res.status(HTTP_UNAUTORIZED).send();
    }

    return next();
}