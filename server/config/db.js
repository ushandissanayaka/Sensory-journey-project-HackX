const mongoose = require("mongoose")
const colors = require('colors')

async function connectDB () {
try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log( `Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
    
} catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
    
}
}

module.exports = connectDB 