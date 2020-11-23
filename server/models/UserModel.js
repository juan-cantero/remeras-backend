import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    resetLink: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// userSchema.methods.matchPassword = async (enteredPassword) => {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

const User = mongoose.model('User', userSchema);

export default User;
