#!  /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";

let randomNumberr: number[] = [];
let userAnswerr: number[] = [];

const game = async () => {
    const randomNumber = Math.floor(Math.random() * 10 + 1);
    const userAnswer = await inquirer.prompt([
        {
            name: "userGuess",
            type: "input",
            message: "Enter Your Guessed Number (1-10): "
        }]);
        
    const guess = parseInt(userAnswer.userGuess);
    userAnswerr.push(guess);
    randomNumberr.push(randomNumber);

    if (guess === randomNumber) {
        console.log(chalk.whiteBright("CONGRATULATIONS!!! YOU GOT IT RIGHT!!!"));
    } else {
        console.log(chalk.red("AWW!!! YOU GOT IT WRONG!!!"));
        console.log(`The number was ${randomNumber}`);
        console.log(chalk.green("!!!THE GAME IS RESTARTING FROM THE BEGINNING!!!"));
        randomNumberr = [];
        userAnswerr = [];
        await game();
    }
}

await game();
export default game;
