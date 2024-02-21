// pages/api/users/index.js
import { User } from "../../../models";

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      // Create a new user (accessible to gymAdmin only)
      try {
        // Add authentication and authorization logic here
        if (req.user.role !== "gymAdmin") {
          return res.status(403).json({ message: "Unauthorized" });
        }

        // Create the user
        const { email, password, role } = req.body;
        const newUser = await User.create({ email, password, role });
        res.status(201).json(newUser);
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
    case "GET": {
      // Get all users (accessible to gymAdmin only)
      try {
        // Add authentication and authorization logic here
        if (req.user.role !== "gymAdmin") {
          return res.status(403).json({ message: "Unauthorized" });
        }

        const users = await User.find();
        res.status(200).json(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
    default: {
      res.status(405).json({ message: "Method not allowed" });
    }
  }
};
