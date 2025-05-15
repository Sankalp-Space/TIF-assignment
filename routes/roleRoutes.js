import express from 'express';
import { createRole, getAllRoles } from '../controllers/roleController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/', protect, createRole);
router.get('/', getAllRoles);
export default router;