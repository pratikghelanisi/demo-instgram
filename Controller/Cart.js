const Cart = require('../Database/schema/CartSchema');
const ObjectId = require('mongoose').Types.ObjectId;
const Addcart = async (req, res) =>{
  try {
    const {productid, userid, qty} = req.body;
    if (productid && userid && qty) {
      // eslint-disable-next-line new-cap
      const exist = await Cart.find({$and: [{userId: ObjectId(userid)}, {productId: ObjectId(productid)}]});
      if (exist.length == 0) {
        // eslint-disable-next-line new-cap
        await Cart.create({userId: ObjectId(userid), productId: ObjectId(productid), quantity: qty}).then((data)=>{
          res.json({
            stauts: 200,
            message: 'Product add successfully',
          });
        }).catch((error)=>{
          console.log(error);
        });
      } else {
        // eslint-disable-next-line new-cap
        const result = await Cart.updateMany({_id: ObjectId(exist[0]._id)}, {$set: {quantity: qty}});
        console.log(result);
        res.json({
          stauts: 200,
          message: 'success',
        });
      }
    } else {
      res.json({
        stauts: 400,
        message: 'invalid input',
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      stauts: 500,
      message: error,
    });
  }
};
module.exports = {Addcart};
