import {Model, Sequelize} from "sequelize";
import {ICategoryModel} from "../../data-access/models/category";
import {Category} from "../../../../types/category";
import {CategoryWithNumbers} from "../../../../types/category-with-numbers";
import {TableName} from "../../data-access/constants/table-name";
import {IIntermediateModel} from "../../data-access/models/intermediate";
import {ArticleId} from "../../../../types/article-id";
import {CategoryId} from "../../../../types/category-id";

export class CategoriesService {
  constructor(
    private readonly CategoryModel: ICategoryModel,
    private readonly ArticleCategoryModel: IIntermediateModel,
  ) {}

  public async findAll(): Promise<Category[]> {
    const result = await this.CategoryModel.findAll({
      attributes: [`id`, `label`],
      group: [Sequelize.col(`Category.id`)],
    });
    return result.map(it => it.get());
  }

  public async findAllWithNumbers(): Promise<CategoryWithNumbers[]> {
    const result = await this.CategoryModel.findAll<Model<CategoryWithNumbers>>({
      attributes: [`id`, `label`, [Sequelize.fn(`COUNT`, `*`), `count`]],
      group: [Sequelize.col(`Category.id`)],
      include: [
        {
          model: this.ArticleCategoryModel,
          as: TableName.ARTICLES_CATEGORIES,
          attributes: [],
        },
      ],
    });
    return result.map<CategoryWithNumbers>(it => it.get());
  }

  public async findByArticleId(articleId: ArticleId): Promise<Category[]> {
    const result = await this.CategoryModel.findAll({
      attributes: [`id`, `label`],
      include: [
        {
          association: TableName.ARTICLES_CATEGORIES,
          attributes: [],
          where: {
            ArticleId: articleId,
          },
        },
      ],
    });
    return result.map(it => it.get({plain: true}));
  }

  public async findOneById(id: CategoryId): Promise<Category> {
    const category = await this.CategoryModel.findOne({
      attributes: [`id`, `label`],
      where: {
        id,
      },
    });
    return category.get();
  }
}