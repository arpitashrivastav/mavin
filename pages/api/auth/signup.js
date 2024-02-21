import bcrypt from "bcrypt";
import { User } from "../../../models/index";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    console.log({ email, password });

    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with same email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      // Add other user details as needed
    });

    // Save user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
