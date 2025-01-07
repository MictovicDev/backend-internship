import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import coinRoutes from './routes/coinRoutes.js';
import settings from './settings.js';
import cors from 'cors';

const app = express();

const PORT = settings.app['port']


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//cors
app.use(cors(settings.cors));

//Routes
app.use("/api", coinRoutes)

//Used to run our servers
app.listen(PORT, ()=>{
    console.log(`Server started on port http://localhost:${PORT}`)
});

