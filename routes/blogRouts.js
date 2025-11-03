import express from 'express';
const router = express.Router();
import { create } from '../controllers/blogController.js';


router.post("/create",create);

export default router;