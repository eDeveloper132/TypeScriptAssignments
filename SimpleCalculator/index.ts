#!  /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

const Calculator = async() => {
const Answers = await inquirer.prompt([
  {
    type: "number",
    name: "value1",
    message: chalk.magenta("Enter value one: "),
  },
  {
    type: "number",
    name: "value2",
    message: chalk.magenta("Enter value two: "),
  },
  {
    message: chalk.blue("Please select any one operator: "),
    type: "list",
    name: "operator",
    choices: [
      { name: "Add" },
      { name: "Subtract" },
      { name: "Multiply" },
      { name: "Divide" },
      { name: "Exit" }
    ],
  },
]);

const operator = Answers.operator;
// console.log(operator);

const value1 = Answers.value1;
const value2 = Answers.value2;

switch (operator) {
  case "Add":
    console.log(value1 + value2);
    await Calculator();
    break;
  case "Subtract":
    console.log(value1 - value2);
    await Calculator();
    break;
  case "Multiply":
    console.log(value1 * value2);
    await Calculator();
    break;
  case "Divide":
    console.log(value1 / value2);
    await Calculator();
    break;
    case "Exit":
      console.log(process.exit(0));
      break;
  default:
    console.log("You selected a wrong operator");
    await Calculator();
    break;
}
}
await Calculator();
export default Calculator;