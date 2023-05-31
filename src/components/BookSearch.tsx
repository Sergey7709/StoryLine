import React, { ChangeEvent, useState } from "react";
import { useQuery } from "react-query";
import { Item } from "../common/types";
import { fetchItem } from "../api/itemsApi";
import { Input, Tooltip } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { TiDeleteOutline } from "react-icons/ti";
import { useAppSelector } from "../redux/redux.hooks";
import { useDispatch } from "react-redux";
import { setSearchBooksValue } from "../redux/sortSlice";

type BookSearchResponse = {
  data: Item[];
};

const BookSearch: React.FC = () => {
  const { searchBooksValue } = useAppSelector((state) => state.sort);

  const dispatch = useDispatch();

  // const [searchBooksValue, setSearchBooksValue] = useState("");

  const [debouncedBooks] = useDebouncedValue(searchBooksValue, 1500);

  const { data } = useQuery<BookSearchResponse>(
    ["bookSearch", debouncedBooks],
    () => fetchItem(`all?title=${debouncedBooks}`)
  );

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    // setSearchBooksValue(event.currentTarget.value);
    dispatch(setSearchBooksValue(event.currentTarget.value));
  };

  const handleClearSerch = () => {
    dispatch(setSearchBooksValue(""));
    // setSearchBooksValue("");
  };
  console.log("data", data);
  // console.log("data", debouncedBooks);

  return (
    <>
      <Input
        className={""}
        placeholder="Введите название книги для поиска"
        value={searchBooksValue}
        icon={<IconSearch size="1rem" stroke={1.5} />}
        size="md"
        m={0}
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleSearch(event)}
        rightSection={
          <Tooltip
            label="Очистить поле ввода"
            bg={"cyan"}
            position="top-end"
            withArrow
          >
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
