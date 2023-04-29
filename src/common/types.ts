export type User = {
  id: number;
  isAdmin: boolean;
  email: string;
  userImageUrl: string;
  name: string;
  about: string;
  favoriteItems: Item[];
  basketItems: Item[];
  orderItems: Item[];
  reviews: Item[];
  posts: Post[];
  token: string;
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
export type Post = {
  id: number;
  description: string;
  postImageUrl: string;
  title: string;
  date: string;
  authorName: string;
  authorId: number;
  likes: number;
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
