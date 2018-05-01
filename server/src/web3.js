import Web3 from 'web3';
import { web3HttpProvider } from './config';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(web3HttpProvider)
  web3 = new Web3(provider);
}

export default web3;