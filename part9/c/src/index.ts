import express from 'express';
import cors from 'cors';

import patientsRoute from './routes/patients';
import diagnosesRoute from './routes/diagnoses';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.use('/api/patients', patientsRoute);

app.use('/api/diagnoses', diagnosesRoute);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
