import express from 'express';
import { createCommunity, getAllCommunities, getAllMembers, getMyOwnedCommunity, getMyJoinedCommunity } from '../controllers/communityController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/', protect, createCommunity);
router.get('/', getAllCommunities);
router.get('/:id/members', getAllMembers);
router.get('/me/owner', protect, getMyOwnedCommunity);
router.get('/me/member', protect, getMyJoinedCommunity);
export default router;
