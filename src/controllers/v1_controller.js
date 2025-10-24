const statusCodes = require('http-status-codes');

const info = (req,res)=>{
    return res
    .status(statusCodes.ok)
    .json({
        "success":"true",
        "message":"it's working",
        "error":{},
        "data":{}
    });
}

module.exports={
    info
}

