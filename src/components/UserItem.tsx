import { Avatar, Chip, Flex, Paper, Space, Text, Title } from "@mantine/core";
import { User } from "../models/user";

type UserItemProps = {
  user: User;
};

export default function UserItem({ user }: UserItemProps) {
  return (
    <Paper withBorder p={"lg"}>
      <Flex gap={"md"}>
        <Avatar
          src={`http://localhost:8000/api/users/${user._id}/avatar/`}
          size={50}
          radius={25}
        ></Avatar>

        <Flex direction={"column"}>
          <Title size={"h3"}>{user.name}</Title>
          <Text fz="sm" c="dimmed">
            {user.email}
          </Text>

          <Space h={"sm"} />

          <Flex>
            {user.hobbies.map((hobby, index) => (
              <Chip key={index} checked={false}>
                {hobby}
              </Chip>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  );
}
