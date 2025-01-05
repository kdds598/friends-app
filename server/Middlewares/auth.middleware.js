import jwt from 'jsonwebtoken';


// export const authMiddleware = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'Unauthorized' });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };
// const { verifyToken } = require("../utils/jwt");
// const User = require("../models/User");
import { verifyToken } from "../utils/jwt.util.js";
import { User } from '../Models/User.model.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user; // Attach user to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};


