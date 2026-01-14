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
  Divider,
  Stack,
  Anchor,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconUser, IconLock, IconCheck, IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/core/store";
import { mockLogin } from "@/mocks/data/users.mock";
import { ROUTES } from "@/config/routes";

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { login, isLoading } = useUserStore();

  // Get return URL from location state
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || 
    ROUTES.CONSULTANT.DASHBOARD;

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: "consultant@dccj.ae",
      password: "password123",
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
      // Use mock login for prototype
      const result = mockLogin(values.email, values.password);
      
      if (result) {
        // Login successful
        login(
          {
            id: result.user.id,
            email: result.user.email,
            firstName: result.user.firstName,
            lastName: result.user.lastName,
            firstNameAr: result.user.firstNameAr,
            lastNameAr: result.user.lastNameAr,
            phone: result.user.phone,
            emiratesId: result.user.emiratesId,
            role: result.user.role,
            avatar: result.user.avatar,
            companyName: result.user.companyName,
            companyNameAr: result.user.companyNameAr,
            licenseNumber: result.user.licenseNumber,
            licenseCategory: result.user.licenseCategory,
            excellenceRating: result.user.excellenceRating,
            isVerified: result.user.isVerified,
            createdAt: result.user.createdAt,
            updatedAt: result.user.updatedAt,
          },
          result.token
        );
        
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
    } catch (error) {
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
        style={{
          width: "100%",
          maxWidth: 480,
        }}
      >
        <Stack align="center" mb="xl">
          <Title order={2} c="#003366">
            {t("auth.welcomeBack")}
          </Title>
          <Text c="dimmed">
            {t("auth.signInToContinue")}
          </Text>
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

            <Button
              type="submit"
              fullWidth
              size="md"
              loading={isLoading}
              mt="md"
              color="dubaiBlue"
            >
              {t("common.login")}
            </Button>
          </Stack>
        </form>

        <Divider label={t("auth.or")} labelPosition="center" my="lg" />

        <Button
          fullWidth
          size="md"
          variant="filled"
          style={{
            background: "#c5a572",
            borderColor: "#c5a572",
          }}
          onClick={() =>
            notifications.show({
              message: t("auth.uaePassComingSoon"),
              color: "blue",
            })
          }
        >
          {t("auth.loginWithUAEPass")}
        </Button>

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

        {/* Demo credentials hint */}
        <Box
          mt="xl"
          p="sm"
          style={{
            background: "#f5f5f5",
            borderRadius: 8,
          }}
        >
          <Text size="xs" c="dimmed" fw={600} mb={4}>
            Demo Credentials:
          </Text>
          <Text size="xs" c="dimmed">
            Email: consultant@dccj.ae
          </Text>
          <Text size="xs" c="dimmed">
            Password: password123
          </Text>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginPage;
