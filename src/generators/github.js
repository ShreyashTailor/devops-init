import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createGithubCI(targetDir, runtime) {
  const workflowDir = path.join(targetDir, ".github", "workflows");
  await fs.ensureDir(workflowDir);

  const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    "github",
    "ci.yml"
  );

  await fs.copy(templatePath, path.join(workflowDir, "ci.yml"));
}
