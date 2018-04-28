import express from 'express';
import http, {createServer} from 'http';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import cors from 'cors';

import api from './api';
import socket from './socket';

const app = express();
const server = http.Server(app);
export const io = socketio(server);

// App Setup
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res)=>res.send('works'));

app.use((err, req, res, next) => {
    console.log('errrrr', err)
    res.status(500).send(err);
})

io.on('connection', function (sk) {
    console.log('socket connectted!');
    socket.register(sk);
});

app.use('/api', api);
// Server Setup
const port = process.env.PORT || 8000;
server.listen(port, ()=>{
    console.log(`> Server listening on ${port}`)
});
