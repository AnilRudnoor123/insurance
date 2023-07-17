
const _config=require('../utils/config')

exports.serverResponseCodes = {
    "Error": 500,
    "Invalid_Parameters": 400,
    "Unauthorized": 401,
    "Permissions_Denied": 403,
    "NoData": 404,
    "AlreadyExist": 202,
    "Success": 200,
    "AcessToken": 440
}


if(_config.ENV=='Dev'){
    var CustomerID='INSU'
}
exports.CustomerID=CustomerID