import passErrorToHandler from '../utils/errors.js';
import UserService from '../services/UserService.js';
import generateToken from '../utils/generateToken.js';
import _ from 'lodash/object.js';
import { encryptPassword } from '../utils/encription.js';

class UserController {
  /**
   *
   * @param {UserService} userService
   */
  constructor({ userService }) {
    this.userService = userService;
  }

  //@description authenticate user
  //@route POST /api/user/login
  //@access public
  async authUser(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = this.userService.findUserByEmail(email);
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
        const error = new Error('Invalid user or password');
        error.statusCode = 401;
        throw error;
      }
    } catch (error) {
      return passErrorToHandler(error, next);
    }
  }

  //@description get user profile
  //@route Get api/user/profile
  //@access private
  async getProfile(req, res) {
    let user = req.user;
    user = _.pick(user, '_id', 'name', 'email');
    res.status(200).json({ user });
  }

  //@description register user
  //@route Get api/user/
  //@access public
  async registerUser(req, res, next) {
    const { name, email, password } = req.body;
    try {
      const user = await this.userService.findUserByEmail(email);

      if (user) {
        const error = new Error('there is already a user with that email');
        error.status = 400;
        throw error;
      }
    } catch (error) {
      return passErrorToHandler(error, next);
    }

    try {
      const encryptedPassword = await encryptPassword(password);

      const dataForCreateUser = {
        name: name,
        email: email,
        password: encryptedPassword,
      };
      const user = await this.userService.createUser(dataForCreateUser);
      if (user) {
        const token = generateToken(user._id);
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: token,
        });
      }
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }
}

export default UserController;
