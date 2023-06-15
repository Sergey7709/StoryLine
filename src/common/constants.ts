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

export const CATEGORIES = [
  {
    link: "/books-list/Все книги",
    label: "Все книги",
    param: "all?",
  },
  {
    link: "/books-list/Новинки",
    label: "Новинки",
    param: "all?sortBy=releaseDate&sortOrder=desc&limit=8",
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

export const categoryNewBooks = "all?sortBy=releaseDate&sortOrder=desc&limit=8";

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
