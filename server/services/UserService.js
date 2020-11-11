import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';

class UserService {
  async findUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error('There is not such a user with that email');
        error.statusCode = 404;
        throw error;
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async matchPassword(userPassword, enteredPassword) {
    return await bcrypt.compare(enteredPassword, userPassword);
  }

  async findUserById(id) {
    return await User.findById(id).exec();
  }
}

export default UserService;
