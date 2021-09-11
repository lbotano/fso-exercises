import express from 'express';
import bodyParser from 'body-parser';

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

interface ExerciseModel {
  daily_exercises: Array<number>;
  target: number;
}

const app = express();

app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({error: 'malformatted parameters'});
  }

  res.send(calculateBmi(height, weight));
});

app.post('/exercises', (req, res) => {
  console.log('request: ', req.body);
  const {daily_exercises, target} = req.body as ExerciseModel;

  if (!daily_exercises || !target) {
    res.status(400).send({error: 'parameters missing'});
  }

  if ( isNaN(target) || daily_exercises.find((el: number) => isNaN(el))) {
    res.status(400).send({error: 'malformatted parameters'});
  }

  res.send(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
