import express from 'express';
import { createCommunity, getAllCommunities } from '../controllers/communityController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/community', protect, createCommunity);
router.get('/community', getAllCommunities);
export default router;
