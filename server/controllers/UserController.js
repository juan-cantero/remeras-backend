import passErrorToHandler from '../utils/errors.js';
import UserService from '../services/UserService.js';
import generateToken from '../utils/generateToken.js';
import _ from 'lodash/object.js';

class UserController {
  /**
   *
   * @param {UserService} userService
   */
  constructor({ userService }) {
    this.userService = userService;
  }
  async authUser(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await this.userService.findUserByEmail(email);
      if (
        user &&
        (await this.userService.matchPassword(user.password, password))
      ) {
        const token = generateToken(user._id);
        return res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: token,
        });
      } else {
        const error = new Error('Invalid password');
        error.statusCode = 401;
        throw error;
      }
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  async getProfile(req, res) {
    let user = req.user;
    user = _.pick(user, '_id', 'name', 'email');
    res.status(200).json({ user });
  }
}

export default UserController;
