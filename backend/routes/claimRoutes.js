import express from 'express';
import {
  createClaim,
  getItemClaims,
  getMyClaims,
  updateClaimStatus,
  deleteClaim
} from '../controllers/claimController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createClaim);

router.get('/my', protect, getMyClaims);
router.get('/item/:itemId', protect, getItemClaims);

router.route('/:id')
  .put(protect, updateClaimStatus)
  .delete(protect, deleteClaim);

export default router;
