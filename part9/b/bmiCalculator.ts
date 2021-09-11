interface BmiArguments {
  height: number;
  weight: number;
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 18.5) {
    return 'Underweight (unhealthy weight)';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30) {
    return 'Overweight (unhealthy weight)';
  }
  return 'Obese (unhealthy weight)';
};

const parseArguments = (args: Array<string>): BmiArguments => {
  if (args.length < 4) {
    throw new Error('Not enough arguments');
  }
  if (args.length > 4) {
    throw new Error('Too many arguments');
  }

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Values must be numbers');
  }

  return {
    height,
    weight
  };
};

try {
  const {height, weight} = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  if (error instanceof Error) {
    console.error('Error: ' + error.message);
  }
}

export default calculateBmi;
