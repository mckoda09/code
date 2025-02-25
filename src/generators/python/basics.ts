import { randomItem } from "../../utils";

const operands = ["+", "-", "*", "/", "**", "%", "//"];
const letters = "abcdefghijklmnopqrstuvwxyz".split("");
const digits = "0123456789".split("");

export default () => {
  const random = Math.random();
  if (random < 0.25) {
    return [
      randomItem(letters),
      "=",
      randomItem([...letters, ...digits]),
      randomItem(operands),
      randomItem([...letters, ...digits]),
    ].join(" ");
  } else if (random < 0.5) {
    return [
      randomItem([...letters, ...digits]),
      randomItem(operands),
      randomItem([...letters, ...digits]),
    ].join(" ");
  } else if (random < 0.75) {
    return `print(${randomItem([...letters, ...digits])})`;
  } else {
    return `${randomItem(letters)} = input()`;
  }
};
