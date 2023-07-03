import { useEffect, useState } from "react";
import { getJwtToken } from "../../credentialManager";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser, listUsers } from "../../api";
import { User } from "../../models/user";

import global from "../../globalStyle.module.css";
import local from "./home.module.css";
const style: any = {};
Object.assign(style, global, local);

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
  return <p>Loading...</p>;
}

type ContentProps = { user: User };

function Content({ user }: ContentProps) {
  return (
    <div className={`${style.container} ${style.pb1} ${style.pt1}`}>
      <CurrentUserProfile user={user} />
      <hr></hr>

      <h4>All users</h4>

      <UsersList />
    </div>
  );
}

function CurrentUserProfile({ user }: ContentProps) {
  return (
    <div className={`${style.hflex} ${style.flexAlignCenter} ${style.card}`}>
      <img
        className={style.avatar}
        src={`http://localhost:8000/api/users/${user._id}/avatar/`}
      ></img>

      <div className={`${style.vflex} ${style.ml2} ${style.flexCenter}`}>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <button className={`${style.actionButton} ${style.mt1}`}>Edit</button>
      </div>
    </div>
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
    <div className={style.vflex}>
      {usersList.map((user) => (
        <UserItem key={user._id} user={user} />
      ))}

      {!endOfPagination && (
        <button
          onClick={() => loadMore()}
          className={`${style.actionButton} ${style.mt1}`}
        >
          Load more
        </button>
      )}
    </div>
  );
}

type UserItemProps = {
  user: User;
};

function UserItem({ user }: UserItemProps) {
  return (
    <div className={`${style.hflex} ${style.card}`}>
      <img
        className={style.avatar}
        src={`http://localhost:8000/api/users/${user._id}/avatar/`}
      ></img>

      <div className={`${style.vflex} ${style.ml2}`}>
        <h3>{user.name}</h3>
        <p>{user.email}</p>

        <div className={`${style.hflex} ${style.flexWrap} ${style.mt1}`}>
          {user.hobbies.map((hobby) => (
            <HobbyChip key={hobby} hobby={hobby} />
          ))}
        </div>
      </div>
    </div>
  );
}

type HobbyChipProps = {
  hobby: string;
};
function HobbyChip({ hobby }: HobbyChipProps) {
  return <div className={`${style.hobbyChip}`}>{hobby}</div>;
}
