export const BASE_URL = 'https://rest-api-books.onrender.com/';
export const LINKS = {
  links: [
    {
      link: '/catalog',
      label: 'Каталог',
      links: [
        {
          link: '/BooksList',
          label: 'Все книги',
        },
        {
          link: '/newBooks',
          label: 'Новинки',
        },
        {
          link: '/fiction',
          label: 'Художественная литуратура',
        },
        {
          link: '/scientific',
          label: 'Научная и научно-популярная литература',
        },
        {
          link: '/business',
          label: 'Бизнес',
        },
        {
          link: '/childrenLiterature',
          label: 'Детская литература',
        },

        {
          link: '/travelHobbiesLeisure',
          label: 'Путешествия. Хобби. Досуг',
        },
        {
          link: '/computerBooks',
          label: 'Компьютерная литература',
        },
        {
          link: '/artReligion',
          label: 'Искусство. Религия',
        },
      ],
    },
    {
      link: '/stocks',
      label: 'Акции',
    },
    {
      link: '/bookstoreServices',
      label: 'Услуги',
    },

    {
      link: '/readerBlogs',
      label: 'Блоги читателей',
    },
    {
      link: '/aboutUs',
      label: 'О нас',
    },
  ],
};
export const DATA_FOR_AUTO_COMPLETE = [
  'Pushkin',
  'Harry',
  'Angular',
  'Vue',
  'Next',
  'Riot',
  'Svelte',
  'Blitz',
];
