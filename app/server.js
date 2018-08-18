'use strict'

const logger = require('./logger');
let port = require('./config').port;
let app = require('./app');
let socketio = require('socket.io');

let io = socketio(app);

io.on('connection', (socket) => {
    logger.info('New user connected on chat');

    socket.on('createMessage', (createdMessage) => {
        logger.info('Created Message',createdMessage);

        io.emit('newMessage', createdMessage);
    });

    socket.on('disconnect', () => {
        logger.info('socket disconnected');
    })
})

app.listen(port, (error) => {
    if(error){
        return logger.error('Error while starting...', error);
    }
    logger.info(`Started server on port ${port}`);
});