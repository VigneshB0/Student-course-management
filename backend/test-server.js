const express = require('express');
const app = express();

app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Test server is running!' });
});

app.get('/api/courses', (req, res) => {
  res.json([{ courseName: 'Test Course', duration: '3 months', fee: 1000 }]);
});

const port = 4000;
app.listen(port, () => {
  console.log(`Test server is running on port ${port}`);
});