import express from 'express';
import http, {createServer} from 'http';
import bodyParser from 'body-parser';
import socket from 'socket.io';
import api from './api';
const app = express();
const server = http.Server(app);
export const io = socket(server);

// App Setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res)=>res.send('works'));
app.use('/api', api);

app.use((err, req, res, next) => {
    console.log('errrrr', err)
    res.status(500).send(err);
})

io.on('connection', function (socket) {
    console.log(socket);
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

// Server Setup
const port = process.env.PORT || 8000;
server.listen(port, ()=>{
    console.log(`> Server listening on ${port}`)
});
