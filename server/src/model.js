import mongoose from 'mongoose';

// Define the model
const Schema = new mongoose.Schema({
    from: String,
    to: String,
    kittenId: Number,
    blockNumber: Number,
    image: String,
    status: String, //['Pending', 'Successful', 'Fail']
    txHash: String
},{
    timestamps: true
})

export default mongoose.model('Transactions', Schema);
