#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let pin: number | null = null;
let balance: number = 0;

const ATM = async () => {
  console.log(
    chalk.magentaBright(
      "|||||||||||||||| WELCOME TO OUR BANK'S ATM ||||||||||||||||||||||"
    )
  );

  const answer = await inquirer.prompt([
    {
      name: "pin",
      type: Number,
      message: chalk.whiteBright("Please enter your new PIN here: "),
    },
  ]);
  const newPin = parseInt(answer.pin);
  if (newPin >= 100 && newPin <= 999) {
    pin = newPin;
    console.log(chalk.greenBright("Your PIN:",pin,"has been set successfully for authenticate your account!"));
  } else {
    console.log(chalk.redBright("Please enter a PIN between 100 and 999!"));
    await ATM();
    return;
  }

  await choicer();
};

const choicer = async () => {
  const choice = await inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: chalk.cyan(
        "Please select one of the following options (Your privacy is our first policy): "
      ),
      choices: [
        { name: "DepositAmount" },
        { name: "WithdrawAmount" },
        { name: "CheckBalance" },
        { name: "ManagePIN" },
        { name: "Exit" },
      ],
    },
  ]);

  switch (choice.action) {
    case "DepositAmount":
      const currencyAnswer = await inquirer.prompt([
        {
          name: "amount",
          type: "number",
          message: "Enter the amount you want to deposit: ",
        },
      ]);
      const depositAmount = currencyAnswer.amount;
      if (depositAmount >= 500) {
        balance += depositAmount;
        console.log(chalk.greenBright("Amount deposited successfully: ", depositAmount));
        console.log(chalk.magentaBright("Your total balance is: ", balance));
        await choicer();
      } else {
        console.log(
          chalk.redBright("Please deposit 500 or more for the transaction.")
        );
        await choicer();
      }
      break;
    case "WithdrawAmount":
        if (balance >= 100) {
            const Answer = await inquirer.prompt
            (
                [
                    {
                        name: "amount",
                        type: Number,
                        message: chalk.whiteBright("Write the amount that you want to withdraw: ")
                    }
                ]
            )
            const WithdrawAmount = Answer.amount;
            if (WithdrawAmount <= balance) {
                balance -= WithdrawAmount;
                console.log(chalk.greenBright("Amount withdrawn successfully: ", WithdrawAmount));
                console.log(chalk.magentaBright("Your total balance is: ", balance));
                await choicer();
            }
            else if (WithdrawAmount >= balance)
            {
                console.log(chalk.redBright("Your balance is",balance,"You are not able to withdraw greater than balance"));
                choicer();
            }
        } else {
            console.log(chalk.redBright("You have insufficient balance for withdrawn the required is minimum 100",balance));
            await choicer();
        }
      break;
    case "CheckBalance":
      console.log(chalk.magentaBright("Your balance is: ", balance));
      choicer();
      break;
    case "ManagePIN":
        const confirmation = await inquirer.prompt
        (
            [
                {
                    name: "Guard",
                    type: Number,
                    message: "Enter Your Previous PIN: "
                }
            ]
        )
        const Guard = parseInt(confirmation.Guard);
        if (Guard == pin) {
            const newpin = await inquirer.prompt
            (
                [
                    {
                        name: "pin",
                        type: Number,
                        message: "Enter your New PIN: "
                    }
                ]
            )
            const newedpin = parseInt(newpin.pin);
            pin = newedpin
            console.log(chalk.greenBright("Your new PIN:",newedpin,"has been set successfully for authenticate your account!"));
            choicer();
        }
        else
        {
            console.log(chalk.redBright("You entered worng PIN !!!"));
            choicer();
        }
      break;
    case "Exit":
      process.exit(0);
    default:
      console.log(chalk.redBright("Invalid choice"));
      choicer();
  }
};

ATM();
export default ATM;