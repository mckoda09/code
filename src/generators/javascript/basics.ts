import { randomItem } from "../../utils";

const operands = ["+", "-", "*", "/", "**", "%"];
const letters = "abcdefghijklmnopqrstuvwxyz".split("");
const digits = "0123456789".split("");
const varKeywords = ["let", "const"];

export default () => {
  const random = Math.random();
  if (random < 0.25) {
    return `${randomItem(varKeywords)} ${randomItem(letters)} = ${randomItem([
      ...letters,
      ...digits,
    ])}`;
  } else if (random < 0.5) {
    return `${randomItem(letters)} = ${randomItem([
      ...letters,
      ...digits,
    ])} ${randomItem(operands)} ${randomItem([...letters, ...digits])}`;
  } else if (random < 0.75) {
    return `() => ${randomItem([...letters, ...digits])} ${randomItem(
      operands
    )} ${randomItem([...letters, ...digits])}`;
  } else {
    return `console.log(${randomItem([...letters, ...digits])})`;
  }
};
