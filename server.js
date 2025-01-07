import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import coinRoutes from './routes/coinRoutes.js';


dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


//Routes
app.use("/api", coinRoutes)

//Used to run our servers
app.listen(PORT, ()=>{
    console.log(`Server started on port http://localhost:${PORT}`)
});

