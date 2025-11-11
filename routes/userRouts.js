import express from 'express';
const router = express.Router();
import { register,login, getAllUsers, verifyToken } from '../controllers/userController.js';

import {authenticateToken} from '../middleware/authenticateToken.js';
import {authorizeRoles} from '../middleware/roleMiddleware.js';
router.get("/",(request, response) => {
  response.send('user Routes');
})
router.post("/register",register);
router.post("/login", login);


router.post('/verify-token',authenticateToken, verifyToken);


router.get("/get-all-users",authenticateToken, authorizeRoles('admin','author'),  getAllUsers );
router.get("/update",authorizeRoles('author'), (req, res) => {
  res.send("Profile updated Successfully.")
})
// rectricted
router.post('/create', register);
router.put("/update", (req, res) => {

  // 
  res.send("Profile updated Successfully.")
})

export default router;