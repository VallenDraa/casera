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

module.exports = {
  updateUser,
};
