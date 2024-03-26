import { Card, Flex, Skeleton } from "@radix-ui/themes";

export default function TableLoading() {
  return (
    <Card mt="5">
      <Flex direction="column" gap="2">
        <Skeleton width="50px" />
        <Skeleton width="100%" height="30px" />
        <Skeleton width="100%" height="50px" />
        <Skeleton width="100%" height="75px" />
      </Flex>
    </Card>
  );
}
