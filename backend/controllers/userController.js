const User = require("../models/User");
const Link = require("../models/Link");

exports.updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (req.body.email && req.body.email !== user.email) {
    user.email = req.body.email;
    await user.save();
    return res.json({ message: "Email updated, please log in again" });
  }
  user.name = req.body.name;
  await user.save();
  res.json(user);
};

exports.deleteAccount = async (req, res) => {
  await Link.deleteMany({ user: req.user.id });
  await User.findByIdAndDelete(req.user.id);
  res.json({ message: "Account deleted" });
};
