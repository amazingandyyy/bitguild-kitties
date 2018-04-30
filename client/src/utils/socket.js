import io from 'socket.io-client';
import { serverURI } from '../config';

export default () => io.connect(serverURI);
