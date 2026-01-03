const express = require('express');

const app =express();
require('./src/config/db');
const PORT = 5000;


app.get('/',(req,res)=>{
    res.status(200).send('Hello World!');
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})