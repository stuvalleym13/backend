import express from 'express';
const router = express.Router();
import { create,getAllposts } from '../controllers/blogController.js';
import {authenticateToken} from '../middleware/authenticateToken.js';

router.post("/create",authenticateToken,   create);
router.get("/posts", getAllposts)
export default router;