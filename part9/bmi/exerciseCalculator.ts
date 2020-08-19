interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ParsedArgs {
  dailyHours: Array<number>;
  target: number;
}

const parseArguments = (args: Array<string>): ParsedArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  if (isNaN(target)) throw new Error('Provided values were not numbers!');

  let dailyHours: Array<number> = [];
  for (let i = 3; i < args.length; i++) {
    const dailyHour = Number(args[i]);
    if (!isNaN(dailyHour)) {
      dailyHours = [...dailyHours, dailyHour];
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  return {
    dailyHours,
    target,
  };
};

const calculateExercises = (
  dailyHours: Array<number>,
  target: number
): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((day) => day !== 0).length;
  const total = dailyHours.reduce((acc, cur) => acc + cur, 0);
  const average = total / periodLength;
  const difference = average - target;
  let rating = null;
  let ratingDescription = null;
  let success = false;
  if (difference < -0.5) {
    rating = 1;
    ratingDescription = 'Sorry but you need to do better';
  } else if (difference < 0) {
    rating = 2;
    ratingDescription = 'not too bad, but could be better';
  } else {
    rating = 3;
    ratingDescription = 'Awesome job, you met or surpassed your target';
    success = true;
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { dailyHours, target } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (e) {
  console.log('Error, something bad happened, mesage: ', e.message);
}

export default calculateExercises;
