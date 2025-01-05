import { User } from '../Models/User.model.js';

 export const acceptFriendRequest = async (req, res) => {

    const { senderId } = req.body;

    if(!senderId){
      res.send({message:"sender id not provided"})
    }

    const userId=req.user.id;
    try {
      const user = await User.findById(userId);
  
      if(!user.recievedFriendRequests.includes(senderId)) {
        return res.json({ error: 'No friend request from this user' });
      }
  
      if (user.friends.includes(senderId)) {
        return res.json({ error: 'Already friends with this user' });
      }
  
      await User.findByIdAndUpdate(userId, {
        $push: { friends: senderId },
        $pull: { recievedFriendRequests: senderId }
      });

      await User.findByIdAndUpdate(senderId, { $push: { friends: userId },$pull: { sentFriendRequests: userId } });
  
      res.status(200).json({ message: 'Friend request accepted!' });
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ error: 'Error accepting friend request' });
    }
  };
  

  

  export const rejectFriendRequest = async (req, res) => {
    
    const { friendId } = req.body; 
    if(!friendId){
    return  res.status(400).send({error:"sender id not provided"})
    }
    
    const userId = req.user.id;
    
    try {
       await User.findByIdAndUpdate(userId, {
            $pull: { recievedFriendRequests: friendId }
        });
        

        await User.findByIdAndUpdate(friendId, {
            $pull: { sentFriendRequests: userId }
        });

        res.status(200).json({ message: 'Friend request rejected!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error rejecting friend request' });
    }
};
