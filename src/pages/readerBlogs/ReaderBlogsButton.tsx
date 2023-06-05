import { Grid, Button, Text } from "@mantine/core";
import { GiNotebook } from "react-icons/gi";
import { GoBackButton } from "../../components/GoBackButton";

type ReaderBlogsButtonPropsType = {
  addPostHandler: () => void;
};

export const ReaderBlogsButton: React.FC<ReaderBlogsButtonPropsType> = ({
  addPostHandler,
}) => {
  return (
    <Grid pr={"sm"} pb={"md"} mt={10} gutter={"sm"} justify={"flex-start"}>
      <Grid.Col span="content">
        <GoBackButton
          variant={"gradient"}
          size={"xs"}
          gradient={{ from: "indigo", to: "cyan" }}
          text={"ВЕРНУТЬСЯ"}
        />
      </Grid.Col>
      <Grid.Col span="content">
        <Button
          size="xs"
          color="teal"
          onClick={() => {
            addPostHandler();
          }}
        >
          <GiNotebook size={25} />
          <Text fw={"bold"}> ДОБАВИТЬ ПОСТ</Text>
        </Button>
      </Grid.Col>
    </Grid>
  );
};
