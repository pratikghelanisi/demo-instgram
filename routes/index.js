const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const {demo}= require('../Controller/Demo');
const {Register, Login, Subscribe, Alluser, Allsubscribe}= require('../Controller/User');
const {AddProduct, Productlist, Search, deleteProduct, editProduct} = require('../Controller/Product');
const {auth} = require('../Middleware/auth');
const {Addcart} = require('../Controller/Cart');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'upload');
  },
  filename: function(req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, Date.now() + '.' + ext);
  },
});

const upload = multer({storage: storage});
router.get('/test', auth, demo);
router.post('/register', Register);
router.post('/login', Login);

// router.post('/productlist', Productlist);
router.get('/search', Search);
router.post('/subscribe', Subscribe);
router.post('/addcart', auth, Addcart);
router.get('/Alluser', auth, Alluser);
router.get('/Allsubscribe', auth, Allsubscribe);

// router.post('/addProduct', upload.array('files'), AddProduct);


// New Post
router.post('/addPost', upload.array('files'), AddProduct);
router.get('/Postlist', Productlist);
router.delete('/deletePost', deleteProduct);
router.post('/editPost', upload.array('files'), editProduct);


module.exports = router;
