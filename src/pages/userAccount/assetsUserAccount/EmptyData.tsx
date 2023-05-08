import { Paper, Text } from '@mantine/core';
import React, { FC } from 'react';

type EmptyDataProps = {
  text: string;
};

const EmptyData: FC<EmptyDataProps> = ({ text }) => (
  <Paper shadow="xs" p="md" m={20}>
    <Text align="center">{text}</Text>
  </Paper>
);

export default EmptyData;
