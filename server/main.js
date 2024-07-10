require('dotenv').config();

const PORT = process.env.PORT || 3000;
const express = require('express');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const conncetToMongoDB = require('./DB/connectMongoDB');

const { app, io, server} = require('./sockets/socket');

const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const chatRouter = require('./routers/chatRouter');

// configs/DB
conncetToMongoDB();

// middlewares
app.use(express.json({limit: '2mb'}));
app.use(cors());
app.use(cookieParser());

 
// routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/chat', chatRouter);

server.listen(PORT, () => {
    console.log(`Server is ok. http://localhost:${PORT}`);
})
