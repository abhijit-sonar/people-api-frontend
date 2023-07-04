import { login } from "../../api";
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
  email: string;
  password: string;
  termsAccepted: boolean;
};

export default function Login() {
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    initialValues: {
      email: "",
      password: "",
      termsAccepted: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 0 ? null : "Please enter your password",
    },
  });

  return (
    <Container my="lg" pt={rem(64)}>
      <Title ta="center" order={1}>
        Login
      </Title>

      <Space h="lg" />

      <form
        onSubmit={form.onSubmit((values) => {
          login(values.email, values.password).then(() => navigate("/"));
        })}
      >
        <Flex direction="column" gap="sm">
          <TextInput
            name="email"
            type="email"
            placeholder="you@example.com"
            label="Your email"
            {...form.getInputProps("email")}
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
              I consent to selling of my data
            </Text>
          </Flex>

          <Button
            mt="lg"
            type="submit"
            size="lg"
            disabled={!form.values.termsAccepted}
          >
            Login
          </Button>
        </Flex>
      </form>

      <Text mt="lg">
        Don't have an account? <Link to={"/register"}>Create one</Link>
      </Text>
    </Container>
  );
}
