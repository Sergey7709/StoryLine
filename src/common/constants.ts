export const BASE_URL = "https://rest-api-books.onrender.com/";

export const CategoryBooks = {
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
          param: "all?sortBy=releaseDate&sortOrder=desc&limit=6",
        },
        {
          link: "/BooksList",
          label: "Художественная литература",
          param: "all?category=Художественная литература",
        },
        {
          link: "/BooksList",
          label: "Научная и научно-популярная литература",
          param: "all?category=Научная и научно-популярная литература",
        },
        {
          link: "/BooksList",
          label: "Бизнес",
          param: "all?category=Бизнес",
        },
        {
          link: "/BooksList",
          label: "Детская литература",
          param: "all?category=Детская литература",
        },

        {
          link: "/BooksList",
          label: "Путешествия. Хобби. Досуг",
          param: "all?category=Путешествия. Хобби. Досуг",
        },
        {
          link: "/BooksList",
          label: "Компьютерная литература",
          param: "all?category=Компьютерная литература",
        },
        {
          link: "/BooksList",
          label: "Искусство. Религия",
          param: "all?category=Искусство. Религия",
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
