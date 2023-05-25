import { InitialStateCartSlice } from "./types";

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

export const DATA_FOR_AUTO_COMPLETE = [
  "Pushkin",
  "Harry",
  "Angular",
  "Vue",
  "Next",
  "Riot",
  "Svelte",
  "Blitz",
];

export const CATEGORIES = [
  {
    link: "/books-list",
    label: "Все книги",
    param: "all?", //!
  },
  {
    link: "/books-list",
    label: "Новинки",
    param: "all?sortBy=releaseDate&sortOrder=desc&limit=8",
  },
  {
    link: "/books-list",
    label: "Художественная литература",
    param: "all?category=Художественная литература",
  },
  {
    link: "/books-list",
    label: "Научная и научно-популярная литература",
    param: "all?category=Научная и научно-популярная литература",
  },
  {
    link: "/books-list",
    label: "Бизнес",
    param: "all?category=Бизнес",
  },
  {
    link: "/books-list",
    label: "Детская литература",
    param: "all?category=Детская литература",
  },

  {
    link: "/books-list",
    label: "Путешествия. Хобби. Досуг",
    param: "all?category=Путешествия. Хобби. Досуг",
  },
  {
    link: "/books-list",
    label: "Компьютерная литература",
    param: "all?category=Компьютерная литература",
  },
  {
    link: "/books-list",
    label: "Искусство. Религия",
    param: "all?category=Искусство. Религия",
  },
];

export const menuSortData = [
  {
    key: "sortName",
    title: "Наименованию",
    options: [
      { value: "&sortBy=title&sortOrder=asc", subtitle: "Наименованию А-Я" },
      { value: "&sortBy=title&sortOrder=desc", subtitle: "Наименованию Я-А" },
    ],
  },
  {
    key: "sortRating",
    title: "Рейтингу",
    options: [
      {
        value: "&sortBy=averageRate&sortOrder=asc",
        subtitle: "Рейтингу возрастанию",
      },
      {
        value: "&sortBy=averageRate&sortOrder=desc",
        subtitle: "Рейтингу убыванию",
      },
    ],
  },
  {
    key: "sortCost",
    title: "Цене",
    options: [
      { value: "&sortBy=price&sortOrder=asc", subtitle: "Цене возрастанию" },
      { value: "&sortBy=price&sortOrder=desc", subtitle: "Цене убыванию" },
    ],
  },
  {
    key: "sortData",
    title: "Дате выхода",
    options: [
      {
        value: "&sortBy=releaseDate&sortOrder=asc",
        subtitle: "Дате возрастанию",
      },
      {
        value: "&sortBy=releaseDate&sortOrder=desc",
        subtitle: "Дате убыванию",
      },
    ],
  },
];
export const categoryNewBooks = "all?sortBy=releaseDate&sortOrder=desc&limit=8";

export const updateCartTotals = (
  state: InitialStateCartSlice,
  totalPrice: number,
  type: string,
  count = 1 //!
) => {
  switch (type) {
    case "add":
      state.totalCount += 1;
      state.totalPrice = totalPrice;
      break;
    case "increment":
      state.totalCount += 1;
      state.totalPrice += totalPrice;
      break;
    case "decrement":
      state.totalCount -= 1;
      state.totalPrice -= totalPrice;
      break;
    case "handleChange": //!
      state.totalCount = count;
      state.totalPrice = totalPrice;
      break;
    default:
      break;
  }
};

export const updateLocalStorage = (state: InitialStateCartSlice) => {
  localStorage.setItem("cartItems", JSON.stringify(state));
};
