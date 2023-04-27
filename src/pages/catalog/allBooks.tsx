import React from "react";
import { Card, Image, Text } from "@mantine/core";

type ItemProps = {
  Title: string;
  Authored: string;
  Publisher: string;
  Series: string;
  TypeOfCover: string;
  YearOfPublication: number;
  NumberOfPages: number;
  Image: string;
  Article: number;
};

const books: ItemProps[] = [
  {
    Title: "To Kill a Mockingbird",
    Authored: "Harper Lee",
    Publisher: "J. B. Lippincott & Co.",
    Series: "N/A",
    TypeOfCover: "Hardcover",
    YearOfPublication: 1960,
    NumberOfPages: 281,
    Image: "https://cdn-icons-png.flaticon.com/512/5606/5606108.png",
    Article: 12232323,
  },
  {
    Title: "1984",
    Authored: "George Orwell",
    Publisher: "Secker & Warburg",
    Series: "N/A",
    TypeOfCover: "Paperback",
    YearOfPublication: 1949,
    NumberOfPages: 328,
    Image: "https://cdn-icons-png.flaticon.com/512/5606/5606108.png",
    Article: 12232350,
  },
  {
    Title: "The Great Gatsby",
    Authored: "F. Scott Fitzgerald",
    Publisher: "Charles Scribner's Sons",
    Series: "N/A",
    TypeOfCover: "Paperback",
    YearOfPublication: 1925,
    NumberOfPages: 180,
    Image: "https://cdn-icons-png.flaticon.com/512/5606/5606108.png",
    Article: 12232400,
  },
  {
    Title: "One Hundred Years of Solitude",
    Authored: "Gabriel Garcia Marquez",
    Publisher: "Harper & Row",
    Series: "N/A",
    TypeOfCover: "Paperback",
    YearOfPublication: 1967,
    NumberOfPages: 417,
    Image: "https://cdn-icons-png.flaticon.com/512/5606/5606108.png",
    Article: 12235670,
  },
  {
    Title: "The Catcher in the Rye",
    Authored: "J. D. Salinger",
    Publisher: "Little, Brown and Company",
    Series: "N/A",
    TypeOfCover: "Hardcover",
    YearOfPublication: 1951,
    NumberOfPages: 277,
    Image: "https://cdn-icons-png.flaticon.com/512/5606/5606108.png",
    Article: 12232777,
  },
  {
    Title: "Pride and Prejudice",
    Authored: "Jane Austen",
    Publisher: "T. Egerton",
    Series: "N/A",
    TypeOfCover: "Paperback",
    YearOfPublication: 1813,
    NumberOfPages: 279,
    Image: "https://cdn-icons-png.flaticon.com/512/5606/5606108.png",
    Article: 12232800,
  },
  {
    Title: "Beloved",
    Authored: "Toni Morrison",
    Publisher: "Alfred A. Knopf",
    Series: "N/A",
    TypeOfCover: "Hardcover",
    YearOfPublication: 1987,
    NumberOfPages: 321,
    Image: "https://cdn-icons-png.flaticon.com/512/5606/5606108.png",
    Article: 12232333,
  },
  {
    Title: "The Hobbit",
    Authored: "J. R. R. Tolkien",
    Publisher: "George Allen & Unwin",
    Series: "Middle-earth Universe",
    TypeOfCover: "Hardcover",
    YearOfPublication: 1937,
    NumberOfPages: 310,
    Image: "https://cdn-icons-png.flaticon.com/512/5606/5606108.png",
    Article: 12232555,
  },
  {
    Title: "The Lord of the Rings",
    Authored: "J. R. R. Tolkien",
    Publisher: "George Allen & Unwin",
    Series: "Middle-earth Universe",
    TypeOfCover: "Paperback",
    YearOfPublication: 1954,
    NumberOfPages: 1178,
    Image: "https://cdn-icons-png.flaticon.com/512/5606/5606108.png",
    Article: 12232999,
  },
  {
    Title: "The Hitchhiker's Guide to the Galaxy",
    Authored: "Douglas Adams",
    Publisher: "Pan Books",
    Series: "The Hitchhiker's Guide to the Galaxy",
    TypeOfCover: "Paperback",
    YearOfPublication: 1979,
    NumberOfPages: 215,
    Image: "https://cdn-icons-png.flaticon.com/512/5606/5606108.png",
    Article: 12232907,
  },
];

export const AllBooks = () => {
  return (
    <div>
      {books.map((book, index) => (
        <div key={index}>
          <h2>{book.Title}</h2>
          <p>Author: {book.Authored}</p>
          <p>Publisher: {book.Publisher}</p>
          <p>Series: {book.Series}</p>
          <p>Type of Cover: {book.TypeOfCover}</p>
          <p>Year of Publication: {book.YearOfPublication}</p>
          <p>Number of Pages: {book.NumberOfPages}</p>
          <p>Article: {book.Article}</p>
          <Image maw={100} radius="md" src={book.Image} alt="Random image" />
        </div>
      ))}
    </div>
  );
};
