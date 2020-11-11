const passErrorToHandler = (error, next) => {
  next(error);
};

export default passErrorToHandler;
