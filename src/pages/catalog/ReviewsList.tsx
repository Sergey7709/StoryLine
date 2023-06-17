import { Group, Avatar, Spoiler, Text, Rating, Box } from "@mantine/core";
import { FC } from "react";
import { ReviewsListProps } from "../../common/types";

const ReviewsList: FC<ReviewsListProps> = ({ review }) => {
  return (
    <Box mb={5}>
      <Group>
        <Avatar radius="xl" src={review.userImageUrl} />
        <div>
          <Text size="sm">{review.authorName}</Text>
          <Text size="xs" color="dimmed">
            {review.date}
          </Text>
        </div>
      </Group>
      <Rating readOnly value={review.rate} />
      <Spoiler
        maxHeight={40}
        showLabel="Показать больше"
        hideLabel="Показать меньше"
      >
        <Text size="sm">{review.text}</Text>
      </Spoiler>
    </Box>
  );
};

export default ReviewsList;
