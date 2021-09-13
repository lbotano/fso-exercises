import express from 'express';

import diagnoseService from '../services/diagnoseService';

const route = express.Router();

route.get('/', (_req, res) => {
  console.log('diagnoses requested');
  res.send(diagnoseService.getEntries());
});

export default route;
