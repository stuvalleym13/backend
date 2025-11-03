import express from 'express';
const app = express();
const PORT = 3002;
import { connectDB } from './config/db.js';
connectDB();
app.use(express.json());
app.get('/health', (request, response) => {
  response.send('Server running successfull...!');
})

import userRoutes from './routes/userRouts.js';
import blogRoutes from './routes/blogRouts.js';


app.use("/user", userRoutes);
app.use("/blog", blogRoutes);



app.listen(PORT, () => console.log(`Server Running on port :${PORT}`));