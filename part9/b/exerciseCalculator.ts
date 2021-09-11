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

const calculateExercises = (days: number[], target: number): Inform => {
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
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
