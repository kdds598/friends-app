import jwt from 'jsonwebtoken';
import {User} from '../Models/User.model.js';
import bcrypt from 'bcryptjs';
import { generateToken,verifyToken } from '../utils/jwt.util.js';

 const signup = async (req, res) => {  

    console.log(req.body);
    const { username, password } = req.body;
    if(!username||!password){
       return  res.status(400).send({error:"provide all fields!"})  
    }

    if (username.length < 4 || username.length > 30) {
      
     return  res.status(400).send({error:'Username must be between 4 and 30 characters.'})  

    }
    if (password.length < 6) {
      
      return res.status(400).send({error:'Password must be at least 6 characters.'})  

    }


    try {

        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ error: "Username already exists" });
        }
        const user = new User({ username, password });
        await user.save();
        const generatedToken = generateToken(user.id);
       return res.status(201).json({ token: generatedToken,user: { id: user._id, username: user.username,friends:user.friends } });
    } catch (err) {
        console.log(err);
        
       return res.status(400).json({ error: 'server error' });
    }
};


const loginUser = async (req, res) => {   
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Please enter all fields" });
      }

      
    if (username.length < 4 || username.length > 30) {
      
    return  res.status(400).send({error:'Username must be between 4 and 30 characters.'})  

    }
    if (password.length < 6) {
      
    return  res.status(400).send({error:'Password must be at least 6 characters.'})  

    }
  
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      const token = generateToken(user._id);
      return res.json({ token, user: { id: user._id, username: user.username,friends:user.friends } });
    } catch (error) {
     return res.status(500).json({ message: "Server error" });
    }
  };


const searchUsers = async (req, res) => {
    const { search } = req.query;
    
  
    const users = await User.find({ username: new RegExp(search, 'i') }).select('-password');
    res.json(users);
};


const sendFriendRequest = async (req, res) => {
    console.log(req.body);
    
    const { recipientId } = req.body;
    

    const user = await User.findById(req.user.id);  
    const recipient = await User.findById(recipientId);

    if(!user || !recipient){
        return res.status(400).json({error: 'User not found'});
    }
  

    if (!recipient.recievedFriendRequests.includes(user._id)) {
        recipient.recievedFriendRequests.push(user._id);
        user.sentFriendRequests.push(recipientId);
        await recipient.save();
        await user.save();
    
       return  res.json({ error: 'Friend request sent' });
    } else {
      return  res.status(400).json({ error: 'Already sent request' });
    }
};

export { signup, loginUser, searchUsers, sendFriendRequest };



export const unfriendUser = async (req, res) => {
  const userId = req.user.id; 
  const { friendId } = req.body; 

  try {
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);

      if (!user || !friend) {
          return res.status(400).json({ error: 'User not found' });
      }

      user.friends = user.friends.filter(id => id.toString() !== friendId);

      friend.friends = friend.friends.filter(id => id.toString() !== userId);

      await user.save();
      await friend.save();

      return res.status(200).json({ message: 'Successfully unfriended' });
  } catch (error) {
      console.error('Error unfriending user:', error);
      return res.status(500).json({ message: 'Server error' });
  }
};
