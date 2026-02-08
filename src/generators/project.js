import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createProject(targetDir, runtime) {
  const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    "common"
  );

  await fs.copy(templatePath, targetDir);
}
