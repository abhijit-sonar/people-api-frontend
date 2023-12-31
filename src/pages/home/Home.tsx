import { Fragment, useEffect, useState } from "react";
import { Container, Title, Space, rem, Text, Button } from "@mantine/core";
import { getJwtToken } from "../../credentialManager";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser, listUsers } from "../../api";
import { User } from "../../models/user";
import { UserProfile } from "../../components/UserProfile";
import UserItem from "../../components/UserItem";

export type HomeProps = {};

export default function Home({}: HomeProps) {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<User | null>(null);
  const isLoading = profile === null;

  useEffect(() => {
    const currentJwt = getJwtToken();

    if (currentJwt === null) {
      navigate("/login", {
        replace: true,
      });

      return;
    }

    fetchCurrentUser().then((profile) => {
      setProfile(profile);
    });
  }, []);

  return <>{isLoading ? <LoadingPage /> : <Content user={profile} />}</>;
}

function LoadingPage() {
  return <Text>Loading...</Text>;
}

type ContentProps = { user: User };

function Content({ user }: ContentProps) {
  return (
    <Container>
      <Space h="lg" />

      <UserProfile
        name={user.name}
        email={user.email}
        hobbies={user.hobbies}
        avatar={`http://localhost:8000/api/users/${user._id}/avatar`}
      />

      <Space h={"xl"} />

      <Title
        size={"h4"}
        sx={{
          paddingBottom: rem(3),
        }}
      >
        All users
      </Title>

      <UsersList />
    </Container>
  );
}

function UsersList() {
  const perPage = 10;

  const [nextPage, setNextPage] = useState(1);
  const [usersList, setUsersList] = useState<Array<User>>([]);
  const [endOfPagination, setEndOfPagination] = useState(false);

  const loadMore = async () => {
    if (endOfPagination) return;

    const users = await listUsers(nextPage, perPage);

    setUsersList([...usersList, ...users]);
    setNextPage(nextPage + 1);
    setEndOfPagination(users.length < perPage);
  };

  // Load initial page
  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div>
      {usersList.map((user) => (
        <Fragment key={user._id}>
          <UserItem key={user._id} user={user} />
          <Space h="sm" />
        </Fragment>
      ))}

      {!endOfPagination && (
        <Button
          sx={{
            width: "100%",
          }}
          onClick={() => loadMore()}
        >
          Load more
        </Button>
      )}

      <Space h="lg"></Space>
    </div>
  );
}
