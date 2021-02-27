import {CliAction} from "../../types/cli-action";
import {ExitCode} from "../../constants-es6";
import {connectToDatabase} from "../server/data-access/database-connector";
import {defineDatabaseModels} from "../server/data-access/models";
import {getLogger} from "../logger";
import chalk from "chalk";
import {fillDb} from "../server/data-access/fill-db";

const DEFAULT_COUNT = 3;
const logger = getLogger();

export const cliAction: CliAction = {
  name: `--fill-db`,
  async run(args?: string): Promise<void> {
    const [mockCountInput] = args;
    const mockCount = parseInt(mockCountInput, 10) || DEFAULT_COUNT;
    if (mockCount > 1000) {
      console.error(chalk.red(`Не больше 1000 публикаций, введенное значение: ${mockCount}`));
      process.exit(ExitCode.SUCCESS);
    }
    try {
      const connection = await connectToDatabase();
      const {CategoryModel, ArticleModel, CommentModel, UserModel, RoleModel} = defineDatabaseModels(connection);
      await connection.sync({force: true});
      await fillDb(mockCount, {ArticleModel, CategoryModel, CommentModel, UserModel, RoleModel});
      await connection.close();
    } catch (e) {
      logger.error((e as Error).message);
      process.exit(1);
    }
  },
};
