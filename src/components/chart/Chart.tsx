import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { UseReaderBlogsApi } from "../../api/useReaderBlogsApi";
import { Center, Paper, Text, UnstyledButton } from "@mantine/core";
import { FaHandPointer } from "react-icons/fa";
import styles from "./chart.module.css";

type ResultObject = {
  date: string;
  count: number;
};

export const Chart: React.FC = () => {
  const { allDataReaderBlogs, isSuccess } = UseReaderBlogsApi();

  const countBlogs: { [date: string]: number } = {};

   isSuccess &&
    allDataReaderBlogs?.forEach((blog) => {
      if (countBlogs[blog.date]) {
        countBlogs[blog.date] += 1;
      } else {
        countBlogs[blog.date] = 1;
      }
    });

   const resultArray: ResultObject[] = Object.entries(countBlogs).map(
    ([date, count]) => ({
      date,
      count,
    })
  );

  const sortedDates = [...resultArray].sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split(".");
    const dateA = new Date(`${monthA}/${dayA}/${yearA}`);
    const [dayB, monthB, yearB] = b.date.split(".");
    const dateB = new Date(`${monthB}/${dayB}/${yearB}`);

    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    return 0;
  });

  const count = sortedDates.map((el) => el.count);

  const resultDate = sortedDates?.map((el) => el.date);

  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

  const labels = resultDate;

  const data = {
    labels,

    datasets: [
      {
        label: "Количество блогов наших читателей",
        data: count,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <UnstyledButton>
        <Paper
          maw={350}
          h={350}
          px={10}
          py={5}
          m={0}
          shadow="md"
          className={styles.card}
        >
          <Text
            fz={"md"}
            fw={"bold"}
            color="crimson"
            tt={"uppercase"}
            align="center"
            my={10}
          >
            Занимательная инфографика
          </Text>
          <Bar data={data} />

          <Text
            fz={"lg"}
            fw={"bold"}
            color="green"
            tt={"uppercase"}
            align="center"
            mt={30}
          >
            Ищите, что почитать?
          </Text>
          <Center>
            <FaHandPointer color="green" size={50} />
          </Center>
        </Paper>
      </UnstyledButton>
    </>
  );
};
