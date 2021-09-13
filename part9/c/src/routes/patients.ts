import express from 'express';

import patientService from '../services/patientService';
import {toNewPatientEntry} from '../utils';

const route = express.Router();

route.get('/', (_req, res) => {
  console.log('patients requested');
  res.send(patientService.getNonSensitiveEntries());
});

route.post('/', (req, res) => {
  console.log('adding patient');
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    patientService.createPatient(newPatientEntry);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

export default route;
