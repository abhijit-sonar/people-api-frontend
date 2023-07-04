import { Avatar, Text, Button, Paper } from "@mantine/core";

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
      <Text ta="center" fz="lg" weight={500} mt="md">
        {name}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {email} • {hobbies.join(" • ")}
      </Text>

      <Button onClick={() => onEdit()} variant="default" fullWidth mt="md">
        Edit
      </Button>
    </Paper>
  );
}
