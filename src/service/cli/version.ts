import chalk from "chalk";
import {promises} from "fs";

import type {IPackageJson} from "package-json-type/types/index";

import {CliAction} from "../../types/cli-action";

const PACKAGE_JSON_PATH = `./package.json`;

async function parseJson(): Promise<IPackageJson> {
  return JSON.parse(await promises.readFile(PACKAGE_JSON_PATH, `utf8`)) as IPackageJson;
}

export const cliAction: CliAction = {
  name: `--version`,
  async run() {
    const packageJson = await parseJson();
    console.info(chalk.blue(packageJson.version));
  },
};
