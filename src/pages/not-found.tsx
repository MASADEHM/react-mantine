/**
 * 404 Not Found Page
 */
import React from "react";
import { Box, Title, Text, Button, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

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
      <Stack align="center" gap="md">
        <Title order={1} style={{ fontSize: 96 }}>
          404
        </Title>
        <Title order={3}>Page not found</Title>
        <Text c="dimmed" ta="center" maw={420}>
          The page you are looking for doesn't exist or has been moved.
        </Text>
        <Button onClick={() => navigate(ROUTES.HOME)}>Back home</Button>
      </Stack>
    </Box>
  );
};

export default NotFoundPage;
