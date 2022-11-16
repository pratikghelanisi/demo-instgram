const mongoose = require('mongoose');
const moment = require('moment');
// eslint-disable-next-line new-cap
const SubscribeSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  create: {
    type: Date,
    required: true,
    default: moment().format(),
  },
});

const Subscribe = mongoose.model('Subscribe', SubscribeSchema);
module.exports = Subscribe;
