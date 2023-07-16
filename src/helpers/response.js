const resSend = (statusCode, message, data, res) => {
  res.json(statusCode, {
    status: statusCode,
    message,
    data: data,
  });
};

const resError = (statusCode, message, res) => {
  res.json(statusCode, {
    status: statusCode,
    error: message,
  });
};

module.exports = { resSend, resError };
