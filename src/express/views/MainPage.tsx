import React from "react";
import {LayoutFilled} from "./components/Layout/LayoutFilled";
import {Greeting} from "./components/Greeting/Greeting";
import {ThemeList} from "./components/ThemeList/ThemeList";
import {HotList} from "./components/HotList/HotList";
import {LastList} from "./components/LastList/LastList";
import {PreviewList} from "./components/PreviewList/PreviewList";
import {Article} from "../../types/article";

interface Props {
  articles: Article[];
}

export default function MainPage(props: Props) {
  const themes = [
    {
      title: `Title`,
      count: 5,
      link: `#`,
    },
    {
      title: `Title`,
      count: 5,
      link: `#`,
    },
    {
      title: `Title`,
      count: 5,
      link: `#`,
    },
    {
      title: `Title`,
      count: 5,
      link: `#`,
    },
    {
      title: `Title`,
      count: 5,
      link: `#`,
    },
  ];
  const hotList = [
    {
      title: `Билл Гейтс впервые за два года возглавил рейтинг самых богатых людей мира по версии Bloomberg`,
      count: 12,
      link: `#`,
    },
    {
      title: `Tesla получила 146 тысяч предзаказов на электрический пикап Cybertruck за двое суток`,
      count: 153,
      link: `#`,
    },
    {
      title: `Билл Гейтс впервые за два года возглавил рейтинг самых богатых людей мира по версии Bloomberg`,
      count: 12,
      link: `#`,
    },
    {
      title: `Tesla получила 146 тысяч предзаказов на электрический пикап Cybertruck за двое суток`,
      count: 153,
      link: `#`,
    },
  ];
  const lastList = [
    {
      title: `Сервис аренды жилья Airbnb стал глобальным партнером Международного олимпийского комитета (МОК) на девять лет, в течение которых пройдет пять Олимпиад, в том числе в Токио в 2020 году`,
      link: `#`,
      authorName: `Анна Артамонова`,
      authorAvatar: `img/avatar-small-1.png`,
    },
    {
      title: `Главреды «Дождя», Forbes и других СМИ попросили Роскомнадзор разъяснить штрафы за ссылки на сайты с матом`,
      link: `#`,
      authorName: `Александр Петров`,
      authorAvatar: `img/avatar-small-2.png`,
    },
    {
      title: `Что-то все электрокары в последнее время все на одно лицо делаются))`,
      link: `#`,
      authorName: `Игорь Шманский`,
      authorAvatar: `img/avatar-small-3.png`,
    },
  ];

  return (
    <LayoutFilled>
      <main className="main-page">
        <Greeting />
        <ThemeList themes={themes} />
        <div className="main-page__section-flex">
          <HotList hotList={hotList} />
          <LastList lastList={lastList} />
        </div>
        <PreviewList previews={props.articles} />
      </main>
    </LayoutFilled>
  );
}