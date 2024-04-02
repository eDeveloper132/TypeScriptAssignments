#!  /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const usd = 277.82;
const usdt = 0.045;
const eur = 298.41;
const euroc = 300.5;
const usdd = 344.33;
const usdc = 0.5;
const jpy = 1.83;
const usde = 0.75;
const usdp = 0.01;
const gbp = 341.74;
const fetchData = async () => {
    try {
        const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`);
        const json = await response.json();
        return json;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
const convertCurrency = async (selectedCurrency, value) => {
    switch (selectedCurrency) {
        case "usd":
            console.log(usd / value, "USD");
            var answer = await inquirer.prompt([
                {
                    name: "answer",
                    type: "confirm",
                    message: "Do you want to exit?",
                },
            ]);
            if (answer.answer == true) {
                console.log("Thank you for using our service");
                console.log("app is terminating");
                console.log("goodbye");
                process.exit(0);
            }
            break;
        case "usdt":
            console.log(usdt / value, "USDT");
            var answer = await inquirer.prompt([
                {
                    name: "answer",
                    type: "confirm",
                    message: "Do you want to exit?",
                },
            ]);
            if (answer.answer == true) {
                console.log("Thank you for using our service");
                console.log("app is terminating");
                console.log("goodbye");
                process.exit(0);
            }
            break;
        case "eur":
            console.log(eur / value, "EUR");
            var answer = await inquirer.prompt([
                {
                    name: "answer",
                    type: "confirm",
                    message: "Do you want to exit?",
                },
            ]);
            if (answer.answer == true) {
                console.log("Thank you for using our service");
                console.log("app is terminating");
                console.log("goodbye");
                process.exit(0);
            }
            break;
        case "euroc":
            console.log(euroc / value, "EUROC");
            var answer = await inquirer.prompt([
                {
                    name: "answer",
                    type: "confirm",
                    message: "Do you want to exit?",
                },
            ]);
            if (answer.answer == true) {
                console.log("Thank you for using our service");
                console.log("app is terminating");
                console.log("goodbye");
                process.exit(0);
            }
            break;
        case "usdd":
            console.log(usdd / value, "USDD");
            var answer = await inquirer.prompt([
                {
                    name: "answer",
                    type: "confirm",
                    message: "Do you want to exit?",
                },
            ]);
            if (answer.answer == true) {
                console.log("Thank you for using our service");
                console.log("app is terminating");
                console.log("goodbye");
                process.exit(0);
            }
            break;
        case "usdc":
            console.log(usdc / value, "USDC");
            var answer = await inquirer.prompt([
                {
                    name: "answer",
                    type: "confirm",
                    message: "Do you want to exit?",
                },
            ]);
            if (answer.answer == true) {
                console.log("Thank you for using our service");
                console.log("app is terminating");
                console.log("goodbye");
                process.exit(0);
            }
            break;
        case "jpy":
            console.log(jpy / value, "JPY");
            var answer = await inquirer.prompt([
                {
                    name: "answer",
                    type: "confirm",
                    message: "Do you want to exit?",
                },
            ]);
            if (answer.answer == true) {
                console.log("Thank you for using our service");
                console.log("app is terminating");
                console.log("goodbye");
                process.exit(0);
            }
            break;
        case "usde":
            console.log(usde / value, "USDE");
            var answer = await inquirer.prompt([
                {
                    name: "answer",
                    type: "confirm",
                    message: "Do you want to exit?",
                },
            ]);
            if (answer.answer == true) {
                console.log("Thank you for using our service");
                console.log("app is terminating");
                console.log("goodbye");
                process.exit(0);
            }
            break;
        case "usdp":
            console.log(usdp / value, "USDP");
            var answer = await inquirer.prompt([
                {
                    name: "answer",
                    type: "confirm",
                    message: "Do you want to exit?",
                },
            ]);
            if (answer.answer == true) {
                console.log("Thank you for using our service");
                console.log("app is terminating");
                console.log("goodbye");
                process.exit(0);
            }
            break;
        case "gbp":
            console.log(gbp / value, "GBP");
            var answer = await inquirer.prompt([
                {
                    name: "answer",
                    type: "confirm",
                    message: "Do you want to exit?",
                },
            ]);
            if (answer.answer == true) {
                console.log("Thank you for using our service");
                console.log("app is terminating");
                console.log("goodbye");
                process.exit(0);
            }
            break;
        default:
            console.log("Currency not supported.");
            var answer = await inquirer.prompt([
                {
                    name: "answer",
                    type: "confirm",
                    message: "Do you want to exit?",
                },
            ]);
            if (answer.answer == true) {
                console.log("Thank you for using our service");
                console.log("app is terminating");
                console.log("goodbye");
                process.exit(0);
            }
            break;
    }
};
const Convertor = async () => {
    console.log(chalk.blueBright("|||||||||||||||||||||||||||||| WELCOME TO OUR CURRENCY CONVERTER PAGE ||||||||||||||||||||||||||||||"));
    const json = await fetchData();
    if (!json)
        return;
    const currencies = Object.keys(json).filter((currency) => currency.startsWith("usd") ||
        currency.startsWith("eur") ||
        currency.startsWith("gbp") ||
        currency.startsWith("jpy"));
    const Selector = await inquirer.prompt([
        {
            name: "currency",
            type: "list",
            message: "Select the currency you want to convert:",
            choices: currencies,
        },
    ]);
    const selectedCurrency = Selector.currency;
    if (currencies.includes(selectedCurrency)) {
        console.log(chalk.greenBright(`Selected currency "${selectedCurrency}" is valid.`));
        const amount = await inquirer.prompt([
            {
                name: "amount",
                type: Number,
                message: "Enter the number of amount you want to convert: ",
            },
        ]);
        const value = amount.amount;
        await convertCurrency(selectedCurrency, value);
        console.log(chalk.greenBright("Thanks for using our app"));
        await Convertor();
    }
    else {
        console.log(chalk.redBright(`Selected currency "${selectedCurrency}" is not valid.`));
    }
};
Convertor();
export default Convertor;
