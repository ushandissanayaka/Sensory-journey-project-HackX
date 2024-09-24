const ResourcesModel = require('../models/ResourcesModel')

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


  module.exports={articleController}