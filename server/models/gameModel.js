const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    gameId:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true,
        default:0
    },
    level:{
        type:Number,
        required:true,
        default:1
    }
},{timestamps:true})

const gameModel = mongoose.model('games', gameSchema);

module.exports = gameModel;