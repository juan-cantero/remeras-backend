import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const generateResetToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_RESET, { expiresIn: '20m' });
};

export default generateToken;
