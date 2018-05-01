import Web3 from 'web3';
import { web3HttpProvider } from './config';

let web3;

const provider = new Web3.providers.HttpProvider(web3HttpProvider)
web3 = new Web3(provider);

export default web3;