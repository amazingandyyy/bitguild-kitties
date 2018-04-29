import express from 'express';
import http, {createServer} from 'http';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';

import api from './api';
import socket from './socket';
import ETHlistener from './listener';
import controller from './controllor';

const app = express();
const server = http.Server(app);

const io = socketio(server);

// DB Setup
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bitguild-kitties-db-alpha')
.catch(err=>console.error(err));

mongoose.Promise = global.Promise;

// App Setup
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res)=>res.send('works'));

app.use((err, req, res, next) => {
    console.log('errrrr', err)
    res.status(500).send(err);
})

// Server Setup
const port = process.env.PORT || 8000;
server.listen(port, ()=>{
    console.log(`>>> Server listening on ${port}`)
});

// Socket Register
io.on('connection', function (sk) {
    sk.on('LISTEN_TO_UPDATE_TRANSACTION', (addr) => {
        console.log('>>> Socket connected', addr);
        controller.giftingSocket(sk, addr)
    })
});


// Expose API Route
app.use('/api', api);