import React, { ChangeEvent, useState } from "react";
import { useQuery } from "react-query";
import { Item } from "../common/types";
import { fetchItem } from "../api/itemsApi";
import { Input, Tooltip } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { TiDeleteOutline } from "react-icons/ti";

type BookSearchResponse = {
  data: Item[];
};

const BookSearch: React.FC = () => {
  const [searchBooks, setSearchBooks] = useState("");

  const [debouncedBooks] = useDebouncedValue(searchBooks, 1500);

  const { data } = useQuery<BookSearchResponse>(
    ["bookSearch", debouncedBooks],
    () => fetchItem(`all?title=${debouncedBooks}`)
  );

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchBooks(event.currentTarget.value);
  };

  const handleClearSerch = () => {
    setSearchBooks("");
  };
  console.log("data", data);
  // console.log("data", debouncedBooks);

  return (
    <>
      <Input
        className={""}
        placeholder="Введите название книги для поиска"
        value={searchBooks}
        icon={<IconSearch size="1rem" stroke={1.5} />}
        size="md"
        m={0}
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleSearch(event)}
        rightSection={
          <Tooltip label="This is public" position="top-end" withArrow>
            <div>
              <TiDeleteOutline
                size="1.2rem"
                style={{ display: "block", opacity: 0.5 }}
                onClick={handleClearSerch}
              />
            </div>
          </Tooltip>
        }
      />
    </>
  );
};

export default BookSearch;
