import express from 'express';
import { searchDonors, getDonor, updateAvailability } from '../controllers/donorController.js';

const router = express.Router();

// Search donors with filters
router.get('/search', searchDonors);

// Get donor by ID
router.get('/:id', getDonor);

// Update donor availability
router.patch('/:id/availability', updateAvailability);

export default router; 