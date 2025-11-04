import express from 'express';
const router = express.Router();
import { create,getAllposts } from '../controllers/blogController.js';


router.post("/create",create);
router.get("/posts", getAllposts)
export default router;