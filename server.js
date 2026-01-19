import express from 'express'
import dotenv from 'dotenv'
import connection  from './connection.js'
import Router from './router.js'
import cors from 'cors'


dotenv.config()

const app=express()
app.use(express.json({limit:"50mb"})) //conver to json data
app.use(cors()) //connect the front end domine  and back end to 
app.use('/api',Router)      //to know it as api

connection().then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log(`server created at http://localhost:${process.env.PORT}`);
    
})
}).catch((error)=>{
    console.log(error);
    
})