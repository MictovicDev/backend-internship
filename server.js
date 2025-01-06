import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import coinRoutes from './routes/coinRoutes.js';


dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json()); // to parse json data to the request.body
app.use(express.urlencoded({extended:true})); //To parse form data in the req.body
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

//Routes
app.use("/api", coinRoutes)


app.listen(PORT, ()=>{
    console.log(`Server started on port http://localhost:${PORT}`)
});

