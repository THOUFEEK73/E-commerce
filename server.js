import express from 'express';
import userRoute from './routes/userRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
const app =  express();




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));


// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/user',userRoute);
// app.get('/admin',adminRoute);



const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`server running on PORT => ${PORT}`);
})