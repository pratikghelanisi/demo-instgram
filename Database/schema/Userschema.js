const mongoose = require('mongoose');
// eslint-disable-next-line new-cap
const Userschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
},
{
  versionKey: false,
  timestamps: true,
});

const User = mongoose.model('user', Userschema);
module.exports = User;
