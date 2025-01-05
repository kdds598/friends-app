
import express from 'express';
import { signup, loginUser, searchUsers, sendFriendRequest, unfriendUser } from '../Controllers/User.controller.js';
import { authMiddleware } from '../Middlewares/auth.middleware.js';
import { acceptFriendRequest,rejectFriendRequest } from '../Controllers/friendReq.controller.js';
import { getFriends, getrecievedFrReq, getSelfData, getsentfriendreq } from '../Controllers/self.controller.js';
import { fetchInitialUsers } from '../Controllers/fetchuser.controller.js';
import { getRecommendedUsers } from '../Controllers/recommendation.controller.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', loginUser);
router.post('/friend-request', authMiddleware, sendFriendRequest);

router.get('/search', authMiddleware, searchUsers);

router.post('/accept-friend-request',authMiddleware, acceptFriendRequest);

router.post('/reject-friend-request',authMiddleware, rejectFriendRequest);

router.get('/me',authMiddleware,getSelfData);
router.get('/me/getfriends',authMiddleware,getFriends);
router.get('/me/sentfrreq',authMiddleware,getsentfriendreq);
router.get('/me/recievedfrreq',authMiddleware,getrecievedFrReq);


router.get('/getRecommendation',authMiddleware,getRecommendedUsers);
router.post('/unfriend',authMiddleware,unfriendUser);




router.get('/users', authMiddleware, fetchInitialUsers);


export default router;
