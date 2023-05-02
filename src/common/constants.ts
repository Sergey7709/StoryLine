export const BASE_URL = "https://rest-api-books.onrender.com/";
export const LINKS = {
  links: [
    {
      link: "/catalog",
      label: "Каталог",
      links: [
        {
          link: "/BooksList",
          label: "Все книги",
          param: "all",
        },
        {
          link: "/BooksList",
          label: "Новинки",
          param: "all?category=Роман",
        },
        {
          link: "/BooksList",
          label: "Художественная литуратура",
          param: "all?category=Фантастика",
        },
        {
          link: "/BooksList",
          label: "Научная и научно-популярная литература",
          param: "all?category=Классика",
        },
        {
          link: "/BooksList",
          label: "Бизнес",
          param: "all?category=Классика",
        },
        {
          link: "/BooksList",
          label: "Детская литература",
          param: "all?category=Классика",
        },

        {
          link: "/BooksList",
          label: "Путешествия. Хобби. Досуг",
          param: "all?category=Классика",
        },
        {
          link: "/BooksList",
          label: "Компьютерная литература",
          param: "all?category=Классика",
        },
        {
          link: "/BooksList",
          label: "Искусство. Религия",
          param: "all?category=Классика",
        },
      ],
    },
    {
      link: "/stocks",
      label: "Акции",
    },
    {
      link: "/bookstoreServices",
      label: "Услуги",
    },

    {
      link: "/readerBlogs",
      label: "Блоги читателей",
    },
    {
      link: "/aboutUs",
      label: "О нас",
    },
  ],
};
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
