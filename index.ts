#!/usr/bin/env nodea

import chalk from "chalk";
import inquirer from "inquirer";

interface QuizQuestion {
  question: string;
  options: string[];
}

const quiz: QuizQuestion[] = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris"],
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter"],
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "Ernest Hemingway"],
  },
  {
    question: "What is the smallest prime number?",
    options: ["1", "2", "3"],
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "H2O", "CO2"],
  },
  {
    question: "What is the formula of acceleration?",
    options: ["(vf + vi) / Δt", "(vf - vi) / Δt", "(vi - vf) / t"],
  },
  {
    question: "Who is the father of computer?",
    options: ["Charles Babbage", "Albert Einstien", "Alexander Graham Bell"],
  },
  {
    question: "Which one is the hottest planet in our solar system?",
    options: ["Mars", "Mercury", "Venus"],
  },
  {
    question: "What is value of planck's constant?",
    options: ["6.67 x 10^-34 J/s", "6.626 x 10^-34 Js", "6.626 x 10^-34m/s"],
  },
  {
    question: "Which is the most essential element in organic chemistry?",
    options: ["Carbon", "Hydrogen", "Oxygen"],
  },
];

const correctAnswers: string[] = [
  "Paris",
  "Mars",
  "Harper Lee",
  "2",
  "H2O",
  "(vf - vi) / Δt",
  "Charles Babbage",
  "Venus",
  "6.626 x 10^-34 Js",
  "Carbon",
];

let ask = await inquirer.prompt([
  {
    name: "name",
    type: "input",
    message: "Enter your Name: ",
    validate: (input) => {
      if (!input) {
        return "Please enter your name.";
      } else if (typeof input !== "string") {
        return "Please enter your name in string.";
      } else {
        return true;
      }
    },
  },
]);

(async () => {
  const userName: string = ask.name;
  console.log(chalk.bold.green(`\nWelcome, ${userName}! Let's start the quiz.\n`));

  let result: { question: string; option: boolean }[] = [];
  let score = 0;

  for (let i = 0; i < quiz.length; i++) {
    let questions = quiz[i];

    let answer = await inquirer.prompt([
      {
        name: "userAnswer",
        type: "list",
        message: `Q${i+1}: ${questions.question}`,
        choices: questions.options,
      },
    ]);

    let isCorrect = answer.userAnswer == correctAnswers[i];

    if (isCorrect) {
      score++;
    } 

    result.push({ question: questions.question, option: isCorrect });
  }

  console.log(chalk.bold.green(`\nQuiz completed! ${chalk.bold.gray("Dear "+ userName + "! Your score is")} ${chalk.green(score)}/${chalk.green(quiz.length)}.\n`));

  result.map((value, index) => {
    console.log(
      `Q${index + 1}: ${value.question} - ${
        value.option ? chalk.green("Correct") : chalk.red("Incorrect! "+`The correct answer is ${chalk.yellowBright(correctAnswers[index])}`)
      }`
    );
  });
})();
