import React, { useState } from "react";
import { useQuery } from "react-query";
import { Item } from "../common/types";
import { fetchItem } from "../api/itemsApi";
import { Autocomplete } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { DATA_FOR_AUTO_COMPLETE } from "../common/constants";
import { useDebouncedValue } from "@mantine/hooks";

type BookSearchResponse = {
  data: Item[];
};

const BookSearch: React.FC = () => {
  const [searchBooks, setSearchBooks] = useState("");

  const [debouncedBooks] = useDebouncedValue(searchBooks, 1000);

  const { data } = useQuery<BookSearchResponse>(
    ["bookSearch", debouncedBooks],
    () => fetchItem(`all?title=${debouncedBooks}`)
  );

  const handleSearch = (event: string) => {
    setSearchBooks(event);
  };

  // console.log("data", debouncedBooks);
  console.log("data", data);
  // console.log(`all?title=${debouncedBooks}`);

  return (
    <>
      <Autocomplete
        className={""}
        placeholder="Search"
        icon={<IconSearch size="1rem" stroke={1.5} />}
        size="md"
        data={DATA_FOR_AUTO_COMPLETE}
        m={0}
        onChange={(event) => handleSearch(event)}
      />
    </>
  );
};

export default BookSearch;
