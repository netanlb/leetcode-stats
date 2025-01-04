import express from 'express';
import cors from 'cors';
import leetcodeRoutes from './routes/leetcode.route';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/leetcode', leetcodeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


