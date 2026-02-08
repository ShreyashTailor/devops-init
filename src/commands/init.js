import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

import { createProject } from "../generators/project.js";
import { createGithubCI } from "../generators/github.js";
import { createDocker } from "../generators/docker.js";

const SUPPORTED_RUNTIMES = ["node"];
const SUPPORTED_CI = ["github", "none"];

export async function initProject(projectName, options) {
  const targetDir = path.join(process.cwd(), projectName);

  if (!SUPPORTED_RUNTIMES.includes(options.runtime)) {
    console.log(
      chalk.red(
        `❌ Unsupported runtime: ${options.runtime}\nSupported: ${SUPPORTED_RUNTIMES.join(", ")}`
      )
    );
    process.exit(1);
  }

  if (!SUPPORTED_CI.includes(options.ci)) {
    console.log(
      chalk.red(
        `❌ Unsupported CI: ${options.ci}\nSupported: ${SUPPORTED_CI.join(", ")}`
      )
    );
    process.exit(1);
  }

  if (fs.existsSync(targetDir)) {
    console.log(chalk.red("❌ Folder already exists"));
    process.exit(1);
  }

  await fs.mkdir(targetDir);
  console.log(chalk.green("✔ Project folder created"));

  await createProject(targetDir, options.runtime);

  if (options.ci === "github") {
    await createGithubCI(targetDir, options.runtime);
  }

  if (options.docker) {
    await createDocker(targetDir, options.runtime);
  }

  console.log(chalk.cyan("Project generated successfully"));
}
