import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cors from 'cors';

import userRoutes from './Routes/userRoutes.js'
import animalRoutes from './Routes/animalRoutes.js'
import productRoutes from './Routes/productRoutes.js'
import dashboardRoutes from './Routes/dashboardRoute.js'

dotenv.config();

const app = express();
app.use(express.json()); 

app.use(cors())

connectDB();

app.use('/api/users', userRoutes)
app.use('/api/animal',animalRoutes)
app.use('/api/product',productRoutes)
app.use('/api/dashboard',dashboardRoutes)

const port = process.env.PORT

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})