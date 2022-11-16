const mongoose = require('mongoose');
require('dotenv').config();
const Connection = async ()=>{
  try {
    await mongoose.connect(process.env.db_URL, {useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true});
    // console.log(1);
    return 1;
  } catch (error) {
    // console.log(0);
    return 0;
  }
};
module.exports = Connection;
