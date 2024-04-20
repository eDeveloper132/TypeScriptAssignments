#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let pin;
let balance;
let NIC;
const ATM = async () => {
    console.log(chalk.magentaBright("|||||||||||||||| WELCOME TO OUR BANK'S ATM ||||||||||||||||||||||"));
    const answer = await inquirer.prompt([
        {
            name: "NIC",
            type: "input",
            message: chalk.whiteBright("Please enter your NIC Number here: "),
        }
    ]);
    let pic = parseInt(answer.NIC);
    if (answer.NIC.length < 14 && answer.NIC.length > 12) {
        NIC = pic;
    }
    else {
        console.log(chalk.redBright("Please enter a valid 13-digit NIC Number!"));
        await ATM();
        return;
    }
    const answer1 = await inquirer.prompt([
        {
            name: "pin",
            type: "input",
            message: chalk.whiteBright("Please enter your new PIN here: "),
        }
    ]);
    const newPin = parseInt(answer1.pin);
    if (newPin >= 100 && newPin <= 999) {
        pin = newPin;
        console.log(chalk.greenBright("Your PIN:", pin, "has been set successfully to authenticate your account!"));
    }
    else {
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
            message: chalk.cyan("Please select one of the following options (Your privacy is our first policy): "),
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
            }
            else {
                console.log(chalk.redBright("Please deposit 500 or more for the transaction."));
                await choicer();
            }
            break;
        case "WithdrawAmount":
            if (balance >= 100) {
                const Answer = await inquirer.prompt([
                    {
                        name: "amount",
                        type: "number",
                        message: chalk.whiteBright("Enter the amount you want to withdraw: "),
                    },
                ]);
                const WithdrawAmount = Answer.amount;
                if (WithdrawAmount <= balance) {
                    balance -= WithdrawAmount;
                    console.log(chalk.greenBright("Amount withdrawn successfully: ", WithdrawAmount));
                    console.log(chalk.magentaBright("Your total balance is: ", balance));
                    await choicer();
                }
                else {
                    console.log(chalk.redBright("You do not have sufficient balance for this transaction."));
                    await choicer();
                }
            }
            else {
                console.log(chalk.redBright("You have insufficient balance. The minimum balance required is 100."));
                await choicer();
            }
            break;
        case "CheckBalance":
            console.log(chalk.magentaBright("Your balance is: ", balance));
            await choicer();
            break;
        case "ManagePIN":
            const confirmation = await inquirer.prompt([
                {
                    name: "Guard",
                    type: "list",
                    choices: [{ name: "ForgetPin" }, { name: "ChangePin" }],
                },
            ]);
            switch (confirmation.Guard) {
                case "ChangePin":
                    if (pin) {
                        const Guard2 = await inquirer.prompt([
                            {
                                name: "pin",
                                type: "number",
                                message: "Enter your Previous PIN: ",
                            },
                        ]);
                        const PreviousPin = parseInt(Guard2.pin);
                        if (PreviousPin === pin) {
                            const NewPin = await inquirer.prompt([
                                {
                                    name: "NewPin",
                                    type: "number",
                                    message: "Enter your New PIN: ",
                                },
                            ]);
                            const NewPin1 = parseInt(NewPin.NewPin);
                            if (NewPin1 >= 100 && NewPin1 <= 999) {
                                pin = NewPin1;
                                console.log(chalk.greenBright("Your new PIN:", NewPin1, "has been set successfully to authenticate your account!"));
                                await choicer();
                            }
                            else {
                                console.log(chalk.redBright("Please enter a PIN between 100 and 999!"));
                                await choicer();
                                return;
                            }
                        }
                        else {
                            console.log(chalk.redBright("You entered the wrong PIN cannot matched with your previous PIN !!!"));
                            await choicer();
                            return;
                        }
                    }
                    else {
                        console.log(chalk.redBright("You entered the wrong PIN!"));
                        await choicer();
                    }
                    break;
                case "ForgetPin":
                    const Guard3 = await inquirer.prompt([
                        {
                            name: "ForgetPin",
                            type: "input",
                            message: "Enter your CNIC Number here: ",
                        },
                    ]);
                    let CNIC = parseInt(Guard3.ForgetPin);
                    if (Guard3.ForgetPin.length > 12 && Guard3.ForgetPin.length < 14) {
                        if (CNIC === NIC) {
                            console.log(chalk.greenBright("Verification successful!"));
                            const Guard4 = await inquirer.prompt([
                                {
                                    name: "pin",
                                    type: "number",
                                    message: "Enter your New PIN: ",
                                },
                            ]);
                            const NewPin = parseInt(Guard4.pin);
                            if (NewPin >= 100 && NewPin <= 999) {
                                pin = NewPin;
                                console.log(chalk.greenBright("Your new PIN:", NewPin, "has been set successfully to authenticate your account!"));
                                await choicer();
                            }
                            else {
                                console.log(chalk.redBright("Please enter a PIN between 100 and 999!"));
                                await choicer();
                                return;
                            }
                        }
                        else {
                            console.log(chalk.redBright("You entered the wrong CNIC Number!"));
                            await choicer();
                        }
                    }
                    else {
                        console.log(chalk.redBright("Please enter a valid 13-digit CNIC Number!"));
                        await choicer();
                        return;
                    }
                    break;
            }
            break;
        case "Exit":
            process.exit();
        default:
            console.log(chalk.redBright("Invalid choice"));
            await choicer();
    }
};
ATM();
export default ATM;
