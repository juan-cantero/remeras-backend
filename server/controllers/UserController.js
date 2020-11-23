import passErrorToHandler from '../utils/errors.js';
import UserService from '../services/UserService.js';
import generateToken, { generateResetToken } from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';
import _ from 'lodash/object.js';
import dotenv from 'dotenv';

import { encryptPassword } from '../utils/encription.js';
import { validationResult } from 'express-validator';
import User from '../models/UserModel.js';
import MailService from '../services/MailService.js';
dotenv.config();

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
      const user = await this.userService.findUserByEmail(email);
      if (
        user &&
        (await this.userService.matchPassword(password, user.password))
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
      passErrorToHandler(error, next);
    }
  }

  //@description send an email with link to reset password
  //@route PUT api/user/forgotpassword
  //@access public
  async forgotPassword(req, res, next) {
    const { email } = req.body;

    try {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        const error = new Error('There is not user with that email');
        error.statusCode = 400;
        throw error;
      }
      const token = generateResetToken(user._id);
      user.resetLink = token;
      const updatedUser = await user.save();
      const info = await MailService.sendmail({
        from: 'juanqui.cantero1989@gmail.com',
        to: `${email}`,
        subject: 'Ingresa en el link para resetear tu password',
        html: `
        <a href="http://localhost:3000/api/user/resetpassword">resetea tu password</a>
        `,
      });
      res.status(200).json({ message: 'El email fue enviado', info });
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //@description reset password
  //@route PUT api/user/resetpassword
  //@access private
  async resetPassword(req, res, next) {
    const { newPassword, resetLink } = req.body;

    try {
      const decoded = jwt.verify(resetLink, process.env.JWT_SECRET_RESET);

      const user = await this.userService.findUserByCondition({ resetLink });
      if (!user) {
        const error = new Error('authorization error!!');
        error.statusCode = 401;
        throw error;
      }
      user.password = newPassword;
      user.resetLink = '';
      const savedUser = await user.save();
      console.log(savedUser);
      res.status(200).json({ message: 'your password has been changed' });
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //@description get user profile
  //@route Get api/user/profile
  //@access private
  async getProfile(req, res) {
    let user = req.user;
    res.status(200).json({ _id: user._id, name: user.name, email: user.email });
  }

  //@description update user profile
  //@route Get api/user/profile
  //@access private
  async updateUserProfile(req, res, next) {
    let dbUser;
    try {
      dbUser = await this.userService.findUserById(req.user._id);
      if (dbUser) {
        dbUser.name = req.body.name || dbUser.name;
        dbUser.email = req.body.email || dbUser.email;
        if (req.body.password) {
          let encryptedPassword = await encryptPassword(req.body.password);
          dbUser.password = encryptedPassword;
        }
      }
    } catch (error) {
      return passErrorToHandler(error, next);
    }

    try {
      let updatedUser = await dbUser.save();

      let token = generateToken(updatedUser._id);

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: token,
      });
    } catch (error) {
      passErrorToHandler(error, next);
    }
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

  //@description get user by id
  //@ROUTE GET /api/user/:id
  //@access private/admin
  async getUserById(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const id = req.params.id;

    try {
      let userDb = await this.userService.findUserById(id);
      userDb = _.pick(userDb, ['_id', 'name', 'email', 'isAdmin']);
      res.status(200).json(userDb);
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //@description update user
  // @ROUTE PUT /api/user/:id
  //@access PRIVATE/ADMIN
  async updateUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const id = req.params.id;

    try {
      const dbUser = await this.userService.findUserById(id);
      if (dbUser) {
        dbUser.name = req.body.name || dbUser.name;
        dbUser.email = req.body.email || dbUser.email;
        dbUser.isAdmin = req.body.isAdmin;
        let updatedUser = await dbUser.save();
        updatedUser = _.pick(updatedUser, ['_id', 'name', 'email', 'isAdmin']);
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //@description delete user
  //@ROUTE DELETE /api/user/:id
  //@access private/admin
  async deleteUser(req, res, next) {
    const userId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    try {
      const deletedUser = await this.userService.deleteUserById(userId);
      res.status(200).json(deletedUser);
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }

  //@description get all the users
  //@ROUTE GET /user/list
  //@access private/admin
  async getAllUsers(req, res, next) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }
}

export default UserController;
