const jwt=require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async(req,res,next)=>{
 try {

   const token = req.cookies.token;

  if(!token){
    return res.status(401).json({message:"authentication required"});
  }

  const decoded = jwt.verify(token,process.env.jwt_secret_key);
  //this decode is also known as payload which contains user_id and some other data

  const user = await User.findById(
    decoded.userId

  )

  if(!user){
    return res.status(401).json({message:"user not found"});
  }

  req.user = user;

  next();
  
 } catch (error) {

  console.log(error.message);
  return res.status(403).json({message:"session expired please login again"});
  
 }


}

module.exports = authMiddleware;