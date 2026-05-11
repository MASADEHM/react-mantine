/**
 * Login Page
 */
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Button,
  Card,
  Title,
  Text,
  Stack,
  Anchor,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconUser, IconLock, IconCheck, IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/core/store";
import { ROUTES } from "@/config/routes";

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Replace with a real API call.
async function fakeLogin(email: string, password: string) {
  if (!email || !password) return null;
  return {
    user: {
      id: "1",
      email,
      firstName: "Demo",
      lastName: "User",
      phone: "",
      role: "user" as const,
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    token: "demo-token",
  };
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { login, isLoading } = useUserStore();

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    ROUTES.DASHBOARD;

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => {
        if (!value) return t("auth.emailRequired");
        if (!/^\S+@\S+$/.test(value)) return t("auth.emailInvalid");
        return null;
      },
      password: (value) => (!value ? t("auth.passwordRequired") : null),
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const result = await fakeLogin(values.email, values.password);

      if (result) {
        login(result.user, result.token);

        notifications.show({
          title: t("common.success"),
          message: t("auth.loginSuccess"),
          color: "green",
          icon: <IconCheck size={16} />,
        });
        navigate(from, { replace: true });
      } else {
        notifications.show({
          title: t("common.error"),
          message: t("auth.invalidCredentials"),
          color: "red",
          icon: <IconX size={16} />,
        });
      }
    } catch {
      notifications.show({
        title: t("common.error"),
        message: t("auth.loginError"),
        color: "red",
        icon: <IconX size={16} />,
      });
    }
  };

  return (
    <Box
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Card
        shadow="xl"
        radius="lg"
        p="xl"
        style={{ width: "100%", maxWidth: 480 }}
      >
        <Stack align="center" mb="xl">
          <Title order={2}>{t("auth.welcomeBack")}</Title>
          <Text c="dimmed">{t("auth.signInToContinue")}</Text>
        </Stack>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label={t("auth.email")}
              placeholder={t("auth.email")}
              leftSection={<IconUser size={16} />}
              size="md"
              autoComplete="email"
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label={t("auth.password")}
              placeholder={t("auth.password")}
              leftSection={<IconLock size={16} />}
              size="md"
              autoComplete="current-password"
              {...form.getInputProps("password")}
            />

            <Button type="submit" fullWidth size="md" loading={isLoading} mt="md">
              {t("common.login")}
            </Button>
          </Stack>
        </form>

        <Stack align="center" mt="xl" gap="xs">
          <Anchor size="sm" onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}>
            {t("auth.forgotPassword")}
          </Anchor>
          <Text size="sm" c="dimmed">
            {t("auth.noAccount")}{" "}
            <Anchor size="sm" onClick={() => navigate(ROUTES.REGISTER)}>
              {t("auth.registerNow")}
            </Anchor>
          </Text>
        </Stack>
      </Card>
    </Box>
  );
};

export default LoginPage;
