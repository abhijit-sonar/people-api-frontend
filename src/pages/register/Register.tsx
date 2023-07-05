import { createAccount } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Container,
  Flex,
  Space,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";

type LoginFormData = {
  name: string;
  email: string;
  hobbies: string;
  password: string;
  termsAccepted: boolean;
};

export default function Login() {
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    initialValues: {
      name: "",
      hobbies: "",
      email: "",
      password: "",
      termsAccepted: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value) => (value.length > 0 ? null : "Please enter your name"),
      hobbies: (value) =>
        value.length > 0 &&
        value.split(" ").filter((hobby) => hobby.length > 0).length > 0
          ? null
          : "Please enter space separated list of hobbies",
      password: (value) =>
        value.length > 0 ? null : "Please enter your password",
    },
  });

  return (
    <Container my="lg" pt={rem(64)}>
      <Title ta="center" order={1}>
        Register
      </Title>

      <Space h="lg" />

      <form
        onSubmit={form.onSubmit((values) => {
          const accountDetails = {
            ...values,
            hobbies: values.hobbies.split(" "),
          };

          createAccount(accountDetails).then(() => navigate("/"));
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

          <TextInput
            name="password"
            type="password"
            placeholder="Password"
            label="Your password"
            {...form.getInputProps("password")}
          ></TextInput>

          <Flex align="center" gap="sm">
            <Checkbox
              name="termsAccepted"
              id="checkbox-terms"
              {...form.getInputProps("termsAccepted")}
            />

            <Text component="label" htmlFor="checkbox-terms">
              I consent to selling my data
            </Text>
          </Flex>

          <Button
            mt="lg"
            type="submit"
            size="lg"
            disabled={!form.values.termsAccepted}
          >
            Register
          </Button>
        </Flex>
      </form>

      <Text mt="lg">
        Have an account? <Link to={"/login"}>Login instead.</Link>
      </Text>
    </Container>
  );
}
