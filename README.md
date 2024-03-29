# Проект StoryLine "Мир Книг" 📖

Проект развернут и доступен по адресу: [books-store-one.vercel.app](https://books-store-one.vercel.app/)

## Концепция 🎯

Приложение книжного магазина имеет следующие функции:

✅   Регистрация и авторизация пользователей

✅   Поиск и сортировка книг по различным критериям (разделы, категории, название, цена и т.д.)

✅   Просмотр подробной информации о книге (описание, отзывы, фото и т.д.)

✅   Добавление книг в избранное пользователя

✅   Добавление книг в корзину и оформление заказа

✅   Управление личным кабинетом (просмотр истории заказов, изменение данных и т.д.)

Блоги пользователей с возможностью редактирования своих постов и оценки постов других пользователей.

## Технологии 💻

Обоснование выбора технологий для разработки сайта основано на следующих критериях:

✚ Скорость и производительность

✚ Надежность и безопасность

✚ Гибкость и масштабируемость

✚ Удобство и эффективность разработки

### Фронтенд

Для фронтенда выбраны следующие технологии:

- **React** - популярная библиотека для создания пользовательского интерфейса
- **TypeScript** - язык программирования, который представляет собой надмножество языка JavaScript, добавляет статическую типизацию и другие возможности
- **Redux Toolkit** - библиотека для управления состоянием приложения с использованием Redux
- **Axios** - библиотека для выполнения HTTP-запросов в браузере и на стороне сервера. Она предоставляет удобные методы для отправки запросов, обработки ошибок
- **React Query (TanStack Query)** - библиотека для управления состоянием и кэширования данных на клиентской стороне. Она предоставляет инструменты для выполнения запросов к API, кэширования данных и обработки различных состояний загрузки
- **Mantine UI** - современный и модульный набор компонентов пользовательского интерфейса для React. Он предоставляет качественные и стилизованные компоненты, которые можно легко настроить и использовать для быстрой разработки интерфейса
- **Chart.js** - библиотека для создания различных типов диаграмм

### Бэкенд

Для бэкенда выбраны следующие технологии:

- **NestJS** - прогрессивный фреймворк для создания эффективных и масштабируемых серверных приложений на Node.js
- **TypeORM** - ORM (объектно-реляционное отображение) библиотека для работы с базами данных с использованием TypeScript
- **PostgreSQL** - расширяемая система управления базами данных (СУБД), предназначенная для хранения и обработки больших объемов данных

## Разработка 🚀

### Фронтенд

Кошелев С.А. отвечал за реализацию:

- API каталога, получения и редактирования пользовательских блогов, избранного, корзины товаров
- Компоненты:  каталог, блок книг, поиск и сортировка книг, избранного, корзины, пользовательских блогов, диаграммы, карусели, Header, Footer, 404, ошибки сети, пагинации, анимации загрузки, а также их верстка и Redux логика
- Страницы:  «О нас», главная, доставка, акции, блоги читателей, каталог
- Роутинг

Шимкович Д.В. отвечал за реализацию:

- API запросов авторизации и регистрации пользователей, получения и редактирования постов пользователей, отзывов
- Компоненты авторизации пользователя, аккаунта, личного кабинета, чат бота, их верстка и Redux логика

### Бэкенд

Полностью реализовал Шимкович Д.В.
