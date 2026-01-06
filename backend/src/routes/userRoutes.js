const express = require('express');
const authMiddleware=require('../middlewares/authMiddleware');
const {onboarding}=require('../contollers/userController')

const router = express.Router();

router.get('/home',authMiddleware,(req,res)=>{
  return res.json({
    message:"welcome to home page",
    user:req.user.email
  });
});

router.post('/onboarding',authMiddleware,onboarding)

module.exports = router;