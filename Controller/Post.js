

const addpost = async (req, res) => {
  try {
    // eslint-disable-next-line new-cap
    const {username, title, postinfo, img} = req.body;
    console.log(req.body);
    // eslint-disable-next-line no-unused-vars
    const filespath = req.files;
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    });
  }
};
module.exports = {addpost};
