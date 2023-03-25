export const capitalizeWord = (str: string) =>
  str
    .toLowerCase()
    .replace(/\w{1,}/g, (match) => match.replace(/\w/, (m) => m.toUpperCase()));

export const padWithZeros = (number: number, numDigits: number): string => {
  let paddedNumber = number.toString();
  while (paddedNumber.length < numDigits) {
    paddedNumber = "0" + paddedNumber;
  }
  return paddedNumber;
};
