const User = require('../model/User');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { username, email, password } = req.body;
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
              .then(() => res.status(200).json({ ok: true, signup: true }))
              .catch(() => res.status(500).json({ ok: false, signup: false }))
          : res.status(409).json({ ok: false, signup: false });
      })
      .catch(() => res.status(500).json({ ok: false, signup: false }));
  } catch (e) {
    res.status(500).json({ ok: false, signup: false });
  }
};

const login = async (req, res) => {
  const { username, loginPassword } = req.body;
  try {
    //   check if there is a user with the same name as the requested one
    const user = await User.findOne({ username });
    if (user) {
      const { password, ...userData } = user._doc;
      // check if password is correct
      (await bcrypt.compare(loginPassword, user.password))
        ? res.status(200).json({ ok: true, login: true, userData })
        : res.status(401).json({ ok: false, login: false });
    } else {
      // if there are no users with the same name as the requested one
      res.status(404).json({ ok: false, login: false });
    }
  } catch (e) {
    //   server error
    res.status(505).json({ ok: false, login: false });
  }
};

module.exports = {
  register,
  login,
};
