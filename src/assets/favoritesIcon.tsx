import { ActionIcon } from '@mantine/core';
import { IconHeartFilled } from '@tabler/icons-react';

export function FavoritesIcon() {
  return (
    <ActionIcon variant="gradient" gradient={{ from: 'red', to: 'white' }} p={0} size={39}>
      <IconHeartFilled size={30} strokeWidth={1.5} color={'#1e194d'} />
    </ActionIcon>
  );
}
