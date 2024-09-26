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

const ResourcesGuidesModel = mongoose.model('resourcesGuides', resourcesSchema )

module.exports = ResourcesGuidesModel