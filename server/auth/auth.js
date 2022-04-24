const User = require('../model/User');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.json({
      code: 404,
      ok: false,
      login: false,
      msg: 'Make Sure Register Form Is Not Empty !',
    });
  }

  try {
    // get datas from the body
    const newUser = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    // find existing user
    User.findOne({
      $or: [
        {
          email: newUser.email,
        },
        {
          username: newUser.username,
        },
      ],
    })
      .then((existingUser) => {
        //   if there is no existing user
        !existingUser
          ? newUser
              .save()
              .then(() =>
                res.status(200).json({ code: 200, ok: true, signup: true })
              )
              .catch(() =>
                res.status(500).json({ code: 500, ok: false, signup: false })
              )
          : res.json({
              code: 409,
              ok: false,
              signup: false,
              msg: 'User already exist !',
            });
      })
      .catch(() =>
        res.status(500).json({ code: 500, ok: false, signup: false })
      );
  } catch (e) {
    res.status(500).json({ code: 500, ok: false, signup: false });
  }
};

const login = async (req, res) => {
  const { username, loginPassword } = req.body;

  // make sure the request body is not empty
  if (!username || !loginPassword) {
    return res.json({
      code: 404,
      ok: false,
      login: false,
      msg: 'Make Sure Login Form Is Not Empty !',
    });
  }

  try {
    //   check if there is a user with the same name as the requested one
    const user = await User.findOne({ username });
    if (user) {
      const { password, ...userData } = user._doc;
      // check if password is correct
      (await bcrypt.compare(loginPassword, user.password))
        ? res.status(200).json({ code: 200, ok: true, login: true, userData })
        : res.json({
            code: 401,
            ok: false,
            login: false,
            msg: 'Password Is Incorrect !',
          });
    } else {
      // if there are no users with the same name as the requested one
      res.json({
        code: 404,
        ok: false,
        login: false,
        msg: "User Doesn't Exist !",
      });
    }
  } catch (e) {
    //   server error
    res.status(500).json({ code: 500, ok: false, login: false });
  }
};

module.exports = {
  register,
  login,
};
