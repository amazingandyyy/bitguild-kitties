import express from 'express';
import {createServer} from 'http';
import bodyParser from 'body-parser';
import api from './api';
const app = express();

// App Setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res)=>res.send('works'));
app.use('/api', api);
app.use((err, req, res, next) => {
    console.log('errrrr', err)
    res.status(500).send(err);
})

// Server Setup
const port = process.env.PORT || 8000;
createServer(app).listen(port, ()=>{
    console.log(`> Server listening on ${port}`)
});
