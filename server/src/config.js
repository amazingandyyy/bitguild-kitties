require('dotenv').config();

if(!process.env.web3HttpProvider){
  console.error(`You need to create a .env file with a web3HttpProvider enviroment variable in it !`)
}
export const web3HttpProvider = process.env.web3HttpProvider;
export const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/gifting-kitties-dapp-db-alpha'