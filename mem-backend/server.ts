import express from 'express';
import powerHandler from './api/power/index.js';
import alarmsHandler from './api/alarms/index.js';

const app = express();
const PORT = 3001;

app.get('/api/power', (req, res) => powerHandler(req, res));
app.get('/api/alarms', (req, res) => alarmsHandler(req, res));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});