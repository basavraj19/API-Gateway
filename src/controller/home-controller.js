const { StatusCodes } =require('http-status-codes');

const response =(req,res)=>{
    return res.status(StatusCodes.OK).json({
        message : "Ok",
        status : "true",
        data : "Bhuvan Pawar"
    });
};

const response1 =(req,res)=>{
    return res.status(StatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE).json({
         message :"Basavraj Birajdar"
     })
    };

module.exports ={
    response,
    response1
}