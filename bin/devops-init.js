#!/usr/bin/env node

import { program } from "commander";
import { initProject } from "../src/commands/init.js";
import inquirer from "inquirer";

program
  .name("devops-init")
  .argument("<project-name>")
  .option("--runtime <runtime>", "runtime (node)", "node")
  .option("--ci <ci>", "ci provider (github|none)", "github")
  .option("--docker", "add Docker support")
  .parse();

const options = program.opts();
const projectName = program.args[0];


async function run() {
  let finalOptions = options;

  if (!options.docker && options.ci === "github") {
    const answers = await inquirer.prompt([
      {
        type: "confirm",
        name: "docker",
        message: "Do you want to include Docker support?",
        default: false,
      },
      {
        type: "list",
        name: "ci",
        message: "Choose CI provider:",
        choices: ["github", "none"],
        default: "github",
      },
    ]);

    finalOptions = { ...options, ...answers };
  }

  await initProject(projectName, finalOptions);
}

run();

