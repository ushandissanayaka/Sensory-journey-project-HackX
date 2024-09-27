const ResourcesModel = require('../models/ResourcesModel')
const ResourcesGuidesModel = require('../models/ResourcesGuidesModel')
const ResourcesProgressModel = require('../models/ResourcesProgressModel')
const articleController = async (req, res) => {
    try {
      
      const searchTerm=req.query.searchTerm || "";
      if(searchTerm===""){
        const articles=await ResourcesModel.find()
          res.status(200).json({
            success:true,
            message:'Articles Lists Fetched Successfully',
            data:articles,
          })

      }else{
        const articles=await ResourcesModel.find(
            {
                title:{$regex:searchTerm,$options:'i'}
            }
          )
          if(articles){
            res.status(200).json({
                success:true,
                message:'Articles Lists Fetched Successfully',
                data:articles,
              })
          }else{

            res.status(404).send({
                success:false,
                message:'Article not Found',
                
              })

          }
          
      }

      

    } catch (error) {
      console.log(error);
      
      res.status(500).send({ success: false, message: `Article Controller ${error.message}` });
    }
  };

  const guideController = async (req, res) => {
    try {
      
      const searchTerm=req.query.searchTerm || "";
      if(searchTerm===""){
        const articles=await ResourcesGuidesModel.find()
          res.status(200).json({
            success:true,
            message:'Guides Lists Fetched Successfully',
            data:articles,
          })

      }else{
        const articles=await ResourcesGuidesModel.find(
            {
                title:{$regex:searchTerm,$options:'i'}
            }
          )
          if(articles){
            res.status(200).json({
                success:true,
                message:'Guides Lists Fetched Successfully',
                data:articles,
              })
          }else{

            res.status(404).send({
                success:false,
                message:'Guides not Found',
                
              })

          }
          
      }

      

    } catch (error) {
      console.log(error);
      
      res.status(500).send({ success: false, message: `Guide Controller ${error.message}` });
    }
  };
const resourcesProgressDataInserter=async (req,res)=>{
  try {
  const userId=req.query.userId;
  const type=req.query.type;
  const title=req.query.title;
  console.log(type);
  console.log(title);
  const validTypes=['Articles','Guides','Videos','Webinars'];
  if(!validTypes.includes(type)){
    return res.status(400).send({ success: false, message: `Invalid type` });
  }
  let progress=await ResourcesProgressModel.findOne({userId});
  if(!progress){
    progress=new ResourcesProgressModel({userId:userId});

  }
  if (!progress[type]) {
    progress[type] = [];
  }

  // Push the new title into the array
  progress[type].push(title);
  await progress.save();
  return res.status(200).send({ success: true, message: `${title} inserted to ${type} successfully` });


}catch (error) {
  console.log(error);
  
  return res.status(500).send({ success: false, message: `Progress Inserter ${error.message}` });
}

};
const resourcesProgressDataGetter=async (req,res)=>{
  try {
  const userId=req.query.userId;
  
  const validTypes=['Articles','Guides','Videos','Webinars'];
  
  let progress=await ResourcesProgressModel.findOne({userId});
  if(!progress){
    progress=new ResourcesProgressModel({userId:userId});

  }
  

 
  return res.status(200).send({ success: true, message: `progress Get successful`,data:progress });


}catch (error) {
  console.log(error);
  
  return res.status(500).send({ success: false, message: `Progress Getter ${error.message}` });
}

};


  module.exports={articleController,guideController,resourcesProgressDataInserter,resourcesProgressDataGetter}