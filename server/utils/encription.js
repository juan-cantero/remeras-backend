import bcrypt from 'bcrypt';

export const encryptPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const encryptedPass = await bcrypt.hash(plainPassword, salt);
    return encryptedPass;
  } catch (error) {
    throw error;
  }
};
