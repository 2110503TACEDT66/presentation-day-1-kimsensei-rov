const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
//Route file
/*const hospitals = require('./routes/hospitals');
const auth = require('./routes/auth');
const appointments = require('./routes/appointments');*/
//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

const app=express();
/*
const swaggerOptions={
    swaggerDefinition:{
        openapi: '3.0.0',
        info:{
            title: 'Library API',
            version: '1.0.0',
            description: 'A simple Express VacQ API'
        },
        servers: [
            {
                url: 'http://localhost:5000/api/v1'
            }
        ],
    },
    apis:['./routes/*.js'],
};

const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocs));
*/
app.use(express.json());

//Cookie parser
app.use(cookieParser());
//Sanitize data
//app.use(mongoSanitize());
//Set security headers
//app.use(helmet());
//xss
//app.use(xss());
//Rate Limiting
/*const limiter = rateLimit({
    windowsMs : 10*60*1000,//10 mins
    max: 500
});
app.use(limiter);*/
//prevent http params polutions
//app.use(hpp());
//Enable cors
//app.use(cors());
//Body parser
//app.use('/api/v1/hospitals', hospitals);
//app.use('/api/v1/auth', auth);
//app.use('/api/v1/appointments',appointments);

const PORT=process.env.PORT || 5000;

const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=> process.exit(1));
});