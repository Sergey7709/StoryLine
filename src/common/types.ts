import { UseMutationResult } from "react-query";
import { FetchReviewArgs } from "../pages/userAccount/MyReviews";
import { getCurrentDate } from "../helpers/getCurrentDate";
import { FetchType } from "../api/postOrReviewApi";

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
  items: string;
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

export type handleChangeCountItemProps = {
  book: Item;
  count: number;
};

export type OrderData = {
  id: number;
  userId: number | undefined;
  userName: string | undefined;
  userEmail: string | undefined;
  userPhone: string | undefined;
  userAddress: string | undefined;
  items: string;
  date: Date;
  totalPrice: number;
};

export type ActiveCartProps = {
  handleDeleteCartItem: (bookID: number) => void;
  handleAddOrder: () => void;
  cartItems: CartItem[];
  totalCount: number;
  totalPrice: number;
};

export type CartBarProps = {
  book: Item;
  countBar?: number;
  incrementCountBar?: () => void;
  decrementCountBar?: () => void;
  handleChangeCountBar?: (value: number) => void;
};

export type BookCardLayoutProps = {
  data: Item | undefined;
  isLoading: boolean;
  countBar: number;
  incrementCountBar: () => void;
  decrementCountBar: () => void;
  handleChangeCountBar: (value: number) => void;
  handleAddCartItem: () => void;
  opened: boolean;
  close: () => void;
  setReview: React.Dispatch<React.SetStateAction<ReviewUpdate>>;
  review: ReviewUpdate;
  submitReview: (itemId: number) => Promise<void>;
  reviewMutation: UseMutationResult<any, unknown, FetchReviewArgs, unknown>;
  open: () => void;
};

export type HandlersProps = {
  readonly open: () => void;
};

export const initialPostState = {
  description: "",
  postImageUrl: "",
  title: "",
  likes: 0,
  date: getCurrentDate(),
};

export type UpdatePostArgs = {
  params: string;
  token: string;
  body?: PostUpdate | PostCreate;
  type: FetchType;
};

export type MyPostsProps = {
  posts: Post[];
  token: string;
};

export type PostReaderBlogs = {
  mutatePost: UseMutationResult<any, unknown, UpdatePostArgs, unknown>;
  postForm: PostCreate | Post;
  close: () => void;
};

export type ReaderBlogsModalFormProps = {
  opened: boolean;
  close: () => void;
  postForm: PostCreate | Post;
  setPostForm: React.Dispatch<React.SetStateAction<PostCreate | Post>>;
  currentPost: number | "create";
  mutatePost: UseMutationResult<any, unknown, UpdatePostArgs, unknown>;
  submitPost: (type: FetchType, id?: number) => Promise<void>;
  onAuth: boolean;
  closeAuth: () => void;
};
