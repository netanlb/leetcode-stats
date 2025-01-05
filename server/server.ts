import express from 'express';
import cors from 'cors';
import path from 'path';
import leetcodeRoutes from './routes/leetcode.route';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const angularAppPath = path.join(__dirname, 'public/leet-code-stats');
app.use(express.static(angularAppPath));

app.use('/api/leetcode', leetcodeRoutes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(angularAppPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
