import express from 'express';

import patientService from '../services/patientService';

const route = express.Router();

route.get('/', (_req, res) => {
  console.log('patients requested');
  res.send(patientService.getNonSensitiveEntries());
});

export default route;
