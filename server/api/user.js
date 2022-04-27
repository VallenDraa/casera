const User = require('../model/User');

const updateUser = async (req, res) => {
  const { _id, username, phone, hobby, profilePic } = req.body;

  try {
    let user = await User.findById(_id);
    user.profilePic = profilePic;
    user.username = username;
    user.phone = phone;
    user.hobby = hobby;

    const { password, ...userData } = user._doc;
    await user.save();

    // send back the updated user data
    res.status(200).json({ code: 200, ok: true, userUpdated: true, userData });
  } catch (e) {
    console.log(e);
    res.status(500).json({ code: 500, ok: false, userUpdated: true });
  }
};

const getUser = async (req, res) => {
  // console.log(req.query);
  const { username } = req.query;

  try {
    const [user] = await User.where('username').equals(username).limit(1);

    const { password, email, ...userData } = user._doc;

    res.status(200).json({ code: 200, ok: true, userGet: true, userData });
  } catch (err) {
    res.status(500).json({ code: 500, ok: false, userGet: false });
  }
};

module.exports = {
  updateUser,
  getUser,
};
