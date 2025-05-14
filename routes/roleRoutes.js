import express from 'express';
import { createRole, getAllRoles } from '../controllers/roleController.js';
const router = express.Router();

router.post('/', createRole); // Create a role
router.get('/', getAllRoles); // Get all roles

export default router;
