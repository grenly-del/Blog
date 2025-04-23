const { HTTP_STATUS_CODE } = require("../constant/httpCode");
const { appRes } = require("../utils/appRes");

function errorHandler(err, req, res, next) {
    console.error('ErrorHandler has caught an error: ', err);
  
    return appRes(
      res,
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      err.message ?? 'An unknown error occurred.'
    );
}

module.exports = errorHandler