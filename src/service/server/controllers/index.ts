import {ArticlesController} from "./articles.controller";
import {CategoriesController} from "./categories.controller";
import {SearchController} from "./search.controller";
import {DataProviderService} from "../services/data-provider.service";
import {
  articlesServiceFactory,
  categoriesServiceFactory,
  commentsServiceFactory,
  searchServiceFactory,
} from "../services/data-service";
import {ICategoryModel} from "../data-access/models/category";
import {IIntermediateModel} from "../data-access/models/intermediate";
import {IArticleModel} from "../data-access/models/article";
import {ICommentModel} from "../data-access/models/comment";

export const articlesControllerFactory = ({
  ArticleModel,
  ArticleCategoryModel,
  CategoryModel,
  CommentModel,
  dataProviderService,
}: {
  ArticleModel: IArticleModel;
  ArticleCategoryModel: IIntermediateModel;
  CategoryModel: ICategoryModel;
  CommentModel: ICommentModel;
  dataProviderService: DataProviderService;
}): ArticlesController =>
  new ArticlesController(
    articlesServiceFactory(ArticleModel, ArticleCategoryModel),
    categoriesServiceFactory(CategoryModel, ArticleCategoryModel),
    commentsServiceFactory(CommentModel),
    dataProviderService,
  );

export const categoriesControllerFactory = ({
  CategoryModel,
  ArticleCategoryModel,
}: {
  CategoryModel: ICategoryModel;
  ArticleCategoryModel: IIntermediateModel;
}): CategoriesController => new CategoriesController(categoriesServiceFactory(CategoryModel, ArticleCategoryModel));

export const searchControllerFactory = ({ArticleModel}: {ArticleModel: IArticleModel}): SearchController =>
  new SearchController(searchServiceFactory(ArticleModel));
