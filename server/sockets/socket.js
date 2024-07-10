const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    //console.log(`user connected`, socket.id);

    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
        
    });

    socket.on('create-chat', (room) => {
        console.log('chat created');
        io.emit('chat-created', room);
    });
    
    socket.on('delete-chat', (room, deleteFor) => {
        console.log(deleteFor);
        console.log('chat deleted', room, deleteFor);
        
        io.emit('chat-deleted', room, deleteFor);
    });

    socket.on('send_message', (room, message) => {
        // console.log(message);
        // console.log(room); 
        io.to(room).emit('receive_message', message);
    });

    socket.on('update-message', (room) => {
        io.to(room).emit('message-updated', room);
    });

    socket.on('delete-message', (room) => {
        io.to(room).emit('message-deleted', room);
    });

    socket.on('leave_room', (room) => { 
        
        console.log(`leaved room ${room}`);
    });
    
    socket.on('disconnect', () => {
        console.log(`user disconnected ${socket.id}`);
    });
})

 
module.exports = { app, io, server } 