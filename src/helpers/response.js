const resSend = (statusCode, message, data, res) => {
  res.status(statusCode).json({
    status: statusCode,
    message,
    data: data,
  });
};

const resError = (statusCode, message, res) => {
  res.status(statusCode).json({
    status: statusCode,
    error: message,
  });
};

module.exports = { resSend, resError };
