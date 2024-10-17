import {verify} from 'jsonwebtoken';

export const authMiddleware = (req,res,next) =>{

    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

    if(!token){
       return res.status(401).json({message:"No Token Provided"});
    }

     verify(token,process.env.JWT_SECRET,(err,decoded) =>{

        if(err){
            return res.status(403).json({ message : 'Invalid Token'});
        }
        req.user = decoded; // Attach user info to request
        next(); // Proceed to next middleware or route handler

    })
}