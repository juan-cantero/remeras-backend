import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/UserModel.js';
import Product from './models/ProductModel.js';
import Order from './models/OrderModel.js';
import connectDb from './config/db.js';

dotenv.config();

connectDb();

const importData = async () => {
  try {
    await destroyData();
    const createdUsers = await User.insertMany(users);
    const adminUserId = createdUsers[0]._id;
    const sampleProducts = products.map((p) => {
      return { ...p, creator: adminUserId };
    });
    await Product.insertMany(sampleProducts);
    console.log('Data imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('Data destroyed'.red.inverse);
  } catch (error) {
    console.log(`error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
