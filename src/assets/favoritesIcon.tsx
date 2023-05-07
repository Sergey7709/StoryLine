import { ActionIcon } from '@mantine/core';
import { IconHeartFilled } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export function FavoritesIcon() {
  return (
    <Link to={'/favorites'}>
      <ActionIcon variant="gradient" gradient={{ from: 'red', to: 'white' }} p={0} size={39}>
        <IconHeartFilled size={30} strokeWidth={1.5} color={'#1e194d'} />
      </ActionIcon>
    </Link>
  );
}
