import { useEffect, useState } from "react";
import { BsArrowUpSquare } from "react-icons/bs";
import styles from "./ScrollToTopButton.module.css";
import { ActionIcon } from "@mantine/core";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <ActionIcon
          size={"2rem"}
          variant="transparent"
          className={styles.scroll_to_top}
          onClick={handleButtonClick}
        >
          <BsArrowUpSquare size="2rem" />
        </ActionIcon>
      )}
    </>
  );
};
