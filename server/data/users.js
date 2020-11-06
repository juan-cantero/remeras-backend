import bcrypt from 'bcrypt';
const users = [
  {
    name: 'root',
    email: 'root@mail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },

  {
    name: 'usuario1',
    email: 'usuario1@mail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'usuario2',
    email: 'usuario2@mail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
