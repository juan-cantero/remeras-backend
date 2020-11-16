import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    purchaserUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    orderItems: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        unit_price: { type: Number, required: true },
        size: { type: String, required: true },
      },
    ],

    shippingAddress: {
      address: { type: String, required: true },
      locality: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      required: true,
      default: 'mercado pago',
    },

    paymentResult: {
      type: String,
    },

    itemsPrice: {
      type: Number,
      required: true,
    },

    shippingPrice: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: {
      type: Date,
    },

    isDelivered: {
      type: Boolean,
      default: false,
    },

    deliverdAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
