require('dotenv').config();

const express = require('express');
const app =express();
const cookieParser = require('cookie-parser');

require('./src/config/db');

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',require('./src/routes/authRoutes'));
app.use('/api/user',require('./src/routes/userRoutes'))


const PORT = process.env.PORT || 5000;


app.get('/',(req,res)=>{
    res.status(200).send('Hello World!');
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})