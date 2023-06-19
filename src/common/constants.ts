export const BASE_URL = "https://rest-api-books.onrender.com/";
// export const BASE_URL = "http://localhost:5555/";

export const NAV_BUTTONS = [
  {
    link: "",
    label: "Каталог",
  },
  {
    link: "/stocks",
    label: "Акции",
  },
  {
    link: "/bookstores-services",
    label: "Доставка",
  },

  {
    link: "/reader-blogs",
    label: "Блоги читателей",
  },
  {
    link: "/about-us",
    label: "О нас",
  },
];

export const categoryNewBooks =
  "all?sortBy=releaseDate&sortOrder=desc&limit=13";

export const CATEGORIES = [
  {
    link: "/books-list/Все книги",
    label: "Все книги",
    param: "all?",
  },
  {
    link: "/books-list/Новинки",
    label: "Новинки",
    param: categoryNewBooks, //!!!!
  },
  {
    link: "/books-list/Художественная литература",
    label: "Художественная литература",
    param: "all?category=Художественная литература",
  },
  {
    link: "/books-list/Научная и научно-популярная литература",
    label: "Научная и научно-популярная литература",
    param: "all?category=Научная и научно-популярная литература",
  },
  {
    link: "/books-list/Бизнес",
    label: "Бизнес",
    param: "all?category=Бизнес",
  },
  {
    link: "/books-list/Детская литература",
    label: "Детская литература",
    param: "all?category=Детская литература",
  },

  {
    link: "/books-list/Путешествия. Хобби. Досуг",
    label: "Путешествия. Хобби. Досуг",
    param: "all?category=Путешествия. Хобби. Досуг",
  },
  {
    link: "/books-list/Компьютерная литература",
    label: "Компьютерная литература",
    param: "all?category=Компьютерная литература",
  },
  {
    link: "/books-list/Искусство. Религия",
    label: "Искусство. Религия",
    param: "all?category=Искусство. Религия",
  },
];

export const menuSortData = [
  {
    key: "sortName",
    title: "Наименованию",
    options: [
      { value: "&sortBy=title&sortOrder=asc", subtitle: "а-я ⇧" },
      { value: "&sortBy=title&sortOrder=desc", subtitle: "я-а ⇩" },
    ],
  },
  {
    key: "sortRating",
    title: "Рейтингу",
    options: [
      {
        value: "&sortBy=averageRate&sortOrder=asc",
        subtitle: "возрастанию ⇧",
      },
      {
        value: "&sortBy=averageRate&sortOrder=desc",
        subtitle: "убыванию ⇩",
      },
    ],
  },
  {
    key: "sortCost",
    title: "Цене",
    options: [
      {
        value: "&sortBy=price&sortOrder=asc",
        subtitle: "возрастанию ⇧",
      },
      { value: "&sortBy=price&sortOrder=desc", subtitle: "убыванию ⇩" },
    ],
  },
  {
    key: "sortData",
    title: "Дате выхода",
    options: [
      {
        value: "&sortBy=releaseDate&sortOrder=asc",
        subtitle: "возрастанию ⇧",
      },
      {
        value: "&sortBy=releaseDate&sortOrder=desc",
        subtitle: "убыванию ⇩",
      },
    ],
  },
];

export const paramsReaderBlogs = "post/all?";

export const linksFooter = [
  {
    link: "/stocks",
    label: "Акции",
  },
  {
    link: "/bookstores-services",
    label: "Услуги",
  },

  {
    link: "/reader-blogs",
    label: "Блоги читателей",
  },
  {
    link: "/about-us",
    label: "О нас",
  },
];

export const QUANTITY_PAGES = 18;

export const BLOCK_DATA_STOCKS = [
  {
    id: 1,
    src: "https://i.ibb.co/bNdPnVm/resize-1.jpg",
    text: [
      "📚 Любите читать? Тогда у нас есть для вас отличная новость! В нашем книжном магазине действует уникальная акция: скидки от 10% до 50% на все книги в ассортименте! 📚",
      "👉 Вы можете выбрать любой жанр, автора или издание, которые вам нравятся, и получить книгу по выгодной цене. Не упустите эту возможность пополнить свою домашнюю библиотеку или подарить книгу друзьям или родным. 👈",
      "🕑 Спешите, акция действует только до конца месяца! Заходите в наш магазин или оформляйте заказ онлайн. Мы ждем вас!",
    ],
    path: "/books-list/Все книги",
    param: "all?",
  },
  {
    id: 2,
    src: "https://i.ibb.co/1QxHd61/vz-G9d-NTd-LA.jpg",
    text: [
      "👶 Хотите, чтобы ваш ребенок развивался и учился с удовольствием? Тогда вам нужны наши развивающие книги для детей! 👶",
      "📙 У нас вы найдете книги для детей разных возрастов и интересов: от сказок и стихов до энциклопедий и лабораторий. Наши книги помогут вашему ребенку раскрыть свой потенциал, развить творческое мышление и познать мир. 📙",
      "🎈 А сейчас у нас действует невероятная акция: скидка 35% на все развивающие книги для детей! Это ваш шанс приобрести качественные и полезные книги по доступной цене. 🎈",
      "🕖 Поторопитесь, акция заканчивается через три дня! Не упустите эту уникальную возможность порадовать своего ребенка и себя. Мы ждем вас! 🕖",
    ],
    path: "/books-list/Детская литература",
    param: "all?category=Детская литература",
  },
];

export const IMAGES_CARUSEL_ABOUT_US = [
  {
    id: "a",
    url: "https://th.bing.com/th/id/OIG.Cg5BCUCNTG8mFaNnTV6E?pid=ImgGn",
  },
  {
    id: "b",
    url: "https://th.bing.com/th/id/OIG.9jqYqengVvwcbnNpADea?pid=ImgGn",
  },
  {
    id: "c",
    url: "https://th.bing.com/th/id/OIG.OQY65Dcc2I8nM9F.q7Tz?pid=ImgGn",
  },
  {
    id: "d",
    url: "https://th.bing.com/th/id/OIG.WTO5CXQjC8yjv8PRGp5i?pid=ImgGn",
  },
  {
    id: "e",
    url: "https://th.bing.com/th/id/OIG.Pylbn1FZneukN416y69y?pid=ImgGn",
  },
];

export const IMAGES_CARUSEL_HOME = [
  { id: 148, url: "https://i.ibb.co/qD2Dswr/1.jpg" },
  { id: 150, url: "https://i.ibb.co/jvKZgjd/3.jpg" },
  { id: 151, url: "https://i.ibb.co/zmMpBHj/4.jpg" },
  { id: 149, url: "https://i.ibb.co/nkxPkSx/2.jpg" },
];
