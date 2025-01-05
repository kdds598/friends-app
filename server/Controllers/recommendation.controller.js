import { User } from '../Models/User.model.js';

export async function getRecommendedUsers(req,res) {
    const userId=req.user.id;

    try {
        const user = await User.findById(userId).select('friends sentFriendRequests recievedFriendRequests')
            .populate('friends', '_id')
            .populate('sentFriendRequests', '_id')
            .populate('recievedFriendRequests', '_id');
        console.log(user);
        
        if (!user) {
            throw new Error('User not found');
        }

        const userFriendsIds = new Set(user.friends.map(friend => friend._id.toString()));
        const sentRequestsIds = new Set(user.sentFriendRequests.map(request => request._id.toString()));
        const receivedRequestsIds = new Set(user.recievedFriendRequests.map(request => request._id.toString()));

        const recommendedUsers = await User.find({
            _id: { $ne: userId, $nin: [...userFriendsIds, ...sentRequestsIds, ...receivedRequestsIds] },
            $or: [
                { friends: { $in: Array.from(userFriendsIds) } },
                { sentFriendRequests: { $in: Array.from(userFriendsIds) } },
                { recievedFriendRequests: { $in: Array.from(userFriendsIds) } }
            ]
        }).select('_id friends username');

        const recommendations = recommendedUsers.map(potentialFriend => {
            const mutualFriends = potentialFriend.friends.filter(friendId =>
                userFriendsIds.has(friendId.toString())
            );

            return mutualFriends.length > 0 ? {
                userId: potentialFriend._id,
                username: potentialFriend.username, 
                mutualFriendsCount: mutualFriends.length
            } : null;
        }).filter(Boolean); 

        recommendations.sort((a, b) => b.mutualFriendsCount - a.mutualFriendsCount);

        return res.send({recommendations});
    } catch (error) {
        console.error('Error fetching recommended users:', error);
        throw error;
    }
}
