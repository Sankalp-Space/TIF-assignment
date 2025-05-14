import express from 'express';
import { addMember, removeMember } from '../controllers/memberController.js';
const router = express.Router();

router.post('/member', addMember);
router.delete('/member/:id', removeMember);
export default router;
