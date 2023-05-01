import { Badge, Button, Card, Grid, Group, Image, Text } from '@mantine/core';
import { books } from '../catalog/BooksList';

const MyReviews = () => {
  return (
    <Grid>
      {books.map((el) => (
        <Grid.Col span={4} key={el.id}>
          <Card shadow="sm" padding="lg" radius="md" withBorder mt={10}>
            <Card.Section>
              <Image src={el.itemImageUrl} height={160} alt="Norway" />
            </Card.Section>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>{el.title}</Text>
              <Badge color="yellow" variant="light">
                5
              </Badge>
            </Group>
            <Badge color="violet" variant="light" mb={10}>
              {el.releaseDate}
            </Badge>
            <Text size="sm" color="dimmed">
              With Fjord Tours you can explore more of the magical fjord landscapes with tours and
              activities on and around the fjords of Norway
            </Text>
            <Button variant="light" color="blue" mt="md" radius="md" mr={10}>
              Изменить отзыв
            </Button>
            <Button variant="light" color="pink" mt="md" radius="md">
              Удалить отзыв
            </Button>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default MyReviews;
