/**
 * Profile Page
 * Generic user profile.
 */
import React from "react";
import {
  Box,
  Card,
  Title,
  Text,
  Group,
  Avatar,
  Stack,
  TextInput,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconUser } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/core/store";

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { user, updateUser, getFullName } = useUserStore();

  const form = useForm({
    initialValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    updateUser(values);
    notifications.show({
      title: t("common.success"),
      message: "Profile updated",
      color: "green",
      icon: <IconCheck size={16} />,
    });
  };

  return (
    <Box style={{ maxWidth: 720, margin: "0 auto" }} p="lg">
      <Card shadow="sm" radius="md" withBorder p="xl">
        <Group mb="xl">
          <Avatar size="xl" radius="xl" color="blue">
            <IconUser size={32} />
          </Avatar>
          <Box>
            <Title order={3}>{getFullName() || user?.email}</Title>
            <Text c="dimmed">{user?.email}</Text>
          </Box>
        </Group>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="First name"
              {...form.getInputProps("firstName")}
            />
            <TextInput
              label="Last name"
              {...form.getInputProps("lastName")}
            />
            <TextInput
              label={t("auth.email")}
              disabled
              {...form.getInputProps("email")}
            />
            <TextInput label="Phone" {...form.getInputProps("phone")} />

            <Group justify="flex-end" mt="md">
              <Button type="submit">{t("common.save")}</Button>
            </Group>
          </Stack>
        </form>
      </Card>
    </Box>
  );
};

export default ProfilePage;
