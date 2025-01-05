import { User } from "../Models/User.model.js";


const fetchInitialUsers = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('friends recievedFriendRequests sentFriendRequests');

    const users = await User.find({
      _id: { $ne: userId }, 
      _id: { $nin: [...user.friends, ...user.sentFriendRequests, ...user.recievedFriendRequests,userId] }, 
    }).select('id username'); 
    

    res.status(200).json(users);

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users. Please try again later.',
    });
  }
};


export { fetchInitialUsers };
