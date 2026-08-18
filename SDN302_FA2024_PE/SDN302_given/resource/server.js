require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// Import router
const employeeRoute = require('./routes/employeeRoute');

const app = express();

//Middleware
app.use(express.json());

//Connnect MongoDB
connectDB();

app.get('/', async(req, res)=>{
    try {
        res.send({message: 'Welcome to Practical Exam!'});
    } catch (error) {
        res.send({error: error.message});
    }
});

// API routes
app.use('/employee',employeeRoute)

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));