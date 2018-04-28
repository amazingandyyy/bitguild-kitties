import web3 from './web3';
import abi from './kittycore-abi';
const contractAddress = '0x06012c8cf97bead5deae237070f9587f8e7a266d';

// const instance = new web3.eth.Contract(
//   abi,
//   contractAddress
// )

let contract = web3.eth.contract(abi);
let instance = contract.at(contractAddress);

export default instance;