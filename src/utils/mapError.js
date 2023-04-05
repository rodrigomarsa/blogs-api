const errorMap = {
  INVALID_VALUE: 400,
  USER_EXISTS: 409,
  USER_NOT_EXIST: 404,
  POST_NOT_EXIST: 404,
  CATEGORY_EXISTS: 409,
  CATEGORY_NOT_FOUND: 400,
  UNAUTHORIZED_USER: 401,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};