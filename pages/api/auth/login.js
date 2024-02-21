import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Find user by username or email
    const user = await db.collection("users").findOne({
      $or: [{ email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
    );
    process.env.REPLIT_DB_URL -d `${token}=${email}`
    res.setHeader("Set-Cookie", `token=${token}; Path=/; HttpOnly`);
    

    return res.status(200).json({ message: "Login successful", user });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
