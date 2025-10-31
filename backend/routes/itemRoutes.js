import express from 'express';
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getMyItems
} from '../controllers/itemController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getItems)
  .post(protect, createItem);

router.get('/my/posts', protect, getMyItems);

router.route('/:id')
  .get(getItem)
  .put(protect, updateItem)
  .delete(protect, deleteItem);

export default router;
