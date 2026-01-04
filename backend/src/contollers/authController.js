const bcryptjs = require('bcryptjs');
const User = require('../models/User')
const jwt = require('jsonwebtoken');

exports.signUp = async(req,res)=>{

  try {
    const email=req.body.email;
    const password=req.body.password;

    if(!email || !password){
      return res.status(400).json({message:"both email  and password required"});
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
      return res.status(400).json({message:"this email already exists!!!"})
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword= await bcryptjs.hash(password,salt);

    const user =await User.create({
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

exports.login = async(req,res)=>{
  try {

    const {email,password} = req.body;

    if(!email || !password){
      return res.status(400).json({message:"enter email and password"});
    }

    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({message:"the user does'nt exist please signup first"});
    }

    
    const isMatch =await bcryptjs.compare(password,user.password);

    if(!isMatch){
      return res.status(400).json({message:"email or password is incorrect"});
    }

    const token = jwt.sign(
      {userId:user._id},
      process.env.jwt_secret_key,
      {expiresIn:'7d'}
    );

    res.cookie('token',token,{
      httpOnly:true,
      sameSite:'lax',
      secure:false
    })

    return res.status(200).json({
      message:"user successfully logged In",
      user:{
        userId:user._id,
        email:user.email,
        onboardingCompleted:user.onboardingCompleted
      }
    })
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message:"server error"
    });
    
  }
}

exports.logout=async(req,res)=>{
  try {

    res.cookie('token','',{
      httpOnly:true,
      expires: new Date(0),
      sameSite:'lax',
      secure:false


    });

    res.status(200).json({message:"user successfully logged out"});
    
  } catch (error) {

    console.log(error.message);
    return res.status(500).json({message:"server error"});
    
  }
}

