import {Router} from "express";

import {HttpCode} from "../../../constants-es6";
import {CategoriesController} from "../controllers/categories.controller";

export const categoriesStatisticsRouter = (categoriesController: CategoriesController): Router => {
  const router = Router();

  router.get(`/`, async (req, res) => {
    const {status = HttpCode.OK, payload} = await categoriesController.getCategoriesWithNumbers();
    return res.status(status).send(payload);
  });

  return router;
};
