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
  reviews: Review[];
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
  averageRate: number;
  typeOfCover: string;
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

export type Review = ReviewUpdate & {
  authorId: number;
  itemId: number;
  authorName: string;
  itemImageUrl: string;
  userImageUrl: string;
  itemTitle: string;
  id: number;
};
export type ReviewUpdate = {
  text: string;
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
  items: OrderItem[];
  date: string;
  totalPrice: number;
};
export type ItemsResponse = {
  items: Item[];
  totalItems: number;
  minPrice: number;
  maxPrice: number;
};
export type OrderItem = {
  imageUrl: string;
  price: number;
  count: number;
  title: string;
};

export type SortHandlerType = {
  sortHandler: (value: string) => void;
};

export type CartItem = Item & {
  count: number;
};

export type InitialStateCartSlice = {
  cartItems: CartItem[];
  totalCount: number;
  totalPrice: number;
};

// export type handleChangeCountItemProps = {
//   id: number;
//   count: number;
// };

export type handleChangeCountItemProps = {
  book: Item;
  count: number;
}; //!
