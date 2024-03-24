const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

//Route file
const hotels = require('./routes/hotels');
const auth = require('./routes/auth');
const bookings = require('./routes/bookings');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

const app=express();

app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Body parser
app.use('/api/v1/hotels', hotels);
app.use('/api/v1/auth', auth);
app.use('/api/v1/bookings',bookings);

const PORT=process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log('Server running in',
    process.env.NODE_ENV,
    "on " + process.env.HOST + ":" + PORT));

    const swaggerOptions={
        swaggerDefinition:{ 
            openapi: '3.0.0', 
            info: { 
                title: 'Library API', 
                version: '1.0.0', 
                description: 'Hotel Booking API' 
            }, 
            servers: [ { 
                url: process.env.HOST+ ":" + PORT + "/api/v1" } ], 
        }, apis:['./routes/*.js'], };    

//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=> process.exit(1));
});