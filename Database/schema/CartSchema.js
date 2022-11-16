const mongoose = require('mongoose');
// eslint-disable-next-line new-cap
const CartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    trim: true,
  },
});

const cart = mongoose.model('cart', CartSchema);
module.exports = cart;
