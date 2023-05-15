import { useState } from 'react';
import { Tabs } from '@mantine/core';
import MyProfile from './MyProfile';
import MyOrders from './MyOrders';
import MyReviews from './MyReviews';
import MyPosts from './MyPosts';
import { useAppSelector } from '../../redux/redux.hooks';
import { Favorites } from '../favorites/Favorites';

const UserAccount = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState<string | null>('profile');
  console.log(user);
  if (!user) return <div>Только для авториизованных пользователей</div>;
  return (
    <Tabs value={activeTab} onTabChange={setActiveTab} color="violet">
      <Tabs.List position="center" grow>
        <Tabs.Tab value="profile">Мой профиль</Tabs.Tab>
        <Tabs.Tab value="favorites">Мои избранные товары</Tabs.Tab>
        <Tabs.Tab value="orders">Мои заказы</Tabs.Tab>
        <Tabs.Tab value="reviews">Мои отзывы</Tabs.Tab>
        <Tabs.Tab value="posts">Мои посты</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="profile">
        <MyProfile user={user} />
      </Tabs.Panel>
      <Tabs.Panel value="favorites">
        <Favorites />
      </Tabs.Panel>
      <Tabs.Panel value="orders">
        <MyOrders orders={user.orderItems} />
      </Tabs.Panel>
      <Tabs.Panel value="reviews">
        <MyReviews />
      </Tabs.Panel>
      <Tabs.Panel value="posts">
        <MyPosts token={user.token} posts={user.posts} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default UserAccount;
