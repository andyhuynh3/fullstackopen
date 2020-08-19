import express from 'express';
import calculateBMI from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { query } = req;
  const weight = Number(query.weight);
  const height = Number(query.height);
  if (!weight || !height) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  return res.json({
    weight,
    height,
    bmi: calculateBMI(weight, height),
  });
});

app.post('/exercises', (req, res) => {
  const { body } = req;
  let { dailyExercises, target } = body;
  if (!dailyExercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  if (!Array.isArray(dailyExercises)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  dailyExercises = dailyExercises.map((hours: any) => Number(hours));
  const dailyExercisesHasNaN = dailyExercises.some((hours: any) =>
    isNaN(hours)
  );

  target = Number(target);
  if (isNaN(target) || dailyExercisesHasNaN) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  return res.json(calculateExercises(dailyExercises, target));
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
