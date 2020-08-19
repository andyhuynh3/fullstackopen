const calculateBMI = (weight: number, height: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return 'Low (underweight)';
  }
  if (bmi < 25) {
    return 'Normal (healthy weight)';
  }
  return 'Obese (overweight)';
};

interface ParsedArgs {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): ParsedArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  }
  throw new Error('Provided values were not numbers!');
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBMI(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, mesage: ', e.message);
}

export default calculateBMI;
