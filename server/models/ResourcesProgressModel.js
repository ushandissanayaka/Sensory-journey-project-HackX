const mongoose = require('mongoose')

const resourcesProgressSchema = new mongoose.Schema({
    Articles:{
        type:[String]
    },
    Guides:{
        type:[String]
    },
    Videos:{
        type:[String]
    },
    Webinars:{
        type:[String]
        
    }
    


})

const ResourcesProgressModel = mongoose.model('resourcesProgress', resourcesProgressSchema )

module.exports = ResourcesProgressModel