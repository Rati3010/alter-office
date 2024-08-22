const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username,email, password)
  try {
    const user = await User.create({ username, email, password });
    res.status(201).json({
      success: true,
      data: {
        token: generateToken(user),
        user: { id: user._id, username: user.username, email: user.email },
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    res.status(200).json({
      success: true,
      data: {
        token: generateToken(user),
        user: { id: user._id, username: user.username, email: user.email },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
