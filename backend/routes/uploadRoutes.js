import express from 'express';
import { uploadImage, deleteImage } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, uploadImage);
router.delete('/:publicId', protect, deleteImage);

export default router;
