import mongoose from 'mongoose';

const ShippingCostSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },

    province: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
      unique: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ShippingCost = mongoose.model('ShippingCost', ShippingCostSchema);

export default ShippingCost;
