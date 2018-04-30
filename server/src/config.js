require('dotenv').config();

export const web3HttpProvider = process.env.web3HttpProvider;
export const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/bitguild-kitties-db-alpha'