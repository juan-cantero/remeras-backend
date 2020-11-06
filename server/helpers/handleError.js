// /**
//  *
//  * @param {Error} err
//  * @param {Function} next
//  */
const passErrorToHandler = (err, next) => {
  if (!err.statusCode) err.statusCode = 500;

  next(err);
};

export default passErrorToHandler;
