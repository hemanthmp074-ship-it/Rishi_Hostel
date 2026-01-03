const bcryptjs = require('bcryptjs');
const User = require('../models/User')

exports.signUp = async(req,res)=>{

  try {
    const email=req.body.email;
    const password=req.body.password;

    if(!email || !password){
      return res.status(400).json({message:"both username and password required"});
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
      return res.status(400).json({message:"this email already exists!!!"})
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword= await bcryptjs.hash(password,salt);

    const user =User.create({
      email:email,
      password:hashedPassword
    });

    return res.status(200).json({
      message:"signup successful",
      userId:user._id
      
    })



    
  } catch ( error ) {
    console.log(error.message);
    return res.status(500).json({message:"server error"});
    
  }

}