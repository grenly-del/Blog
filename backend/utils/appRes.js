const appRes = (
    res,
    code,
    message,
    payload
  ) => {
    const transformedPayload = {
      code,
      message,
      payload
    };
  
    return res.status(code).json({ payload: transformedPayload });
  }
  
module.exports = {appRes}