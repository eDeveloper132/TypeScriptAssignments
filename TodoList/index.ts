#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const ToDosaver : String[] = [];
const ToDo = async() =>
{
    const Answer = await inquirer.prompt
    (
        [
            {
                name: "value",
                type: String,
                message: chalk.magenta("Enter Your Task: ")
            },
            {
                name: "conformation",
                type: "list",
                message: chalk.magenta("Do You Want To add one more or continue? "),
                choices: 
                [
                    {name: "Yes"},
                    {name: "No"}
                ]
            }
        ]
    )
        ToDosaver.push(Answer.value);
        console.log(chalk.greenBright("Inserted Tasks: ",ToDosaver," "));
        switch (Answer.conformation) {
            case "Yes":
                ToDo();
            break;
            case "No":
                for (let i = 0; i < ToDosaver.length; i++)
                {
                console.log(chalk.green("You Added this Task:",ToDosaver[i],"at",Date()));
                }
            break;
        }
}
await ToDo();
export default ToDo;