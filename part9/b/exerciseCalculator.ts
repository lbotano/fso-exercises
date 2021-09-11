type Rating = 1 | 2 | 3;
interface Inform {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}
interface ExercisesInput {
  days: Array<number>;
  target: number;
}

const parseArguments = (args: Array<string>): ExercisesInput => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const days: Array<number> = [];
  
  for (let i = 3; i < args.length; i++) {
    const day = Number(args[i]);
    if (isNaN(day)) {
      throw new Error('Values must be numbers');
    }
    days.push(day);
  }
  if (isNaN(target)) {
    throw new Error('Values must be numbers');
  }

  return {
    days,
    target
  };
};

const calculateExercises = (days: Array<number>, target: number): Inform => {
  const average = days.reduce((totalHours, day) => totalHours + day, 0) / days.length;
  let rating: Rating = 3;
  let ratingDescription = 'Very good';
  if (average < target + 5) {
    rating = 2;
    ratingDescription = 'Regular';
  }
  if (average < target - 5) {
    rating = 1;
    ratingDescription = 'Need to improve';
  }

  return {
    periodLength: days.length,
    trainingDays: days.reduce((days, day) => day > 0 ? days + 1 : days, 0),
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const {days, target} = parseArguments(process.argv);
  console.log(calculateExercises(days, target));
} catch (error) {
  if (error instanceof Error) {
    console.error('Error: ' + error.message);
  }
}

export default calculateExercises;
