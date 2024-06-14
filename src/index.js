const express = require('express');
const authenticateToken = require('./middleware/auth');
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/auth');
const Job = require('./models/Job');
const Post = require('./models/Post');
const Activity = require('./models/Activity');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/jobs', authenticateToken, async (req, res) => {
  const { title, description, company, location, salary } = req.body;
  try {
    const job = await Job.create({ title, description, company, location, salary });
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/jobs', authenticateToken, async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/jobs/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, company, location, salary } = req.body;
  try {
    const job = await Job.findByPk(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    job.title = title;
    job.description = description;
    job.company = company;
    job.location = location;
    job.salary = salary;
    await job.save();
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/jobs/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findByPk(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    await job.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});