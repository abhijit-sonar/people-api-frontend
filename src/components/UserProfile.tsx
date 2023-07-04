import {
  Avatar,
  Text,
  Button,
  Paper,
  Flex,
  Chip,
  Space,
  Title,
} from "@mantine/core";

interface UserProfileProps {
  avatar: string;
  name: string;
  email: string;
  hobbies: Array<string>;
  onEdit: () => void;
}

export function UserProfile({
  avatar,
  name,
  email,
  hobbies,
  onEdit,
}: UserProfileProps) {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar src={avatar} size={120} radius={120} mx="auto" />
      <Title ta="center" fz="lg" mt="md">
        {name}
      </Title>

      <Text ta="center" c="dimmed" fz="sm">
        {email}
      </Text>

      <Space h="lg" />

      <Flex justify="center">
        {hobbies.map((hobby) => (
          <Chip checked={false}>{hobby}</Chip>
        ))}
      </Flex>

      <Space h="lg" />

      <Button onClick={() => onEdit()} variant="default" fullWidth mt="md">
        Edit
      </Button>
    </Paper>
  );
}
