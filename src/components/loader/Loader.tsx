import { FC } from "react";
import styles from "./loader.module.css";

type LoaderPropsType = {
  title: string;
};

export const Loader: FC<LoaderPropsType> = ({ title }) => {
  return (
    <div className={styles.loader}>
      <p className={styles.text}>{title}</p>
    </div>
  );
};
