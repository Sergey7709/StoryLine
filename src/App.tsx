import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import { AppShell, Header, Footer } from '@mantine/core';
import { BooksList } from './pages/catalog/BooksList';
import { Error404 } from './pages/error404/error404';
import { useAutoLogin } from './hooks/useAutoLogin';
import UserAccount from './pages/userAccount/UserAccount';
import CustomScrollbar from './components/customScrollbar/CustomScrollbar';
import { ScrollToTopButton } from './components/scroll-to-top-button/ScrollToTopButton';
import ChatBot from './components/chatBot/ChatBot';
import { Stocks } from './pages/stocks/stocks';
import HeaderMenu from './components/headerMenu/headerMenu';
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';
import { AboutUs } from './pages/aboutUs/aboutUs';
import { BookstoreServices } from './pages/bookstoreServices/bookstoreServices';
import { BookCard } from './pages/catalog/bookcard';
import { Favorites } from './pages/favorites/favorites';
import { ReaderBlogs } from './pages/readerBlogs/readerBlogs';

export default function App() {
  console.log('render APP');
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
              <HeaderMenu />
            </Header>
          }
          footer={
            <Footer height={60} p="md">
              © 2023 World of books. All rights reserved.
            </Footer>
          }>
          <ChatBot />
          <CustomScrollbar>
            <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path={'/cart'} element={<Cart />} />
              <Route path={'/favorites'} element={<Favorites />} />
              <Route path={'/stocks'} element={<Stocks />} />
              <Route path={'/bookstores-services'} element={<BookstoreServices />} />
              <Route path={'/reader-blogs'} element={<ReaderBlogs />} />
              <Route path={'/about-us'} element={<AboutUs />} />
              <Route path={'/books-list'} element={<BooksList />} />
              <Route path={'/book-card'} element={<BookCard />} />
              <Route path={'/user-account'} element={<UserAccount />} />
              <Route path={'*'} element={<Error404 />} />
            </Routes>
            <ScrollToTopButton />
          </CustomScrollbar>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
