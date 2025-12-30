import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

function getWelcomeMessage(): string {
  const basePath: string = path.dirname(
    path.dirname(fileURLToPath(import.meta.url)),
  );
  return fs.readFileSync(path.join(basePath, "assets/welcome.txt"), "utf8");
}

export default getWelcomeMessage;
