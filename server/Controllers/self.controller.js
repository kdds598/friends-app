
import { User } from "../Models/User.model.js";

export const getSelfData = async (req, res) => {
    
  try {
    const user = await User.findById(req.user.id)
    .select("id username friends sentFriendRequests recievedFriendRequests")
    
  console.log(user);

    res.status(200).json({user: user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};



export const getFriends =async (req, res) => {

  try {
    const user = await User.findById(req.user.id)
        .select('friends') 
        .exec();

    let completedUser = null;

    if (user && user.friends.length > 0) {
        completedUser = await user.populate('friends', 'username'); 
    } else {
        completedUser = user; 
    }
    console.log(completedUser);

    res.status(200).json( completedUser.friends );
} catch (err) {
    console.error(err); 
    res.status(500).json({ error: "Failed to fetch user data" });
}
};


export const getsentfriendreq =async (req, res) => {

  try {
    const user = await User.findById(req.user.id)
        .select('sentFriendRequests') 
        .exec();

    let completedUser = null;

    if (user && user.sentFriendRequests.length > 0) {
        completedUser = await user.populate('sentFriendRequests', 'username'); // Populate and await directly
    } else {
        completedUser = user; 
    }
    console.log(completedUser);

    res.status(200).json({ user: completedUser });
} catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user data" });
}
};

export const getrecievedFrReq =async (req, res) => {

  try {
    const user = await User.findById(req.user.id)
        .select('recievedFriendRequests') 
        .exec();

    let completedUser = null;

    if (user && user.recievedFriendRequests.length > 0) {
        completedUser = await user.populate('recievedFriendRequests', 'username'); // Populate and await directly
    } else {
        completedUser = user;
      }
    console.log(completedUser);

    res.status(200).json({ user: completedUser });
} catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user data" });
}
};