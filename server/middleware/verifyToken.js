import jwt from 'jsonwebtoken';
import container from '../container.js';
import passErrorToHandler from '../utils/errors.js';

const verifyToken = async (req, res, next) => {
  let token;

  const tokenWasSendAndStartsWithBearer =
    req.headers.authorization && req.headers.authorization.startsWith('Bearer');

  if (tokenWasSendAndStartsWithBearer) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await container.cradle.userService.findUserById(decoded.id);
      req.user = user;
      next();
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }
};

export default verifyToken;
