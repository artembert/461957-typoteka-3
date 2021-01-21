import {IArticleModel} from "../../data-access/models/article";
import {IIntermediateModel} from "../../data-access/models/intermediate";
import {IAnnounce, IArticleId, ICommentsCount, ICreatedDate, IFullText, ITitle} from "../../../../types/article";
import {TableName} from "../../data-access/constants/table-name";
import Sequelize, {FindAttributeOptions, Model} from "sequelize";
import {Includeable} from "sequelize/types/lib/model";
import {CommentProperty} from "../../data-access/constants/property-name";

type PlainArticle = IAnnounce & IFullText & ITitle & IArticleId & ICreatedDate & ICommentsCount;

export class ArticlesService {
  constructor(
    private readonly ArticleModel: IArticleModel,
    private readonly ArticleCategoryModel: IIntermediateModel,
  ) {}

  public async findAll(): Promise<PlainArticle[]> {
    const include: Record<string, Includeable> = {
      categories: {
        association: TableName.CATEGORIES,
        attributes: [],
        through: {
          attributes: [],
        },
      },
      commentsForCount: {
        association: TableName.COMMENTS,
        attributes: [],
      },
      comments: {
        association: TableName.COMMENTS,
        attributes: [
          CommentProperty.ID,
          [CommentProperty.ARTICLEID, `articleId`],
          CommentProperty.TEXT,
          [CommentProperty.CREATEDDATE, `createdDate`],
        ],
      },
    };
    const attributes: FindAttributeOptions = [
      `announce`,
      [`full_text`, `fullText`],
      `title`,
      `id`,
      [`created_date`, `createdDate`],
      [Sequelize.fn(`COUNT`, `comments.id`), `commentsCount`],
      // [Sequelize.literal(`ARRAY_AGG(categories.id)`), `categoriesIds`],
    ];
    const articles = await this.ArticleModel.findAll<Model<PlainArticle>>({
      attributes,
      include: [include.commentsForCount],
      group: [`Article.id`],
    });
    return articles.map(item => item.get({plain: true}));
  }

  // public async findPage({limit, offset}: {limit: number; offset: number}): Promise<Article[]> {}
  // public async findOne(areCommentsRequired: boolean): Promise<Article> {}
  // public async drop(id: ArticleId): Promise<void> {}
  // public async create(): Promise<Article[]> {}
  // public async update(): Promise<void> {}
}