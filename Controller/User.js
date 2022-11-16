const User = require('../Database/schema/Userschema');
const subscribe = require('../Database/schema/SubscribeSchema');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const Register = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    if (name && email && password) {
      const exist = await User.findOne({email: email});
      if (exist) {
        res.json({
          stauts: 409,
          message: 'Email ID already exists',
        });
      } else {
        const encypassword = bcrypt.hashSync(password, saltRounds);
        await User.create({
          name: req.body.name,
          email: req.body.email,
          password: encypassword,
          active: true,
        }).then((data) => {
          res.json({
            stauts: 200,
            message: 'User successfully registered',
          });
        }).catch((err) => {
          res.json({
            stauts: 400,
            message: err,
          });
        });
      }
    } else {
      res.json({
        status: 400,
        message: 'Invalid Input',
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      message: error,
    });
  }
};

const Login = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (email && password) {
      const exist = await User.findOne(
          {email: email},
          {name: 1, email: 1, password: 1},
      );
      if (exist) {
        const isPasswordCorrect = await bcrypt.compare(password, exist.password);
        if (isPasswordCorrect) {
          const token = jwt.sign({name: exist.name, email: exist.email}, 'demo');
          res.json({
            stauts: 200,
            message: 'Login',
            token: token,
          });
        } else {
          res.json({
            stauts: 200,
            message: 'Invalid password',
          });
        }
      } else {
        res.json({
          stauts: 200,
          message: 'User not found',
        });
      }
    } else {
      res.json({
        status: 400,
        message: 'Invalid input',
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      message: error,
    });
  }
};

const Subscribe = async (req, res) =>{
  try {
    const exist = await subscribe.findOne(
        {
          email: req.body.email,
        });

    if (exist) {
      res.json({
        stauts: 200,
        message: 'Email already in exist',
      });
    } else {
      await subscribe.insertMany({email: req.body.email});
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'pratikghelani86@gmail.com',
          pass: 'iefmmdxzglxzqgpr',
        },
      });

      const mailOptions = {
        from: 'pratikghelani86@gmail.com',
        to: req.body.email,
        subject: 'Successfully subscribed',
        html: `<table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable">
                <tbody><tr><td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperWebview" style="max-width:600px">
                                <tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tbody> <tr><td style="padding-top: 20px; padding-bottom: 20px; padding-right: 0px;" align="right" valign="middle" class="webview"></td></tr></tbody></table></td> </tr> </tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px">
                                <tbody><tr><td align="center" valign="top">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;">
                                                <tbody><tr><td style="background-color:#00d2f4;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td>
                                                    </tr><tr class="margin-top:20px>
                                                        <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle">
                                                            <h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">`+req.body.email+`</h2>
                                                        </td></tr><tr>
                                                        <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle">
                                                            <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> Thank you for Subscription </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
                                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                                                                            
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td>
                                                    </tr>
                                                   
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="space">
                                                <tbody>
                                                    <tr>
                                                        <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperFooter" style="max-width:600px">
                                <tbody>
                                    <tr>
                                        <td align="center" valign="top">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="footer">
                                                <tbody>
                                                   
                                                    <tr>
                                                        <td style="padding: 10px 10px 5px;" align="center" valign="top" class="brandInfo">
                                    
                                                        </td>
                                                    </tr>
                                                
                                                    
                                                 
                                                    <tr>
                                                        <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>`,
      };

      transporter.sendMail(mailOptions);
      res.json({
        stauts: 200,
        message: 'Subscribe successfully',
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

const Alluser = async (req, res) =>{
  try {
    await User.find({}).then((data)=>{
      res.json({
        stauts: 200,
        message: 'success',
        data: data,
      });
    }).catch((error)=>{
      console.log(error);
      res.json({
        stauts: 500,
        message: 'error',
        data: data,
      });
    });
  } catch (error) {
    console.log(error);
    res.json({
      stauts: 500,
      message: error,
    });
  }
};

const Allsubscribe = async (res, response) =>{
  try {
    await subscribe.find({}).then((data)=>{
      response.json({
        stauts: 200,
        message: 'success',
        data: data,
      });
    }).catch((error)=>{
      console.log(error);
      response.json({
        stauts: 500,
        message: 'error',
        data: data,
      });
    });
  } catch (error) {
    console.log(error);
    res.json({
      stauts: 500,
      message: error,
    });
  }
};

module.exports = {Register, Login, Subscribe, Alluser, Allsubscribe};


