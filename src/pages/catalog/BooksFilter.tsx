import { Group, Text, Menu, UnstyledButton } from "@mantine/core";
import { useState } from "react";

type SortType = {
  sortName: string;
  sortRating: string;
  sortCost: string;
  sortData: string;
  price: string;
  priceEnd: string;
};

const initialState: SortType = {
  sortName: "",
  sortRating: "",
  sortCost: "",
  sortData: "",
  price: "",
  priceEnd: "",
};

const menuData = [
  {
    key: "sortName",
    title: "Наименованию",
    options: [
      { value: "asc", subtitle: "Наименованию up" },
      { value: "desc", subtitle: "Наименованию down" },
    ],
  },
  {
    key: "sortRating",
    title: "Рейтингу",
    options: [
      { value: "asc", subtitle: "Рейтингу up" },
      { value: "desc", subtitle: "Рейтингу down" },
    ],
  },
  {
    key: "sortCost",
    title: "Цене",
    options: [
      { value: "asc", subtitle: "Цене up" },
      { value: "desc", subtitle: "Цене down" },
    ],
  },
  {
    key: "sortData",
    title: "Дате выхода",
    options: [
      { value: "asc", subtitle: "Дате выхода up" },
      { value: "desc", subtitle: "Дате выхода down" },
    ],
  },
];

export function BooksFilter() {
  const [sortCategories, setSortCategories] = useState<SortType>(initialState);

  const sortHandler = (key: keyof SortType, value: string) => {
    setSortCategories((prevState) => ({ ...prevState, [key]: value }));
  };

  const { sortName, sortRating, sortCost, sortData, price, priceEnd } =
    sortCategories;

  const param = `${sortName}${sortRating}${sortCost}${sortData}${price}${priceEnd}`; //! тест

  console.log(param);

  return (
    <Group position="center">
      <Menu
        shadow="md"
        // withArrow
        width={200}
        offset={0}
        // position="right-start"
        trigger="hover"
      >
        <Menu.Target>
          <UnstyledButton>
            <Text size={"md"} color="blue" weight={500}>
              Сортировать книги по...
            </Text>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          {menuData.map((menuItem) => (
            <Menu
              position="right-start"
              trigger="hover"
              width={200}
              offset={5}
              key={menuItem.key}
            >
              <Menu.Target>
                <Menu.Item>
                  <Text size="md" color="blue" weight={300}>
                    {menuItem.title}
                  </Text>
                  <Menu.Dropdown>
                    {menuItem.options.map((option) => (
                      <Menu.Item
                        key={option.value}
                        onClick={() =>
                          sortHandler(
                            menuItem.key as keyof SortType,
                            option.value
                          )
                        }
                      >
                        {option.subtitle}
                      </Menu.Item>
                    ))}
                  </Menu.Dropdown>
                </Menu.Item>
              </Menu.Target>
            </Menu>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );

  // return (
  //   <Group position="center">
  //     <Menu
  //       shadow="md"
  //       // withArrow
  //       width={200}
  //       offset={0}
  //       // position="right-start"
  //       trigger="hover"
  //     >
  //       <Menu.Target>
  //         <UnstyledButton>
  //           <Text size={"md"} color="blue" weight={500}>
  //             Сортировать книги по...
  //           </Text>
  //         </UnstyledButton>
  //       </Menu.Target>
  //       <Menu.Dropdown>
  //         <Menu position="right-start" trigger="hover" width={200} offset={5}>
  //           <Menu.Target>
  //             <Menu.Item>
  //               <Text size={"md"} color="blue" weight={300}>
  //                 Наименованию
  //               </Text>
  //               <Menu.Dropdown>
  //                 <Menu.Item onClick={() => sortHandler("sortName", "asc")}>
  //                   Наименованию up
  //                 </Menu.Item>
  //                 <Menu.Item onClick={() => sortHandler("sortName", "desc")}>
  //                   Наименованию down
  //                 </Menu.Item>
  //               </Menu.Dropdown>
  //             </Menu.Item>
  //           </Menu.Target>
  //         </Menu>
  //         <Menu position="right-start" trigger="hover" width={200} offset={5}>
  //           <Menu.Target>
  //             <Menu.Item>
  //               <Text size={"md"} color="blue" weight={300}>
  //                 Рейтингу
  //               </Text>
  //               <Menu.Dropdown>
  //                 <Menu.Item onClick={() => sortHandler("sortRating", "asc")}>
  //                   Рейтингу up
  //                 </Menu.Item>
  //                 <Menu.Item onClick={() => sortHandler("sortRating", "desc")}>
  //                   Рейтингу down
  //                 </Menu.Item>
  //               </Menu.Dropdown>
  //             </Menu.Item>
  //           </Menu.Target>
  //         </Menu>
  //         <Menu position="right-start" trigger="hover" width={200} offset={5}>
  //           <Menu.Target>
  //             <Menu.Item>
  //               <Text size={"md"} color="blue" weight={300}>
  //                 Цене
  //               </Text>
  //               <Menu.Dropdown>
  //                 <Menu.Item onClick={() => sortHandler("sortCost", "asc")}>
  //                   Цене up
  //                 </Menu.Item>
  //                 <Menu.Item onClick={() => sortHandler("sortCost", "desc")}>
  //                   Цене down
  //                 </Menu.Item>
  //               </Menu.Dropdown>
  //             </Menu.Item>
  //           </Menu.Target>
  //         </Menu>
  //         <Menu position="right-end" trigger="hover" width={200} offset={5}>
  //           <Menu.Target>
  //             <Menu.Item>
  //               <Text size={"md"} color="blue" weight={300}>
  //                 Дате выхода
  //               </Text>
  //               <Menu.Dropdown>
  //                 <Menu.Item>Дате выхода up</Menu.Item>
  //                 <Menu.Item>Дате выхода down</Menu.Item>
  //               </Menu.Dropdown>
  //             </Menu.Item>
  //           </Menu.Target>
  //         </Menu>
  //       </Menu.Dropdown>
  //     </Menu>
  //   </Group>
  // );
}
