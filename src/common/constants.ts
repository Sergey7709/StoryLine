export const BASE_URL = 'https://rest-api-books.onrender.com/';

export const NAV_BUTTONS = [
  {
    link: '',
    label: 'Каталог',
  },
  {
    link: '/stocks',
    label: 'Акции',
  },
  {
    link: '/bookstores-services',
    label: 'Услуги',
  },

  {
    link: '/reader-blogs',
    label: 'Блоги читателей',
  },
  {
    link: '/about-us',
    label: 'О нас',
  },
];

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

export const CATEGORIES = [
  {
    link: '/books-list',
    label: 'Все книги',
    param: 'all',
  },
  {
    link: '/books-list',
    label: 'Новинки',
    param: 'all?sortBy=releaseDate&sortOrder=desc&limit=6',
  },
  {
    link: '/books-list',
    label: 'Художественная литература',
    param: 'all?category=Художественная литература',
  },
  {
    link: '/books-list',
    label: 'Научная и научно-популярная литература',
    param: 'all?category=Научная и научно-популярная литература',
  },
  {
    link: '/books-list',
    label: 'Бизнес',
    param: 'all?category=Бизнес',
  },
  {
    link: '/books-list',
    label: 'Детская литература',
    param: 'all?category=Детская литература',
  },

  {
    link: '/books-list',
    label: 'Путешествия. Хобби. Досуг',
    param: 'all?category=Путешествия. Хобби. Досуг',
  },
  {
    link: '/books-list',
    label: 'Компьютерная литература',
    param: 'all?category=Компьютерная литература',
  },
  {
    link: '/books-list',
    label: 'Искусство. Религия',
    param: 'all?category=Искусство. Религия',
  },
];
