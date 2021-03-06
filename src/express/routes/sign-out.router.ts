import {NextFunction, Request, Router} from "express";

import {HttpCode} from "../../constants";
import {ClientRoute} from "../../shared/constants/routes/client-route";
import {IResponseExtended} from "../../types/interfaces/response-extended";
import {SSRError} from "../errors/ssr-error";
import {getAccessTokenFromCookies, getRefreshTokenFromCookies, invalidateAuthCookie} from "../helpers/cookie.helper";
import {dataProviderService} from "../services";

const signOutRouter = Router();

signOutRouter.get(`/`, async (req: Request, res: IResponseExtended, next: NextFunction) => {
  try {
    const refreshToken = getRefreshTokenFromCookies(req);
    invalidateAuthCookie(res);
    try {
      await dataProviderService.signOut(refreshToken, getAccessTokenFromCookies(req));
    } catch (e) {
      console.error(`Failed to drop refresh token`);
    }
    return res.redirect(ClientRoute.INDEX);
  } catch (e) {
    return next(
      new SSRError({
        message: `Failed to sign out`,
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        errorPayload: e as Error,
      }),
    );
  }
});

export {
  signOutRouter,
};
