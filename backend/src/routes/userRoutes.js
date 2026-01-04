const express = require('express');
const authMiddleware=require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/home',authMiddleware,(req,res)=>{
  return res.json({
    message:"welcome to home page",
    user:req.user.email
  });
});

module.exports = router;