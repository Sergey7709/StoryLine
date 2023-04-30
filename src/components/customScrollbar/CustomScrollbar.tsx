import { ReactNode } from "react";
import "./сustomScrollbar.css";

type FullScreenScrollProps = {
  children: ReactNode;
};

const CustomScrollbar = ({ children }: FullScreenScrollProps) => {
  return <div className="custom-scrollbar">{children}</div>;
};

export default CustomScrollbar;
