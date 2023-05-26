const express = require("express");
const { route } = require("express/lib/application");
const { Checkuser } = require("../middleware/auth");
const {} = require("../models/users");
require("dotenv").config();
const routers = express.Router();
const { Driver, User } = require("../models/users");
const { sortArticles } = require("../middleware/utils");
const { RegisterUser, sendOtp, ResetPass } = require("../config/gateway");

const jwt = require("jsonwebtoken");
const { Admin } = require("../models/users");
const bcryt = require("bcrypt");
/////////////////////////////////////////////// create new user

routers.route("/preregister").post(async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      age,
      password,
      address,
      username,
      phone,
    } = req.body;
    const check_user = await User.findOne({ email: email });
    const usern = await User.findOne({ username: username });

    if (check_user || usern) {
      if (check_user && usern) {
        res.status(400).json({
          msg: "email and username used already!!",
        });
      }
      if (check_user && !usern) {
        res.status(400).json({
          msg: "email used already!!",
        });
      }
      if (usern && !check_user) {
        res.status(400).json({
          msg: "user name used already!!",
        });
      }
    } else if (!check_user) {
      const signtoken = jwt.sign(
        { firstname, lastname, email, age, password, address, username, phone },
        process.env.ACCOUNT_ACTIVATION,
        { expiresIn: "1d" }
      );
      await RegisterUser(username, email, signtoken);
      res.status(200).json(req.body.firstname);
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routers.route("/createuser").post(async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      age,
      password,
      address,
      username,
      phone,
    } = jwt.verify(req.body.t, process.env.ACCOUNT_ACTIVATION);

    const check_user = await User.findOne({ email: email });
    const check_username = await User.findOne({ username: username });

    if (check_username || check_user) {
      if (check_user) {
        res.status(400).json({
          msg: "email used already!!",
        });
      } else {
        res.status(400).json({
          msg: "username taken!!",
        });
      }
    } else if (!check_user && !check_username) {
      const user = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        age: age,
        password: password,
        address: address,
        username: username,
        phone: phone,
      });

      const save_user = await user.save();

      const token = user.generate_token();

      res.cookie("x-auth", token).json(save_user);
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
//////////////////////////////////////// get users
routers.route("/alluser").post(async (req, res) => {
  try {
    const allusers = await User.find({}).sort({ createdAt: "desc" });

    if (!allusers) {
      res.status(400).json({ msg: "no user found" });
    }
    if (allusers) {
      res.status(200).json(allusers);
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
////////////GET USER//////////////////paginate
routers.route("/getallusers").post(async (req, res, next) => {
  try {
    let sortArgs = sortArticles(req.body);
    const all_user = await User.find({})
      .sort([[sortArgs.sortBy, sortArgs.order]])
      .skip(sortArgs.skip)
      .limit(sortArgs.limit);

    res.status(200).json(all_user);
    next();
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

////////////////////////////////////////////// signin users
routers.route("/signin").post(async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const user_ac = await User.findOne({ email: email });
    const user_ac_user = await User.findOne({ username: username });

    if (!user_ac && !user_ac_user) {
      res.status(400).json({ msg: "user not found" });
    }
    if (user_ac || user_ac_user) {
      if (user_ac.active === "false") {
        res.status(400).json({ msg: "user blocked" });
      }
      if (user_ac.active === "true") {
        const matchpassword = await user_ac.comparepassword(password);
        if (matchpassword == true) {
          const token = user_ac.generate_token();
          res.cookie("auth-user", token).json(user_ac);
        }
        if (matchpassword == false) {
          res.status(400).json({ msg: "password mismatch" });
        }
      }
    }
  } catch (error) {
    res.status(400).json("error");
  }
});

//////////////////////////////////////////////// modify user content
routers.route("/modifyuser/:id").patch(async (req, res) => {
  try {
    const _id = req.params.id;

    const updated_user = await User.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).json(updated_user);
  } catch (error) {
    res.status(400).json({ msg: "error" });
  }
});

///////////////// modify driver profile

/////////////////////////////////////////////// delete user account

/////////////////////  suspend user
routers.route("/suspenduser/:id").patch(async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id });
    if (!user) {
      res.status(400).json({ msg: "user not found" });
    }
    if (user) {
      const userdata = await User.findByIdAndUpdate(
        { _id },
        {
          $set: {
            ...req.body,
            active: false,
          },
        },
        { new: true }
      );
      res.status(200).json({ msg: `${user.username}` });

      await Contactmail(
        user.email,
        "you violated our terms and condition.you can contact our adminstrator to recover your account"
      );
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

/////////////////////  unblock user
routers.route("/unblockuser/:id").patch(async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id });
    if (!user) {
      res.status(400).json({ msg: "user not found" });
    }
    if (user) {
      const userdata = await User.findByIdAndUpdate(
        { _id },
        {
          $set: {
            ...req.body,
            active: true,
          },
        },
        { new: true }
      );
      res.status(200).json({ msg: `${userdata.username}` });

      await Contactmail(
        user.email,
        ` hi, ${user.username} your account has been recovered`
      );
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

////////////////// profile0
routers.route("/profile").get(Checkuser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.send(error);
  }
});

////////////////////////////////// delete user

routers.route("/deluser/:id").delete(async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndDelete(_id);

    if (user) {
      await Contactmail(
        user.email,
        "sorry, you violated our terms and condition.Your account has been retracted"
      );
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

///////////// send user msg
routers.route("/usermsg/:id").delete(async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndDelete(_id);
    if (user.verified === true) {
      await Contactmail(user.email, req.body.mesage);
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

/// user reset password

routers.route("/userResetPass/:id").patch(async (req, res) => {
  try {
    const _id = req.params.id;
    const user_a = await User.findById({ _id });
    if (user_a) {
      const matchpassword = await user_a.comparepassword(req.body.password);
      if (matchpassword == false) {
        res.status(400).json({ msg: "password mismatch" });
      }
      if (matchpassword == true) {
        const salt = await bcryt.genSalt(10);
        const hash = await bcryt.hash(req.body.newpassword, salt);
        const newpass = await User.findOneAndUpdate(
          { _id },
          {
            $set: {
              password: hash,
            },
          },
          { new: true }
        );

        res.status(200).json(newpass);
      }
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routers.route("/userforgotpass").post(async (req, res) => {
  try {
    const email = req.body.email;

    const user_a = await User.find({ email: email });
    const driver_a = await Driver.find({ email: email });
    if (!user_a && !driver_a) {
      res.status(400).json({ msg: "account not found" });
    }
    if (user_a) {
      const signtoken = jwt.sign({ email }, process.env.ACCOUNT_ACTIVATION, {
        expiresIn: "1d",
      });

      Resetpass(req.body.email, signtoken);

      res.status(200).json(signtoken);
    }
    if (driver_a && !user_a) {
      const signtoken = jwt.sign({ email }, process.env.ACCOUNT_ACTIVATION, {
        expiresIn: "1d",
      });
      await Resetpass(req.body.email, signtoken);

      res.status(200).json({ msg: "ok" });
    }
  } catch (error) {
    res.status(400).json({ msg: "erro" });
  }
});
//// reset page

routers.route("/passwordforgotreset").patch(async (req, res) => {
  try {
    const { _id } = jwt.verify(req.body.t, process.env.ACCOUNT_ACTIVATION);

    const user = await User.findOne({_id})
 

    if (user ){
        const salt = await bcryt.genSalt(10);
        const hash = await bcryt.hash(req.body.password, salt);

        const updated = await User.findOneAndUpdate(
          { _id:_id },
          {
            $set: {
              password: hash,
            },
          },
          { new: true }
        );
        res.status(200).json(updated);
       
      }

      
       
    
    
  } catch (error) {
    res.status(400).json({ msg: "error" });
  }
});

routers.route("/smsauth").post(async (req, res) => {
  const number = req.body.number;

  try {
    const message = sendOtp(number);
    res.status(200).send({
      success: true,
      message: `OTP sent successfully`,
      payload: message,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in sending otp: ${err.message}`,
    });
  }
});

routers.route("/sendpasswordresetlink").post(async (req, res) => {
  try {
    const { email } = req.body;
    const check_user = await User.findOne({ email: email });

    if (check_user) {
      const _id = check_user.id;

      const token = jwt.sign({ _id }, process.env.ACCOUNT_ACTIVATION, {
        expiresIn: "1d",
      });
      await ResetPass(email, signtoken);
      res.status(200).json({ msg: "Please check your mail" });
    }
    if (!check_user) {
      res.status(403).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

module.exports = routers;
