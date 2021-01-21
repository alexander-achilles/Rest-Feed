const jwt= require("jsonwebtoken");

require('dotenv').config();


module.exports= (req,res,next)=>{
    const authHeader= req.get("Authorization")
    if(!authHeader){
        const err= new Error("Not authorized");
        err.statusCode=401;
        throw err;
    }
    const token=authHeader.split(' ')[1];
    let decodedToken;
    try{
        decodedToken= jwt.verify(token, process.env.SECRET_KEY);
    }
    catch(err){
        err.statusCode= 500;
        throw err;
    }
    if(!decodedToken){
        const err= new Error("Not authenticated");
        err.statusCode=401;
        throw err;
    }
    req.userId= decodedToken.userId;
    next();
}