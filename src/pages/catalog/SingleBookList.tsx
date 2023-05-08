import { Grid, Card, Group, Badge, Rating, ActionIcon, Button, Image, Text } from '@mantine/core';
import React, { FC } from 'react';
import { BsBookmarkCheck } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Item } from '../../common/types';
import { useStyles } from './BooksListStyles';

type SingleBookListProps = {
  book: Item;
};

const SingleBookList: FC<SingleBookListProps> = ({ book }) => {
  const { classes } = useStyles();

  return (
    <Grid.Col xs={6} sm={4} md={4} lg={3} xl={2} className={classes.gridCol}>
      <Card key={book.id} className={classes.card} shadow="sm" padding="md" radius="md" withBorder>
        <Group position="apart">
          <Link to="/book-card">
            <Image width={'8rem'} height={'12rem'} src={book.itemImageUrl} alt="book img" />
          </Link>
          {book.discount > 0 && (
            <Badge className={classes.discount} color="orange" variant="filled">
              <Text fz={'md'} fw={500}>{`-${book.discount}%`}</Text>
            </Badge>
          )}
          <Rating value={book.averageRate} readOnly />
          <ActionIcon variant="transparent" className={classes.action_favorite}>
            <BsBookmarkCheck className={classes.favorite_off} size="4rem" />
          </ActionIcon>
        </Group>
        <Grid mt={10} pl={10} mb={5} gutter={0}>
          <Grid.Col span={12}>
            <Text align="start" size="sm" color="dimmed" lineClamp={1}>
              {book.authorBook}
            </Text>
          </Grid.Col>
          <Grid.Col span={12}>
            <Text weight={500} lineClamp={2}>
              {book.title}
            </Text>
          </Grid.Col>
        </Grid>
        <Text className={classes.text} weight={600} size="lg" color="green">
          {`${book.price} руб.`}
        </Text>

        <Button
          className={classes.buy}
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
          color="blue"
          radius="md"
          w={'12rem'}>
          КУПИТЬ
        </Button>
      </Card>
    </Grid.Col>
  );
};

export default SingleBookList;
