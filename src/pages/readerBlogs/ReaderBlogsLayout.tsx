import {
  Grid,
  Card,
  Group,
  UnstyledButton,
  ActionIcon,
  Badge,
  Image,
  Text,
  Tooltip,
} from "@mantine/core";
import { AiTwotoneLike } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { Post, PostCreate } from "../../common/types";
import { useStyles } from "./ReaderBlogsStyle";
import { memo } from "react";
import { useAppSelector } from "../../redux/redux.hooks";

type ReaderBlogsLayoutType = {
  data: Post[] | undefined;
  open: () => void;
  addCurrentPostHadler: (id: number) => void;
  addLikeHandler: ({
    description,
    postImageUrl,
    title,
    date,
    likes,
    id,
  }: PostCreate & {
    id: number;
  }) => void;
};

export const ReaderBlogsLayout = memo((props: ReaderBlogsLayoutType) => {
  const { open, addLikeHandler, addCurrentPostHadler } = props;

  const user = useAppSelector((state) => state.auth.user);

  const { classes } = useStyles();

  const readerBlogs = useAppSelector(
    (state) => state.readerBlogs.dataReaderBlogs
  );

  const dataReaderBlogsSort = [...(readerBlogs ?? [])].sort(
    (a: Post, b: Post) => {
      const dateA = new Date(a.date.split(".").reverse().join("-"));
      const dateB = new Date(b.date.split(".").reverse().join("-"));
      return dateB.getTime() - dateA.getTime();
    }
  );

  console.log("render layout");

  return (
    <Grid>
      {dataReaderBlogsSort?.map((el: Post) => (
        <Grid.Col span={3} key={el.id}>
          <Card
            mt={10}
            shadow="sm"
            padding="md"
            radius="md"
            w={350}
            h={480}
            withBorder
            className={classes.card}
          >
            <Card.Section>
              <NavLink to={`/reader-blog-card/${el.id}`}>
                <Image
                  src={el.postImageUrl}
                  height={250}
                  width={350}
                  alt="Post-IMG"
                />
              </NavLink>
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <NavLink to={`/reader-blog-card/${el.id}`}>
                <UnstyledButton>
                  <Text lineClamp={2} weight={500}>
                    {el.title}
                  </Text>
                </UnstyledButton>
              </NavLink>
            </Group>

            <Text lineClamp={4} size="sm" color="gray.7">
              {el.description}
            </Text>

            <Card.Section>
              <Group position="left" spacing={5} ml={15} mt={"md"}>
                <Text color="violet"> Автор: {el.authorName} </Text>

                <ActionIcon
                  radius={"xl"}
                  size={40}
                  color={el.likes > 0 ? "green" : "gray"}
                  variant="subtle"
                  onClick={() =>
                    addLikeHandler({
                      description: el.description,
                      postImageUrl: el.postImageUrl,
                      title: el.title,
                      date: el.date,
                      likes: el.likes,
                      id: el.id,
                    })
                  }
                >
                  <AiTwotoneLike size={15} />
                  <Text fz={15}>{el.likes}</Text>
                </ActionIcon>

                {el.authorId === user?.id && (
                  <Tooltip
                    label={"Редактировать"}
                    color="cyan"
                    position="bottom"
                    withArrow
                    transitionProps={{ transition: "skew-up", duration: 300 }}
                  >
                    <ActionIcon
                      onClick={() => {
                        open();
                        addCurrentPostHadler(el.id);
                      }}
                      variant="light"
                      color="red"
                    >
                      <CiEdit color="red" size={30} />
                    </ActionIcon>
                  </Tooltip>
                )}

                <Badge color="cyan" variant="light" ml={"25%"} radius={0}>
                  {el.date}
                </Badge>
              </Group>
            </Card.Section>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
});
