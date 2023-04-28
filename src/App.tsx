import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Error404 } from "./pages/error404/Error404";
import { Stocks } from "./pages/stocks/Stocks";
import { BookstoreServices } from "./pages/bookstoreServices/BookstoreServices";
import { ReaderBlogs } from "./pages/readerBlogs/ReaderBlogs";
import { AboutUs } from "./pages/aboutUs/AboutUs";
import { Cart } from "./pages/cart/Cart";
import { Authorization } from "./pages/authorization/Authorization";
import { Favorites } from "./pages/favorites/Favorites";
import { Home } from "./pages/home/Home";
import { AppShell, Header, Footer, Text } from "@mantine/core";
import { HeaderMenu } from "./components/headerMenu/headerMenu";
import { BooksList } from "./pages/catalog/BooksList";

const links = {
  links: [
    {
      link: "/catalog",
      label: "Каталог",
      links: [
        {
          link: "/BooksList",
          label: "Все книги",
        },
        {
          link: "/newBooks",
          label: "Новинки",
        },
        {
          link: "/fiction",
          label: "Художественная литуратура",
        },
        {
          link: "/scientific",
          label: "Научная и научно-популярная литература",
        },
        {
          link: "/business",
          label: "Бизнес",
        },
        {
          link: "/childrenLiterature",
          label: "Детская литература",
        },

        {
          link: "/travelHobbiesLeisure",
          label: "Путешествия. Хобби. Досуг",
        },
        {
          link: "/computerBooks",
          label: "Компьютерная литература",
        },
        {
          link: "/artReligion",
          label: "Искусство. Религия",
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

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          header={
            <Header height={{ base: 100, md: 100 }} p="md">
              <HeaderMenu {...links} />
            </Header>
          }
          footer={
            <Footer height={60} p="md">
              © 2023 World of books. All rights reserved.
            </Footer>
          }
        >
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/authorization"} element={<Authorization />} />
            <Route path={"/cart"} element={<Cart />} />
            <Route path={"/favorites"} element={<Favorites />} />
            <Route path={"/stocks"} element={<Stocks />} />
            <Route
              path={"/bookstoreServices"}
              element={<BookstoreServices />}
            />
            <Route path={"/readerBlogs"} element={<ReaderBlogs />} />
            <Route path={"/aboutUs"} element={<AboutUs />} />

            <Route path={"/BooksList"} element={<BooksList />} />

            <Route path={"/*"} element={<Error404 />} />
          </Routes>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
