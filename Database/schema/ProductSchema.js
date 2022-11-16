const mongoose = require('mongoose');
// eslint-disable-next-line new-cap
const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  description: {
    type: String,
    required: true,
  },
  sortdescription: {
    type: String,
    required: true,
  },
  create: {
    type: Date,
    required: true,
    default: Date,
  },
  update: {
    type: Date,
    required: true,
    default: Date,
  },
  photos: {
    type: [{
      url: String,
    }],
    required: true,
  },
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;
