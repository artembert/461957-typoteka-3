import React, {FunctionComponent} from "react";

import {Logo} from "../Logo/Logo";

import {LogInButton} from "./Buttons/LogInButton/LogInButton";
import {SearchButton} from "./Buttons/SearchButton/SearchButton";
import {SignUpButton} from "./Buttons/SignUpButton/SignUpButton";

const Header: FunctionComponent = ({}) => {
  return (
    <header className="header">
      <Logo />
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__list-item">
            <SignUpButton />
          </li>
          <li className="header__list-item">
            <LogInButton />
          </li>
        </ul>
      </nav>
      <SearchButton />
    </header>
  );
};

export {
  Header,
};
