const Sanitize = require('../Helper/Sanitize');
const demo = async (req, res) => {
  try {
    // eslint-disable-next-line new-cap
    const name = Sanitize(req.body.name);
    // eslint-disable-next-line new-cap
    const age = Sanitize(req.body.age);
    res.json({
      status: 200,
      message: 'Demo',
      data: {
        name: name,
        age: age,
      },
    });
  } catch (error) {
    res.json({
      status: 500,
      message: error,
    });
  }
};
module.exports = {demo};
