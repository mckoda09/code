import { digits, letters, randomItem } from "../../utils";

const operators = ["<", ">", "=="];

export default () => {
  const random = Math.random();
  if (random < 0.25) {
    return `for ${randomItem(letters)} in range(${randomItem(digits)}):`;
  } else if (random < 0.5) {
    return `for ${randomItem(letters)} in ${randomItem(letters)}:`;
  } else if (random < 0.9) {
    return `while ${randomItem(letters)} ${randomItem(operators)} ${randomItem([
      ...letters,
      ...digits,
    ])}:`;
  } else {
    const letter = randomItem(letters);
    return `${letter} for ${letter} in ${randomItem([
      ...letters,
      `range(${randomItem(digits)})`,
    ])}`;
  }
};
