const input = '254032-789860';

const increaseDigits = pwd => {
  let pwdStr = pwd.toString();
  let lastNumber = Number(pwdStr[0]);

  for (const number of pwdStr) {
    if (lastNumber > Number(number)) {
      return false;
    } else {
      lastNumber = Number(number);
    }
  }

  return true;
};

const gotSameTwoAdjacent = pwd => {
  let pwdStr = pwd.toString();
  let lastNumber = '';

  for (const number of pwdStr) {
    if (lastNumber === '') {
      lastNumber = number;
    } else if (lastNumber === number) {
      return true;
    } else {
      lastNumber = number;
    }
  }

  return false;
};

const isValidPassword = (pwd, minRange, maxRange, isPart2 = false) => {
  if (
    pwd.toString().length === 6 &&
    pwd >= minRange &&
    pwd <= maxRange &&
    (isPart2 ? gotOnlySameTwoAdjacents(pwd) : gotSameTwoAdjacent(pwd)) &&
    increaseDigits(pwd)
  ) {
    return true;
  } else {
    return false;
  }
};

const calcDifferentPasswords = (range, isPart2 = false) => {
  const arrayRange = range.split('-');
  const minRange = Number(arrayRange[0]);
  const maxRange = Number(arrayRange[1]);
  let acc = 0;

  for (let pwd = minRange; pwd <= maxRange; pwd++) {
    if (isValidPassword(pwd, minRange, maxRange, isPart2)) {
      acc++;
    }
  }

  return acc;
};

//part2
const gotOnlySameTwoAdjacents = pwd => {
  let pwdStr = pwd.toString();
  let lastNumber = '';
  let acc = 1;
  let result = false;

  for (const number of pwdStr) {
    if (lastNumber === '') {
      lastNumber = number;
    } else if (acc === 2 && lastNumber !== number) {
      return true;
    } else if (lastNumber === number) {
      acc++;
    } else {
      lastNumber = number;
      acc = 1;
    }
  }

  if (acc === 2) {
    return true;
  } else {
    return false;
  }
};

console.time('Time part2:');
console.log(calcDifferentPasswords(input));
console.timeEnd('Time part2:');
console.time('Time part2:');
console.log(calcDifferentPasswords(input, true));
console.timeEnd('Time part2:');
