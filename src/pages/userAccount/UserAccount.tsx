import { useState } from 'react';
import styles from './user-account.module.css';
import { Tabs } from '@mantine/core';
import MyProfile from './MyProfile';
import MyFavorites from './MyFavorites';
import MyOrders from './MyOrders';
import MyReviews from './MyReviews';
import MyPosts from './MyPosts';
import ChangeMyData from './ChangeMyData';
const UserAccount = () => {
  const [activeTab, setActiveTab] = useState<string | null>('profile');
  return (
    <Tabs value={activeTab} onTabChange={setActiveTab} color="violet">
      <Tabs.List position="center" grow>
        <Tabs.Tab value="profile">Мой профиль</Tabs.Tab>
        <Tabs.Tab value="favorites">Мои избранные товары</Tabs.Tab>
        <Tabs.Tab value="orders">Мои заказы</Tabs.Tab>
        <Tabs.Tab value="reviews">Мои отзывы</Tabs.Tab>
        <Tabs.Tab value="posts">Мои посты</Tabs.Tab>
        <Tabs.Tab value="change">Изменить мои данные</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="profile">
        <MyProfile />
      </Tabs.Panel>
      <Tabs.Panel value="favorites">
        <MyFavorites />
      </Tabs.Panel>
      <Tabs.Panel value="orders">
        <MyOrders />
      </Tabs.Panel>
      <Tabs.Panel value="reviews">
        <MyReviews />
      </Tabs.Panel>
      <Tabs.Panel value="posts">
        <MyPosts />
      </Tabs.Panel>
      <Tabs.Panel value="change">
        <ChangeMyData />
      </Tabs.Panel>
    </Tabs>
  );
};

export default UserAccount;
