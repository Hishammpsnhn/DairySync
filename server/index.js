import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cors from 'cors';

import userRoutes from './Routes/userRoutes.js'

dotenv.config();

const app = express();
app.use(express.json()); 

app.use(cors())

connectDB();

app.use('/api/users', userRoutes)

const port = process.env.PORT

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})