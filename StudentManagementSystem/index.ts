#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class Student {
    public id: number;
    public name: string;
    public age: number;
    public gender: string;
    public course: string;
    public constructor(id: number, name: string, age: number, gender: string , course: string) {
        if (name == "" || gender == "") {
            throw new Error(chalk.redBright("Name should not be empty! Gender should be male or female!"));
        }
        else {
            this.id = id;
            this.name = name;
            this.age = age;
            this.gender = gender;
            this.course = course;
            students.push(this);
            console.log(chalk.greenBright("Inserted Student Details: " , "Id is:" , chalk.yellow(this.id) , "His/Her Name is:" , chalk.yellow(this.name) , "His/Her Age is:" , chalk.yellow(this.age) , "Gender is:" , chalk.yellow(this.gender) , "Enrolled Course is:" , chalk.yellow(this.course) , "Level"));
            console.log(chalk.greenBright("Total number of students in whole school:", chalk.yellow(students.length)));
            for (let i = 0; i < students.length; i++) {
                console.log(students[i]);
            }
            console.log("Returning to main menu...");
            AddStudent();
        }
    }
}

let nextId = 10000;
let students : Student[] = [];
const generateUniqueId = () =>
{
    return nextId++;
}
const confirmator = async() =>
{
    const confirm = await inquirer.prompt(
        {
            name: "confirm",
            type: "list",
            message: "Do you want to add student?",
            choices: ["Yes" , "No" , "Update" , "Delete"]
        }
    );
    if (confirm.confirm == "No") {
        console.log(chalk.blueBright("Thank you for using our service"));
        console.log(chalk.blueBright("app is terminating ........."));
        console.log(chalk.blueBright("Terminated successfully"));
        console.log(chalk.blueBright("GoodBye !!!"));
        process.exit(0);
    } else if(confirm.confirm == "Update") {
        await updater();
    } else if(confirm.confirm == "Delete") {
        await DeleteStudent();
    }
}
const DeleteStudent = async () => {
    const confirme = await inquirer.prompt({
        name: "confirm",
        type: "confirm",
        message: "Do you want to delete student details?",
    });

    if (!confirme.confirm) {
        await AddStudent();
        return;
    }

    const choices = students.map(student => ({ name: student.name, value: student.id }));
    const selectedStudentId = await inquirer.prompt({
        name: "studentId",
        type: "list",
        message: "Select the student you want to delete:",
        choices: choices
    });

    const selectedIndex = students.findIndex(student => student.id === selectedStudentId.studentId);
    if (selectedIndex === -1) {
        console.log(chalk.redBright("Student not found!"));
        return;
    }

    const deletedStudent = students.splice(selectedIndex, 1);
    console.log(chalk.greenBright("Student deleted successfully:"));
    console.log("Deleted student is:" , deletedStudent[0]);
    console.log("Total number of students in whole school:", chalk.yellow(students.length));
    console.log("Returning to main menu...");

    AddStudent();
};

const updater = async () => {
    const confirme = await inquirer.prompt({
        name: "confirm",
        type: "confirm",
        message: "Do you want to update student details?",
    });

    if (!confirme.confirm) {
        await AddStudent();
        return;
    }

    const choices = students.map(student => student.name);
    const selectedStudentName = await inquirer.prompt({
        name: "student",
        type: "list",
        message: "Select the student you want to update:",
        choices: choices
    });

    const selectedStudent = students.find(student => student.name === selectedStudentName.student);
    if (!selectedStudent) {
        console.log(chalk.redBright("Student not found!"));
        return;
    }
    const updateDetailPrompt = await inquirer.prompt({
        name: "update",
        type: "list",
        message: "Select which detail you want to update:",
        choices: ["Name", "Age", "Gender", "Course"]
    });

    let newValue;
    let age = selectedStudent.age;
    switch (updateDetailPrompt.update) {
        case "Name":
            newValue = await inquirer.prompt({
                name: "value",
                type: "input",
                message: "Enter the new name: "
            });
            selectedStudent.name = newValue.value;
            break;
        case "Age":
            newValue = await inquirer.prompt({
                name: "value",
                type: "number",
                message: "Enter the new age: "
            });
            selectedStudent.age = newValue.value;
            break;
        case "Gender":
            newValue = await inquirer.prompt({
                name: "value",
                type: "list",
                message: "Select the new gender:",
                choices: ["male", "female"]
            });
            selectedStudent.gender = newValue.value;
            break;
        case "Course":
            newValue = await inquirer.prompt({
                name: "value",
                type: "list",
                message: "Select the new course:",
                choices: ["Montessori", "Nursery", "LKG", "UKG", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "Master", "Graduation", "Post Graduation"]
            });
            switch (newValue.value)
            {
                case "Montessori":
                    if (age >= 3 || age <= 4) {
                        console.log(chalk.greenBright("Congratulations!!! You are able to select Montessori level"));
                    }
                    else {
                        console.log(chalk.redBright("The student is not able to join our school"));
                        AddStudent();
                    }
                    break;
                case "Nursery":
                    if (age >= 3 || age <= 5) {
                        console.log(chalk.greenBright("Congratulations!!! You are able to select Nursery level"));
                    }
                    else {
                        console.log(chalk.redBright("The student is not able to select Nursery Level please select another level who suits you"));
                        AddStudent();
                    }
                    break;
                case "LKG":
                    if (age >= 5 || age <= 6) {
                        console.log(chalk.greenBright("Congratulations!!! You are able to select LKG level"));
                    }
                    else {
                        console.log(chalk.redBright("The student is not able to select LKG Level please select another level who suits you"));
                        AddStudent();
                    }
                    break;
                case "UKG":
                    if (age >= 6 || age <= 7) {
                        console.log(chalk.greenBright("Congratulations!!! You are able to select UKG level"));
                    }
                    else {
                        console.log(chalk.redBright("The student is not able to select UKG Level please select another level who suits you"));
                        AddStudent();
                    }
                    break;
                case "I":
                    if (age >= 7 || age <= 9) {
                        console.log(chalk.greenBright("Congratulations!!! You are able to select I level"));
                    }
                    else {
                        console.log(chalk.redBright("The student is not able to select I Level please select another level who suits you"));
                        AddStudent();
                    }
                    break;
                case "II":
                    if (age >= 9 || age <= 10) {
                        console.log(chalk.greenBright("Congratulations!!! You are able to select II level"));
                    }
                    else {
                        console.log(chalk.redBright("The student is not able to select II Level please select another level who suits you"));
                        AddStudent();
                    }
                    break;
                case "III":
                    if (age >= 10 || age <= 11) {
                        console.log(chalk.greenBright("Congratulations!!! You are able to select III level"));
                    }
                    else {
                        console.log(chalk.redBright("The student is not able to select III Level please select another level who suits you"));
                        AddStudent();
                    }
                    break;
                case "IV":
                    if (age >= 11 || age <= 12) {
                        console.log(chalk.greenBright("Congratulations!!! You are able to select IV level"));
                    }
                    else {
                        console.log(chalk.redBright("The student is not able to select IV Level please select another level who suits you"));
                        AddStudent();
                    }
                    break;
                case "V":
                    if (age >= 12 || age <= 13) {
                        console.log(chalk.greenBright("Congratulations!!! You are able to select V level"));
                    }
                    else {
                        console.log(chalk.redBright("The student is not able to select V Level please select another level who suits you"));
                        AddStudent();
                    }
                    break;
                case "VI":
                    if (age >= 13 || age <= 14) {
                        console.log(chalk.greenBright("Congratulations!!! You are able to select VI level"));
                    }
                    else {
                        console.log(chalk.redBright("The student is not able to select VI Level please select another level who suits you"));
                        AddStudent();
                    }
                    break;
                case "VII":
                    if (age >= 14 || age <= 15) {
                        console.log(chalk.greenBright("Congratulations!!! You are able to select VII level"));
                    }
                    else {
                        console.log(chalk.redBright("The student is not able to select VII Level please select another level who suits you"));
                        AddStudent();
                    }
                    break;
                case "VIII":
                    if (age >= 15 || age <= 16) {
                        console.log(chalk.greenBright("Congratulations!!! You are able to select VIII level"));
                    }
                    else {
                        console.log(chalk.redBright("The student is not able to select VIII Level please select another level who suits you"));
                        AddStudent();
                    }
                    break;
                case "IX":
                    if (age >= 16 || age <= 17) {
                        console.log(chalk.greenBright("Congratulations!!! You are able to select IX level"));
                    }
                    else {
                        console.log(chalk.redBright("The student is not able to select IX Level please select another level who suits you"));
                        AddStudent();
                    }
                    break;
                case "X":
                    if (age >= 17 || age <= 18) {
                        console.log(chalk.greenBright("Congratulations!!! You are able to select X level"));
                    }
                    else {
                        console.log(chalk.redBright("The student is not able to select X Level please select another level who suits you"));
                        AddStudent();
                    }
                    break;
                case "XI":
                    if (age >= 18 || age <= 19) {
                        console.log(chalk.greenBright("Congratulations!!! You are able to select XI level"));
                    }
                    else {
                        console.log(chalk.redBright("The student is not able to select XI Level please select another level who suits you"));
                        AddStudent();
                    }
                    break;
                case "XII":
                    if (age >= 19 || age <= 20) {
                        console.log(chalk.greenBright("Congratulations!!! You are able to select XII level"));
                    }
                    else {
                        console.log(chalk.redBright("The student is not able to select XII Level please select another level who suits you"));
                        AddStudent();
                    }
                    break;
                case "Master":
                    if (age >= 20 || age <= 100) {
                    console.log(chalk.greenBright("Congratulations!!! You are able to select Master level Master Level contains no age limit"));
                    }
                    else {
                        console.log(chalk.redBright("You are not able to join becase you are under 20 or above 100"));
                        AddStudent();
                    }
                    break;
                case "Graduation":
                    if (age >= 20 || age <= 100) {
                        console.log(chalk.greenBright("Congratulations!!! You are able to select Graduation level Graduation Level contains no age limit"));
                    } else {
                        console.log(chalk.redBright("You are not able to join becase you are under 20 or above 100"));
                        AddStudent();
                    }
                    break;
                case "Post Graduation":
                    if (age >= 20 || age <= 100) {
                        console.log(chalk.greenBright("Congratulations!!! You are able to select Post Graduation level Post Graduation Level contains no age limit"));
                    } else {
                        console.log(chalk.redBright("You are not able to join becase you are under 20 or above 100"));
                        AddStudent();
                    }
                    break;
                default:
                    console.log(chalk.redBright("Invalid choice"));
                    AddStudent();
                    break;
            }
        
            selectedStudent.course = newValue.value;
            break;
        default:
            console.log(chalk.redBright("Invalid choice"));
            break;
    }

    console.log(chalk.greenBright("Student details updated successfully:"));
    console.log(selectedStudent);
    console.log("Returning to main menu...");
    
    AddStudent();
};

console.log(chalk.blueBright("    ||||||||||||||| WELCOME To Ilyas Islamic Primary and Secondary School/College and University (PVT/REGD) |||||||||||||||||"));
const AddStudent = async () => {
    await confirmator();
    const Answer = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: chalk.magentaBright("Enter the name of the student: "),
        },
        {
            name: "age",
            type: "number",
            message: chalk.magentaBright("Enter the age of the student: "),
        },
        {
            name: "gender",
            type: "list",
            message: chalk.magentaBright("Enter the gender of the student: "),
            choices: ["male", "female"]
        },
        {
            name: "courses",
            type: "list",
            message: chalk.magentaBright("Enter the Level that student or parents want to select: "),
            choices: ["Montessori","Nursery","LKG","UKG","I","II",
                    "III","IV","V","VI","VII","VIII","IX","X","XI",
                    "XII","Master","Graduation","Post Graduation"]
        }
    ]);
    let id : number = generateUniqueId();
    switch (Answer.courses)
    {
        case "Montessori":
            if (Answer.age >= 3 || Answer.age <= 4) {
                console.log(chalk.greenBright("Congratulations!!! You are able to select Montessori level"));
                return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            }
            else {
                console.log(chalk.redBright("The student is not able to join our school"));
                AddStudent();
            }
            break;
        case "Nursery":
            if (Answer.age >= 3 || Answer.age <= 5) {
                console.log(chalk.greenBright("Congratulations!!! You are able to select Nursery level"));
                return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            }
            else {
                console.log(chalk.redBright("The student is not able to select Nursery Level please select another level who suits you"));
                AddStudent();
            }
            break;
        case "LKG":
            if (Answer.age >= 5 || Answer.age <= 6) {
                console.log(chalk.greenBright("Congratulations!!! You are able to select LKG level"));
                return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            }
            else {
                console.log(chalk.redBright("The student is not able to select LKG Level please select another level who suits you"));
                AddStudent();
            }
            break;
        case "UKG":
            if (Answer.age >= 6 || Answer.age <= 7) {
                console.log(chalk.greenBright("Congratulations!!! You are able to select UKG level"));
                return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            }
            else {
                console.log(chalk.redBright("The student is not able to select UKG Level please select another level who suits you"));
                AddStudent();
            }
            break;
        case "I":
            if (Answer.age >= 7 || Answer.age <= 9) {
                console.log(chalk.greenBright("Congratulations!!! You are able to select I level"));
                return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            }
            else {
                console.log(chalk.redBright("The student is not able to select I Level please select another level who suits you"));
                AddStudent();
            }
            break;
        case "II":
            if (Answer.age >= 9 || Answer.age <= 10) {
                console.log(chalk.greenBright("Congratulations!!! You are able to select II level"));
                return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            }
            else {
                console.log(chalk.redBright("The student is not able to select II Level please select another level who suits you"));
                AddStudent();
            }
            break;
        case "III":
            if (Answer.age >= 10 || Answer.age <= 11) {
                console.log(chalk.greenBright("Congratulations!!! You are able to select III level"));
                return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            }
            else {
                console.log(chalk.redBright("The student is not able to select III Level please select another level who suits you"));
                AddStudent();
            }
            break;
        case "IV":
            if (Answer.age >= 11 || Answer.age <= 12) {
                console.log(chalk.greenBright("Congratulations!!! You are able to select IV level"));
                return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            }
            else {
                console.log(chalk.redBright("The student is not able to select IV Level please select another level who suits you"));
                AddStudent();
            }
            break;
        case "V":
            if (Answer.age >= 12 || Answer.age <= 13) {
                console.log(chalk.greenBright("Congratulations!!! You are able to select V level"));
                return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            }
            else {
                console.log(chalk.redBright("The student is not able to select V Level please select another level who suits you"));
                AddStudent();
            }
            break;
        case "VI":
            if (Answer.age >= 13 || Answer.age <= 14) {
                console.log(chalk.greenBright("Congratulations!!! You are able to select VI level"));
                return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            }
            else {
                console.log(chalk.redBright("The student is not able to select VI Level please select another level who suits you"));
                AddStudent();
            }
            break;
        case "VII":
            if (Answer.age >= 14 || Answer.age <= 15) {
                console.log(chalk.greenBright("Congratulations!!! You are able to select VII level"));
                return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            }
            else {
                console.log(chalk.redBright("The student is not able to select VII Level please select another level who suits you"));
                AddStudent();
            }
            break;
        case "VIII":
            if (Answer.age >= 15 || Answer.age <= 16) {
                console.log(chalk.greenBright("Congratulations!!! You are able to select VIII level"));
                return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            }
            else {
                console.log(chalk.redBright("The student is not able to select VIII Level please select another level who suits you"));
                AddStudent();
            }
            break;
        case "IX":
            if (Answer.age >= 16 || Answer.age <= 17) {
                console.log(chalk.greenBright("Congratulations!!! You are able to select IX level"));
                return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            }
            else {
                console.log(chalk.redBright("The student is not able to select IX Level please select another level who suits you"));
                AddStudent();
            }
            break;
        case "X":
            if (Answer.age >= 17 || Answer.age <= 18) {
                console.log(chalk.greenBright("Congratulations!!! You are able to select X level"));
                return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            }
            else {
                console.log(chalk.redBright("The student is not able to select X Level please select another level who suits you"));
                AddStudent();
            }
            break;
        case "XI":
            if (Answer.age >= 18 || Answer.age <= 19) {
                console.log(chalk.greenBright("Congratulations!!! You are able to select XI level"));
                return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            }
            else {
                console.log(chalk.redBright("The student is not able to select XI Level please select another level who suits you"));
                AddStudent();
            }
            break;
        case "XII":
            if (Answer.age >= 19 || Answer.age <= 20) {
                console.log(chalk.greenBright("Congratulations!!! You are able to select XII level"));
                return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            }
            else {
                console.log(chalk.redBright("The student is not able to select XII Level please select another level who suits you"));
                AddStudent();
            }
            break;
        case "Master":
            if (Answer.age >= 20 || Answer.age <= 100) {
            console.log(chalk.greenBright("Congratulations!!! You are able to select Master level Master Level contains no age limit"));
            return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            }
            else {
                console.log(chalk.redBright("You are not able to join becase you are under 20 or above 100"));
                AddStudent();
            }
            break;
        case "Graduation":
            if (Answer.age >= 20 || Answer.age <= 100) {
                console.log(chalk.greenBright("Congratulations!!! You are able to select Graduation level Graduation Level contains no age limit"));
                return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            } else {
                console.log(chalk.redBright("You are not able to join becase you are under 20 or above 100"));
                AddStudent();
            }
            break;
        case "Post Graduation":
            if (Answer.age >= 20 || Answer.age <= 100) {
                console.log(chalk.greenBright("Congratulations!!! You are able to select Post Graduation level Post Graduation Level contains no age limit"));
                return new Student(id , Answer.name , Answer.age , Answer.gender , Answer.courses);
            } else {
                console.log(chalk.redBright("You are not able to join becase you are under 20 or above 100"));
                AddStudent();
            }
            break;
        default:
            console.log(chalk.redBright("Invalid choice"));
            AddStudent();
            break;
    }
}
AddStudent();
export default AddStudent;