import React, {FunctionComponent} from "react";
import {Logo} from "../Logo/Logo";
import {ClientRoutes} from "../../../../constants-es6";

interface Props {}

export const HeaderAuthorized: FunctionComponent<Props> = ({}) => {
  return (
    <header className="header">
      <Logo />
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__list-item">
            <p>Алёна Фролова</p>
          </li>
          <li className="header__list-item">
            <a className="header__exit" href="#">
              Выйти
            </a>
          </li>
        </ul>
      </nav>
      <a className="header__avatar avatar">
        <img src="https://via.placeholder.com/50x50.webp" alt="аватар пользователя" />
      </a>
      <a
        className="header__search button button--search"
        href={ClientRoutes.SEARCH.INDEX}
        aria-label="поиск по сайту"
      />
    </header>
  );
};
