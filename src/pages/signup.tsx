import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Card,
  Title,
  Text,
  Grid,
  Box,
  Stack,
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  IconUser,
  IconMail,
  IconLock,
  IconPhone,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { useNavigate, Link } from "react-router-dom";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirm: string;
  phone?: string;
}

const Signup: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
      phone: "",
    },
    validate: {
      name: (value) =>
        !value ? "Please enter your full name" : null,
      email: (value) => {
        if (!value) return "Please enter your email";
        if (!/^\S+@\S+$/.test(value)) return "Please enter a valid email";
        return null;
      },
      password: (value) => {
        if (!value) return "Please enter your password";
        if (value.length < 6) return "Password must be at least 6 characters";
        return null;
      },
      confirm: (value, values) => {
        if (!value) return "Please confirm your password";
        if (value !== values.password) return "Passwords do not match!";
        return null;
      },
      phone: (value) => {
        if (value && !/^\+?\d{7,15}$/.test(value)) {
          return "Please enter a valid phone number";
        }
        return null;
      },
    },
  });

  const handleSubmit = async (_values: SignupFormValues) => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        notifications.show({
          title: "Success",
          message: "Account created successfully!",
          color: "green",
          icon: <IconCheck size={16} />,
        });
        navigate("/login");
      }, 1000);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Sign up failed. Please try again.";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        icon: <IconX size={16} />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      py="xl"
      px="md"
      style={{
        minHeight: "100vh",
      }}
    >
      <Grid justify="center">
        <Grid.Col span={12} style={{ textAlign: "center", marginBottom: 40 }}>
          <Title order={1}>Create Your Account</Title>

          <Text size="lg" c="dimmed" mt="md">
            Create an account to get started.
          </Text>
        </Grid.Col>
      </Grid>

      <Grid justify="center">
        <Grid.Col span={{ base: 12, sm: 10, md: 8, lg: 6, xl: 5 }}>
          <Card
            shadow="xl"
            radius="xl"
            p="xl"
            style={{
              maxWidth: 650,
              margin: "0 auto",
            }}
          >
            <Stack align="center" mb="xl">
              <Title order={2}>Sign Up</Title>
              <Text c="dimmed">Create your account to get started.</Text>
            </Stack>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <TextInput
                  label="Full Name"
                  placeholder="Full Name"
                  leftSection={<IconUser size={16} />}
                  size="md"
                  radius="lg"
                  {...form.getInputProps("name")}
                />

                <TextInput
                  label="Email"
                  placeholder="Email"
                  leftSection={<IconMail size={16} />}
                  size="md"
                  radius="lg"
                  {...form.getInputProps("email")}
                />

                <PasswordInput
                  label="Password"
                  placeholder="Password"
                  leftSection={<IconLock size={16} />}
                  size="md"
                  radius="lg"
                  {...form.getInputProps("password")}
                />

                <PasswordInput
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  leftSection={<IconLock size={16} />}
                  size="md"
                  radius="lg"
                  {...form.getInputProps("confirm")}
                />

                <TextInput
                  label="Phone Number (optional)"
                  placeholder="Phone Number"
                  leftSection={<IconPhone size={16} />}
                  size="md"
                  radius="lg"
                  {...form.getInputProps("phone")}
                />

                <Button
                  type="submit"
                  fullWidth
                  size="md"
                  radius="lg"
                  loading={isLoading}
                  mt="md"
                  color="dubaiBlue"
                >
                  Sign Up
                </Button>
              </Stack>
            </form>

            <Text ta="center" mt="xl" c="dimmed">
              Already have an account?{" "}
              <Anchor component={Link} to="/login" c="#004d99">
                Sign in
              </Anchor>
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default Signup;
