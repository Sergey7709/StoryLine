import React, { ChangeEvent, useEffect, useState } from "react";
import { Input, Tooltip } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { setSearchBooksValue } from "../redux/sortSlice";
import { currentFilter } from "../redux/filterSlice";

type classesProps = {
  classes: string;
};

const BookSearch = ({ classes }: classesProps) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState<string>("");

  const [debouncedBooks] = useDebouncedValue<string>(value, 1500);

  useEffect(() => {
    if (debouncedBooks !== "") {
      dispatch(setSearchBooksValue(`title=${debouncedBooks}`));
      dispatch(currentFilter("all?"));
    } else {
      dispatch(setSearchBooksValue(""));
    }
  }, [debouncedBooks]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleClearSerch = () => {
    setValue("");
  };

  return (
    <>
      <Input
        className={classes}
        placeholder="поиск"
        value={value}
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
