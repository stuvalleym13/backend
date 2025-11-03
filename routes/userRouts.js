import express from 'express';
const router = express.Router();
import { register,login } from '../controllers/userController.js';
router.get("/",(request, response) => {
  response.send('user Routes');
})
router.post("/register",register);
router.get("/login", login);
router.get("/update", (req, res) => {
  res.send("Profile updated Successfully.")
})
// rectricted
router.post('/create', register);
router.put("/update", (req, res) => {
  res.send("Profile updated Successfully.")
})

export default router;