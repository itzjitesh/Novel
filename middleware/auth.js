import config from "config";
import jwt from "jsonwebtoken";
// import User from "../models/user";


const middlewareAuth = async(req, res, next)=>{

    const requestedCookie = req.cookies.jwt;
    // if (!requestedCookie) return res.status(401).send("Access denied, No token provided");
    if (!requestedCookie) return res.status(401).render("fail");
    
    try{
        const decoded = jwt.verify(requestedCookie, config.get("jwtPrivateKey"));
        req.user = decoded;
        next();
    }
    catch(ex){
        res.status(400).send("Invalid token");
    }
}

export default middlewareAuth;