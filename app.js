
require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose');
const customerRoutes=require('./routes/customerRoutes')



const app = express()
app.use(express.json());

async function connectdb(){
    try {
     const connect=await mongoose.connect(process.env.mongoDb, {
         ssl: true,
       })
       console.log('mongoDB connected');
       
    } catch (error) {
     console.log(error);
     
    }
 }
   connectdb();

  
app.use("/", customerRoutes);


app.listen(3000,(req,res)=>{
    console.log('connected');
    
})