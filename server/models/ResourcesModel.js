const mongoose = require('mongoose')

const resourcesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true]
    },
    description:{
        type:String,
        required:[true]
    },
    link:{
        type:String,
        required:[true]
    }
    


})

const ResourcesModel = mongoose.model('resources', resourcesSchema )

module.exports = ResourcesModel