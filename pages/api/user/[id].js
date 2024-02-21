// pages/api/users/[id].js
import { User } from "../../../models";

export default async (req, res) => {
  const { id } = req.query;

  switch (req.method) {
    case "GET": {
      // Get a specific user by ID (accessible to gymAdmin and the user himself)
      try {
        // Add authentication and authorization logic here
        if (req.user.role !== "gymAdmin" && req.user.id !== id) {
          return res.status(403).json({ message: "Unauthorized" });
        }

        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
    case "PUT": {
      // Update a specific user by ID (accessible to gymAdmin only)
      try {
        // Add authentication and authorization logic here
        if (req.user.role !== "gymAdmin") {
          return res.status(403).json({ message: "Unauthorized" });
        }

        const { email, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
          id,
          { email, password },
          { new: true },
        );
        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
    case "DELETE": {
      // Delete a specific user by ID (accessible to gymAdmin only)
      try {
        // Add authentication and authorization logic here
        if (req.user.role !== "gymAdmin") {
          return res.status(403).json({ message: "Unauthorized" });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
    default:
      res.status(405).json({ message: "Method not allowed" });
  }
};
