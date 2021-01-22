import {IArticleModel} from "../../data-access/models/article";
import {NewArticle} from "../../../../types/article";
import {TableName} from "../../data-access/constants/table-name";
import Sequelize, {FindAttributeOptions, Model} from "sequelize";
import {CategoryId} from "../../../../types/category-id";
import {ArticleId} from "../../../../types/article-id";
import {IArticlePlain} from "../../../../types/interfaces/article-plain";

export class ArticlesService {
  constructor(private readonly ArticleModel: IArticleModel) {}

  public async findAll(): Promise<IArticlePlain[]> {
    const attributes: FindAttributeOptions = [
      `announce`,
      [`full_text`, `fullText`],
      `title`,
      `id`,
      [`created_date`, `createdDate`],
      [Sequelize.fn(`COUNT`, Sequelize.col(`comments.id`)), `commentsCount`],
    ];
    const articles = await this.ArticleModel.findAll<Model<IArticlePlain>>({
      attributes,
      include: [
        {
          association: TableName.COMMENTS,
          attributes: [],
        },
      ],
      group: [`Article.id`],
    });
    return articles
      .map(item => item.get({plain: true}))
      .map(item => ({...item, commentsCount: parseInt(`${item.commentsCount}`, 10)}));
  }

  // public async findPage({limit, offset}: {limit: number; offset: number}): Promise<Article[]> {}

  public async findOneById(articleId: ArticleId): Promise<IArticlePlain> {
    const attributes: FindAttributeOptions = [
      `announce`,
      [`full_text`, `fullText`],
      `title`,
      `id`,
      [`created_date`, `createdDate`],
      [Sequelize.fn(`COUNT`, Sequelize.col(`comments.id`)), `commentsCount`],
    ];
    const article = await this.ArticleModel.findOne<Model<IArticlePlain>>({
      attributes,
      include: [
        {
          association: TableName.COMMENTS,
          attributes: [],
        },
      ],
      group: [`Article.id`],
      where: {
        id: articleId,
      },
      rejectOnEmpty: true,
    });
    const plainArticle = article.get({plain: true});
    return {...plainArticle, commentsCount: parseInt(`${plainArticle.commentsCount}`, 10)};
  }

  public async findByCategoryId(categoryId: CategoryId): Promise<IArticlePlain[]> {
    const attributes: FindAttributeOptions = [
      `announce`,
      [`full_text`, `fullText`],
      `title`,
      `id`,
      [`created_date`, `createdDate`],
      [Sequelize.fn(`COUNT`, Sequelize.col(`comments.id`)), `commentsCount`],
    ];
    const articles = await this.ArticleModel.findAll<Model<IArticlePlain>>({
      attributes,
      include: [
        {
          association: TableName.COMMENTS,
          attributes: [],
        },
        {
          association: TableName.CATEGORIES,
          attributes: [],
          through: {
            attributes: [],
          },
          where: {
            id: categoryId,
          },
        },
      ],
      group: [`Article.id`],
    });
    return articles
      .map(item => item.get({plain: true}))
      .map(item => ({...item, commentsCount: parseInt(`${item.commentsCount}`, 10)}));
  }

  public async create({announce, createdDate, fullText, title, categories}: NewArticle): Promise<true | null> {
    const createdArticle = await this.ArticleModel.create({
      createdDate,
      announce,
      fullText,
      title,
    });
    await createdArticle.setCategories(categories.map(item => item.id));
    return createdDate ? true : null;
  }

  public async drop(id: ArticleId): Promise<boolean> {
    const deletedArticle = await this.ArticleModel.destroy({
      where: {
        id,
      },
      cascade: true,
    });
    return !!deletedArticle;
  }

  public async update(
    id: ArticleId,
    {announce, createdDate, fullText, title, categories}: NewArticle,
  ): Promise<boolean> {
    const [count, [updatedArticle]] = await this.ArticleModel.update(
      {
        createdDate,
        announce,
        fullText,
        title,
      },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
    if (!count) {
      return Promise.reject(`Not found`);
    }
    await updatedArticle.setCategories(categories.map(item => item.id));
    return !![updatedArticle];
  }
}
