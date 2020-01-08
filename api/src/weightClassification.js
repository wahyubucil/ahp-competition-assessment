module.exports = (xNumber, yNumber) => {
  let result = xNumber - yNumber;

  // Convert minus number to plus
  const minusNumber = result < 0;
  if (minusNumber) result *= -1;

  let weight;

  if (result === 0) weight = 1;
  else if (result === 1) weight = 3;
  else if (result >= 2 && result <= 3) weight = 5;
  else if (result >= 4) weight = 7;

  if (minusNumber) return 1 / weight;
  else return weight;
};
