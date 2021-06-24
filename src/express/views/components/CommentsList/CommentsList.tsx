import React, {FunctionComponent} from "react";
import {Comment} from "../Comment/Comment";
import {IComments} from "../../../../types/article";

interface Props extends IComments {
  parentCssClass: string;
}

export const CommentsList: FunctionComponent<Props> = ({parentCssClass, comments, children}) => {
  return (
    <section className={`${parentCssClass}__comments comments`}>
      <h2 className="comments__title title title--middle">Комментарии</h2>
      <ul className="comments__list">
        {comments.map(item => (
          <Comment user={item.user} text={item.text} createdDate={item.createdDate} key={item.id} />
        ))}
      </ul>
      {children && <div className="comments__footer comments__footer--user">{children}</div>}
    </section>
  );
};
