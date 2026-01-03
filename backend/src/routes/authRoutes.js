const express = require('express');
const {signUp} = require('../contollers/authController');

const router=express.Router();


router.post('/signup',signUp);

module.exports=router;