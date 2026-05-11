/**
 * Dashboard Page
 */
import React from "react";
import {
  Grid,
  Card,
  Badge,
  Button,
  Group,
  Stack,
  Title,
  Text,
  Divider,
  Menu,
  Box,
} from "@mantine/core";
import {
  IconCircleCheck,
  IconClock,
  IconAlertTriangle,
  IconFileText,
  IconPhone,
  IconMail,
  IconMessage,
  IconArrowRight,
  IconFolderPlus,
  IconPlus,
  IconHelp,
  IconQuestionMark,
  IconChevronDown,
  IconBuilding,
  IconTrash,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <IconFolderPlus size={24} color="#666" />,
      title: "Create New Item",
      description: "Start a new item and begin your workflow",
      tag: "QUICK START",
    },
  ];

  const stats = [
    {
      icon: <IconAlertTriangle size={20} />,
      label: "ACTION REQUIRED",
      value: "1",
      color: "#f5222d",
    },
    {
      icon: <IconClock size={20} />,
      label: "IN PROGRESS",
      value: "0",
      color: "#1890ff",
    },
    {
      icon: <IconCircleCheck size={20} />,
      label: "COMPLETED",
      value: "0",
      color: "#52c41a",
    },
    {
      icon: <IconFileText size={20} />,
      label: "TOTAL",
      value: "1",
      color: "#8c8c8c",
    },
  ];

  return (
    <Box
      style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "16px 48px 60px",
      }}
    >
      {/* Dashboard Header */}
      <Group justify="space-between" align="center" mb="lg">
        <Box>
          <Title order={1} c="#1a1a2e" fw={700} fz={32} mb={4}>
            Dashboard
          </Title>
          <Text c="#888" size="md">
            Manage your items and tasks
          </Text>
        </Box>
        <Menu shadow="md" width={300} position="bottom-end">
          <Menu.Target>
            <Button
              size="md"
              variant="outline"
              color="blue"
              radius="md"
              rightSection={<IconChevronDown size={14} />}
              leftSection={<IconPlus size={14} />}
            >
              New
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>
              <Text c="#888" size="xs">
                Choose an action to get started
              </Text>
            </Menu.Label>
            <Menu.Item
              leftSection={
                <Box
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "#e6f7ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconBuilding size={18} color="#1890ff" />
                </Box>
              }
              onClick={() => navigate(ROUTES.DASHBOARD)}
            >
              <Text fw={500} size="sm" c="#1a1a2e">
                New Item
              </Text>
              <Text size="xs" c="#888">
                Primary action
              </Text>
            </Menu.Item>
            <Menu.Item
              leftSection={
                <Box
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "#f6ffed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconFolderPlus size={18} color="#52c41a" />
                </Box>
              }
              onClick={() => navigate(ROUTES.DASHBOARD)}
            >
              <Text fw={500} size="sm" c="#1a1a2e">
                New Draft
              </Text>
              <Text size="xs" c="#888">
                Secondary action
              </Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      {/* Quick Start Section */}
      <Box mb="xl">
        <Title order={4} c="#1a1a2e" fw={700} mb={4}>
          Quick Start
        </Title>
        <Text c="#888" size="sm">
          Choose an action to get started
        </Text>
      </Box>

      {/* Service Cards */}
      <Grid gutter="lg" mb={48}>
        {services.map((service, index) => (
          <Grid.Col span={{ base: 12, md: 6 }} key={index}>
            <Card
              shadow="sm"
              radius="lg"
              withBorder
              style={{ cursor: "pointer" }}
              onClick={() => navigate(ROUTES.DASHBOARD)}
            >
              <Group align="center" wrap="nowrap" gap="md">
                <Box
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {service.icon}
                </Box>
                <Box style={{ flex: 1 }}>
                  <Group justify="space-between" align="flex-start">
                    <Box style={{ flex: 1, minWidth: 0 }}>
                      <Title order={5} c="#1a1a2e" fw={600}>
                        {service.title}
                      </Title>
                      <Text c="#999" size="sm" truncate>
                        {service.description}
                      </Text>
                    </Box>
                    <Badge color="gray" variant="light" size="xs" ml="sm">
                      {service.tag}
                    </Badge>
                  </Group>
                </Box>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Statistics Section */}
      <Grid gutter="md" mb={48}>
        {stats.map((stat, index) => (
          <Grid.Col span={{ base: 6, md: 3 }} key={index}>
            <Card
              shadow="sm"
              radius="md"
              withBorder
              style={{ cursor: "pointer" }}
              onClick={() => navigate(ROUTES.DASHBOARD)}
              p="lg"
            >
              <Group align="center" wrap="nowrap" gap="md">
                <Box
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: `2px solid ${stat.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Text
                    size="xs"
                    c="#888"
                    fw={500}
                    style={{ letterSpacing: 0.3 }}
                  >
                    {stat.label}
                  </Text>
                  <Title order={3} c="#1a1a2e" fw={700}>
                    {stat.value}
                  </Title>
                </Box>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Main Content Grid */}
      <Grid gutter="lg">
        {/* Left Column - Recent Items */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Card shadow="sm" radius="lg" withBorder mb="lg" p="lg">
            <Group justify="space-between" align="center" mb="lg">
              <Box>
                <Title order={4} c="#1a1a2e" fw={700}>
                  Recent Items
                </Title>
                <Text c="#f5222d" size="sm" fw={500}>
                  Action Required
                </Text>
              </Box>
              <Button
                variant="subtle"
                color="blue"
                onClick={() => navigate(ROUTES.DASHBOARD)}
                rightSection={<IconArrowRight size={14} />}
              >
                View All
              </Button>
            </Group>

            {/* Item Card - Draft */}
            <Card shadow="none" radius="md" withBorder bg="#fafafa" p="md">
              <Group justify="space-between" align="center" wrap="nowrap">
                <Box style={{ flex: 1 }}>
                  <Group gap="xs" mb="xs">
                    <Badge color="red" variant="light">
                      DRAFT
                    </Badge>
                    <Badge color="gray" variant="light">
                      SAMPLE
                    </Badge>
                  </Group>
                  <Title order={5} c="#1a1a2e" my="xs">
                    Sample Item Title
                  </Title>
                  <Group gap="xs">
                    <IconClock size={12} color="#999" />
                    <Text size="sm" c="#999">
                      7 Jan 2026
                    </Text>
                  </Group>
                  <Text size="sm" c="#999">
                    Not yet submitted
                  </Text>
                </Box>
                <Group gap="md">
                  <Box
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      border: "3px solid #1890ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#fff",
                    }}
                  >
                    <Text fw={600} c="#1890ff">
                      14%
                    </Text>
                  </Box>
                  <Stack gap="xs">
                    <Button
                      variant="subtle"
                      color="red"
                      size="xs"
                      leftSection={<IconTrash size={14} />}
                    >
                      Delete
                    </Button>
                    <Button
                      color="blue"
                      size="sm"
                      radius="md"
                      onClick={() => navigate(ROUTES.DASHBOARD)}
                      rightSection={<IconArrowRight size={14} />}
                    >
                      Continue
                    </Button>
                  </Stack>
                </Group>
              </Group>
            </Card>
          </Card>
        </Grid.Col>

        {/* Right Column - Help */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Card shadow="sm" radius="lg" withBorder p="lg">
            <Stack gap="md">
              <Group gap="md" align="flex-start">
                <Box
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "#e6f4ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconHelp size={24} color="#1890ff" />
                </Box>
                <Box>
                  <Title order={5} c="#1a1a2e" fw={700}>
                    Need Help?
                  </Title>
                  <Text c="#888" size="sm">
                    Our support team is here to assist you
                  </Text>
                </Box>
              </Group>

              <Divider />

              <Stack gap="sm">
                <Group gap="sm">
                  <IconMail size={16} color="#666" />
                  <Text c="#1a1a2e" fw={500}>
                    support@example.com
                  </Text>
                </Group>
                <Group gap="sm">
                  <IconPhone size={16} color="#666" />
                  <Text c="#1a1a2e" fw={500}>
                    +000 0 000 0000
                  </Text>
                </Group>
                <Text c="#888" size="sm">
                  Mon - Fri: 9:00 AM - 5:00 PM
                </Text>
              </Stack>

              <Button
                fullWidth
                size="md"
                variant="light"
                color="blue"
                radius="xl"
                leftSection={<IconMessage size={16} />}
              >
                Start Live Chat
              </Button>

              <Button
                fullWidth
                variant="subtle"
                color="blue"
                leftSection={<IconQuestionMark size={16} />}
              >
                View FAQs
              </Button>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
