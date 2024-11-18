import User from "../model/user.model.js";

export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      console.log(user);
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User Created Successfully", _id: newUser._id });
  } catch (error) {
    console.log("Error in Register Route: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not Found." });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Wrong Password" });
    }

    res.status(200).json({ message: "Login Successfull", _id: user._id });
  } catch (error) {
    console.log("Error in Login Route: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const Logout = async (req, res) => {
  try {
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.log("Error in Logout Route: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
