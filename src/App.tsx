import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { AppShell, Header, Footer } from "@mantine/core";
import { HeaderMenu } from "./components/headerMenu/headerMenu";
import { BooksList } from "./pages/catalog/BooksList";
import { Authorization } from "./pages/authorization/authorization";
import { Error404 } from "./pages/error404/error404";
import { useAutoLogin } from "./hooks/useAutoLogin";
import { LINKS } from "./common/constants";
import UserAccount from "./pages/userAccount/UserAccount";
import { Home } from "./pages/home/Home";
import { Cart } from "./pages/cart/Cart";
import { Favorites } from "./pages/favorites/Favorites";
import { Stocks } from "./pages/stocks/Stocks";
import { BookstoreServices } from "./pages/bookstoreServices/BookstoreServices";
import { ReaderBlogs } from "./pages/readerBlogs/ReaderBlogs";
import { AboutUs } from "./pages/aboutUs/AboutUs";

export default function App() {
  useAutoLogin();
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
        <Notifications />
        <AppShell
          header={
            <Header height={{ base: 100, md: 100 }} p="md">
              <HeaderMenu {...LINKS} />
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
            <Route path={"/user-account"} element={<UserAccount />} />
            <Route path={"/*"} element={<Error404 />} />
          </Routes>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
