<<<<<<< HEAD
=======

>>>>>>> 63c59a4152d6253836a0648cfafde97d9bf212f5
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import { AppShell, Header, Footer } from '@mantine/core';
import { HeaderMenu } from './components/headerMenu/headerMenu';
import { BooksList } from './pages/catalog/BooksList';
import { Error404 } from './pages/error404/error404';
import { useAutoLogin } from './hooks/useAutoLogin';
import { LINKS } from './common/constants';
import UserAccount from './pages/userAccount/UserAccount';

<<<<<<< HEAD
import CustomScrollbar from './components/customScrollbar/CustomScrollbar';
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';
import { Favorites } from './pages/favorites/favorites';
import { Stocks } from './pages/stocks/stocks';
import { BookstoreServices } from './pages/bookstoreServices/bookstoreServices';
import { ReaderBlogs } from './pages/readerBlogs/readerBlogs';
import { AboutUs } from './pages/aboutUs/aboutUs';
=======
>>>>>>> 63c59a4152d6253836a0648cfafde97d9bf212f5

export default function App() {
  useAutoLogin();
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
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
          }>
<<<<<<< HEAD
          <CustomScrollbar>
            <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path={'/cart'} element={<Cart />} />
              <Route path={'/favorites'} element={<Favorites />} />
              <Route path={'/stocks'} element={<Stocks />} />
              <Route path={'/bookstoreServices'} element={<BookstoreServices />} />
              <Route path={'/readerBlogs'} element={<ReaderBlogs />} />
              <Route path={'/aboutUs'} element={<AboutUs />} />
              <Route path={'/BooksList'} element={<BooksList />} />
              <Route path={'/user-account'} element={<UserAccount />} />
              <Route path={'/*'} element={<Error404 />} />
            </Routes>
          </CustomScrollbar>
=======
          <Routes>

            <Route path={'/'} element={<Home />} />
            <Route path={'/cart'} element={<Cart />} />
            <Route path={'/favorites'} element={<Favorites />} />
            <Route path={'/stocks'} element={<Stocks />} />
            <Route path={'/bookstoreServices'} element={<BookstoreServices />} />
            <Route path={'/readerBlogs'} element={<ReaderBlogs />} />
            <Route path={'/aboutUs'} element={<AboutUs />} />
            <Route path={'/BooksList'} element={<BooksList />} />
            <Route path={'/user-account'} element={<UserAccount />} />
            <Route path={'/*'} element={<Error404 />} />

          </Routes>
>>>>>>> 63c59a4152d6253836a0648cfafde97d9bf212f5
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
