import { Button, Container, Flex, TextInput, Title, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { getJwtToken } from "../../credentialManager";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser, updateProfile } from "../../api";

export default function EditProfile() {
  const navigate = useNavigate();

  useEffect(() => {
    const currentJwt = getJwtToken();

    if (currentJwt === null) {
      navigate("/login", {
        replace: true,
      });

      return;
    }

    fetchCurrentUser().then((profile) => {
      form.setValues({
        ...profile,
        hobbies: profile.hobbies.join(" "),
      });
    });
  }, []);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      hobbies: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value) => (value.length > 0 ? null : "Please enter your name"),
      hobbies: (value) =>
        value.length > 0 &&
        value.split(" ").filter((hobby) => hobby.length > 0).length > 0
          ? null
          : "Please enter space separated list of hobbies",
    },
  });

  return (
    <Container
      sx={{
        marginTop: rem(64),
      }}
    >
      <Title mb="lg">Edit your profile</Title>

      <form
        onSubmit={form.onSubmit((values) => {
          const profileUpdates = {
            ...values,
            hobbies: values.hobbies.split(" "),
          };

          updateProfile(profileUpdates).then(() => navigate("/"));
        })}
      >
        <Flex direction="column" gap="sm">
          <TextInput
            name="name"
            type="text"
            placeholder="Someone"
            label="Your name"
            {...form.getInputProps("name")}
          ></TextInput>

          <TextInput
            name="email"
            type="email"
            placeholder="you@example.com"
            label="Your email"
            {...form.getInputProps("email")}
          ></TextInput>

          <TextInput
            name="hobbies"
            type="text"
            placeholder="music movies"
            label="Your hobbies"
            {...form.getInputProps("hobbies")}
          ></TextInput>

          <Button mt="lg" type="submit" size="lg">
            Save
          </Button>
        </Flex>
      </form>
    </Container>
  );
}
