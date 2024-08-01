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
    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
        io.to(room).emit('user-joined', room);
        
    });

    socket.on('create-chat', (room) => {
        io.emit('chat-created', room);
    }); 
     
    socket.on('delete-chat', (room, deleteFor) => {
        console.log(deleteFor);
        console.log('chat deleted', room, deleteFor);
        
        io.emit('chat-deleted', room, deleteFor);
    });

    socket.on('restore-chat', () => {
        io.emit('chat-restored');
    })

    socket.on('restore-chat-request', (toUserId, fromUsername, deletedChatId) => {
        console.log(deletedChatId);
        io.emit(`send-restore-request-${toUserId}`, fromUsername, deletedChatId);
    })

    socket.on('send_message', (room, message) => { 
        io.to(room).emit('receive_message', message);
        io.emit('last-message', room, message); 
    });

    socket.on('update-message', (room) => {
        io.to(room).emit('message-updated', room);
    });

    socket.on('delete-message', (room) => {
        io.to(room).emit('message-deleted', room);
    });

    socket.on('leave_room', (room) => { 
        io.to(room).emit('room_leaved', room);
        console.log(`leaved room ${room}`);
    });
     
    socket.on('disconnect', () => {
        console.log(`user disconnected ${socket.id}`);
    });
})

 
module.exports = { app, io, server }  