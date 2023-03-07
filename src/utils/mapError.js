const errorMap = {
  INVALID_VALUE: 400,
  USER_EXISTS: 409,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};