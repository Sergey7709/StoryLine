export type User = {
  id: number;
  isAdmin: boolean;
  email: string;
  userImageUrl: string;
  name: string;
  about: string;
  favoriteItems: Item[];
  basketItems: Item[];
  orderItems: Order[];
  reviews: Item[];
  posts: Post[];
  token: string;
  phone: string;
  address: string;
};
export type Item = {
  id: number;
  inStock: boolean;
  title: string;
  itemImageUrl: string;
  description: string;
  price: number;
  category: string;
  publisher: string;
  genre: string;
  pagesCount: number;
  discount: number;
  authorBook: string;
  releaseDate: string;
  reviews: Review[];
};
export type PostCreate = {
  description: string;
  postImageUrl: string;
  title: string;
  date: string;
  likes: number;
};
export type PostUpdate = PostCreate & {
  id: number;
};
export type Post = PostUpdate & {
  authorId: number;
  authorName: string;
};

export type Review = {
  id: number;
  text: string;
  authorId: number;
  itemId: number;
  authorName: string;
  date: string;
  rate: number;
};
export type Order = {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  itemId: number[];
  date: string;
  totalPrice: number;
};
export type ItemsResponse = {
  items: Item[];
  totalItems: number;
  minPrice: number;
  maxPrice: number;
};
