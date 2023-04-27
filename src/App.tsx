import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  ScrollArea,
} from "@mantine/core";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Error404 } from "./pages/error404/error404";
import { Stocks } from "./pages/stocks/stocks";
import { BookstoreServices } from "./pages/bookstoreServices/bookstoreServices";
import { ReaderBlogs } from "./pages/readerBlogs/readerBlogs";
import { AboutUs } from "./pages/aboutUs/aboutUs";
import { Cart } from "./pages/cart/cart";
import { Authorization } from "./pages/authorization/authorization";
import { Favorites } from "./pages/favorites/favorites";
import { Home } from "./pages/home/home";
import { AppShell, Header, Footer, Text } from "@mantine/core";
import { HeaderMenu } from "./components/headerMenu/headerMenu";
import { NewBooks } from "./pages/catalog/newBooks";
import { Fiction } from "./pages/catalog/fiction";
import { Scientific } from "./pages/catalog/scientific";
import { Business } from "./pages/catalog/business";
import { ChildrenLiterature } from "./pages/catalog/childrenLiterature";
import { TravelHobbiesLeisure } from "./pages/catalog/travelHobbiesLeisure";
import { ComputerBooks } from "./pages/catalog/computerBooks";
import { ArtReligion } from "./pages/catalog/artReligion";
import { AllBooks } from "./pages/catalog/allBooks";

const links = {
  links: [
    {
      link: "/catalog",
      label: "Каталог",
      links: [
        {
          link: "/allBooks",
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

            <Route path={"/allBooks"} element={<AllBooks />} />
            <Route path={"/newBooks"} element={<NewBooks />} />
            <Route path={"/fiction"} element={<Fiction />} />
            <Route path={"/scientific"} element={<Scientific />} />
            <Route path={"/business"} element={<Business />} />
            <Route
              path={"/childrenLiterature"}
              element={<ChildrenLiterature />}
            />
            <Route
              path={"/travelHobbiesLeisure"}
              element={<TravelHobbiesLeisure />}
            />
            <Route path={"/computerBooks"} element={<ComputerBooks />} />
            <Route path={"/artReligion"} element={<ArtReligion />} />

            <Route path={"/*"} element={<Error404 />} />
          </Routes>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
