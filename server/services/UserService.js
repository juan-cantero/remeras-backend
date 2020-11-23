import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';

class UserService {
  async findUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async matchPassword(enteredPassword, userPassword) {
    return await bcrypt.compare(enteredPassword, userPassword);
  }

  async findUserById(id) {
    try {
      return await User.findById(id).exec();
    } catch (error) {
      throw error;
    }
  }

  async findUserByCondition(condition) {
    try {
      return await User.findOne(condition).exec();
    } catch (error) {
      throw error;
    }
  }

  async createUser(dataForCreateUser) {
    const user = new User(dataForCreateUser);
    try {
      const userDb = await User.create(user);
      if (!user) {
        const error = new Error('could create user');
        error.statusCode = 500;
        throw error;
      }
      return userDb;
    } catch (error) {
      throw error;
    }
  }

  async deleteUserById(id) {
    try {
      const userToBeDeleted = await User.findById(id);
      const deletedUser = await userToBeDeleted.remove();
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      return await User.find({}).exec();
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
