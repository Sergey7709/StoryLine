import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
  rem,
} from "@mantine/core";

export function Bookcard() {
  return (
    <Container my="xl">
      <Grid gutter="sm">
        <Grid.Col span={12} style={{ height: "5rem" }}>
          <Skeleton height="100%" radius="md" animate={false} />
        </Grid.Col>
        <Grid.Col span={6} style={{ height: "30rem" }}>
          <Skeleton height="100%" radius="md" animate={false} />
        </Grid.Col>
        <Grid.Col span={6}>
          <Grid gutter="sm">
            <Grid.Col span={12} style={{ height: "5rem" }}>
              <Skeleton height="100%" radius="md" animate={false} />
            </Grid.Col>
            <Grid.Col span={12} style={{ height: "20rem" }}>
              <Skeleton height="100%" radius="md" animate={false} />
            </Grid.Col>
            <Grid.Col span={12} style={{ height: "5rem" }}>
              <Skeleton height="100%" radius="md" animate={false} />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={12} style={{ height: "20rem" }}>
          <Skeleton height="100%" radius="md" animate={false} />
        </Grid.Col>
        <Grid.Col span={12} style={{ height: "20rem" }}>
          <Skeleton height="100%" radius="md" animate={false} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
