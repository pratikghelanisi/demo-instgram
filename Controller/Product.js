const Product = require('../Database/schema/ProductSchema');
const Post = require('../Database/schema/PostSchema');

const AddProduct = async (req, res) => {
  try {
    const {username, title, description} = req.body;
    const filesArray = req.files;

    if (username && title && description && filesArray[0].filename) {
      const imgpath = `http://localhost:8000/upload/${filesArray[0].filename}`;

      await Post.create({
        username: username,
        title: title,
        description: description,
        img: imgpath,
      }).then((data) => {
        res.json({
          stauts: 200,
          message: 'successfully Create',
          data,
        });
      }).catch((err) => {
        res.json({
          stauts: 400,
          message: err,
        });
      });
    } else {
      res.json({
        status: 401,
        message: 'data missing',
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    });
  }
};


const Productlist = async (req, res) => {
  try {
    const TotalProduct = await Post.find({active: true});
    const page = req.body.pageno;
    const limit = 10;
    const totalpage = parseInt(TotalProduct.length / limit) + 1;
    const Productlist = await Post.find({active: true})
        .skip((page - 1) * limit)
        .limit(limit);

    res.json({
      stauts: 200,
      totalpage: totalpage,
      totalpost: TotalProduct.length,
      totalpostthispage: Productlist.length,
      data: Productlist,
    });
  } catch (error) {
    res.json({
      stauts: 500,
      message: error,
    });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const {postid} = req.body;
    if (postid) {
      await Post.deleteOne({
        _id: postid,
      }).then((data)=>{
        res.json({
          stauts: 202,
          message: 'successfully deleted',
        });
      });
    } else {
      res.json({
        stauts: 400,
        message: 'Invalid',
      });
    }
  } catch (error) {
    res.json({
      stauts: 500,
      message: error,
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const {username, title, description, id} = req.body;
    const filesArray = req.files;

    if (username && title && description && id && filesArray[0].filename) {
      const imgpath = `http://localhost:8000/upload/${filesArray[0].filename}`;

      await Post.update({_id: id}, {$set: {
        username: username,
        title: title,
        description: description,
        img: imgpath,
      }}).then((data)=>{
        res.json({
          stauts: 200,
          message: 'successfully Update',
        });
      }).catch((e)=>{
        res.json({
          stauts: 500,
          message: e.message,
        });
      });

      // db.student.update({name:"avi"},{$set:{name:"helloword"}})
    } else {
      res.json({
        status: 401,
        message: 'data missing',
      });
    }
  } catch (error) {
    res.json({
      stauts: 500,
      message: error.message,
    });
  }
};

const Search = async (req, res) => {
  try {
    const searchtext = req.body.searchtext;
    const Searchdata = await Product.find({
      active: true,
      $or: [
        {name: {$regex: searchtext, $options: 'i'}},
        {description: {$regex: searchtext, $options: 'i'}},
        {sortdescription: {$regex: searchtext, $options: 'i'}},
      ],
    });
    res.json({
      stauts: 200,
      total: Searchdata.length,
      data: Searchdata,
    });
  } catch (error) {
    res.json({
      stauts: 500,
      message: error,
    });
  }
};


module.exports = {AddProduct, Productlist, Search, deleteProduct, editProduct};
