/**
 * Consultant Profile Page
 * Displays consultant information and DM Excellence Rating
 */
import React from "react";
import {
  Grid,
  Card,
  Title,
  Text,
  Divider,
  Avatar,
  Group,
  Stack,
  Button,
  Box,
} from "@mantine/core";
import {
  IconUser,
  IconMail,
  IconPhone,
  IconBuilding,
  IconEdit,
  IconCertificate,
  IconTrophy,
} from "@tabler/icons-react";
import { useUserStore } from "@/core/store";

// Description Item Component
const DescriptionItem: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <Box>
    <Text size="sm" c="dimmed" mb={4}>
      {label}
    </Text>
    <Text size="sm" fw={500}>
      {children}
    </Text>
  </Box>
);

// Stat Card Component
const StatCard: React.FC<{ label: string; value: string | number; color?: string }> = ({
  label,
  value,
  color,
}) => (
  <Box>
    <Text size="xs" c="dimmed" mb={4}>
      {label}
    </Text>
    <Text size="xl" fw={700} c={color}>
      {value}
    </Text>
  </Box>
);

const ProfilePage: React.FC = () => {
  const { getFullName } = useUserStore();

  // Mock consultant data
  const consultantData = {
    companyName: "Al Rashid Engineering Consultants",
    licenseNumber: "DM-2024-1234",
    licenseCategory: "Unlimited",
    email: "info@alrashid-eng.ae",
    phone: "+971 4 123 4567",
    address: "Dubai Design District, Building 5, Office 301",
    registrationDate: "15 March 2020",
    expiryDate: "14 March 2025",
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f8fafc 0%, #f0f5ff 100%)",
      }}
    >
      <Box
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "16px 48px 60px",
        }}
      >
        {/* Page Header */}
        <Box mb="xl">
          <Title order={1} c="#1a1a2e" fw={700} fz={32} mb={4}>
            Profile
          </Title>
          <Text c="#888" size="md">
            Manage your account information and settings
          </Text>
        </Box>

        <Grid gutter="lg">
          {/* Left Column - Profile Info */}
          <Grid.Col span={{ base: 12, lg: 8 }}>
            {/* Profile Card */}
            <Card shadow="sm" radius="lg" withBorder mb="lg" p="xl">
              <Group gap="lg" align="center">
                <Avatar
                  size={100}
                  radius="xl"
                  color="blue"
                >
                  <IconUser size={48} />
                </Avatar>
                <Box style={{ flex: 1 }}>
                  <Title order={3} c="#1a1a2e">
                    {getFullName() || "Mohammed Al Rashid"}
                  </Title>
                  <Text c="#888" size="lg" mt={4}>
                    {consultantData.companyName}
                  </Text>
                  <Group mt="md">
                    <Button color="dubaiBlue" leftSection={<IconEdit size={16} />}>
                      Edit Profile
                    </Button>
                  </Group>
                </Box>
              </Group>
            </Card>

            {/* Company Information */}
            <Card shadow="sm" radius="lg" withBorder mb="lg" p="lg">
              <Group gap="sm" mb="md">
                <IconBuilding size={20} color="#1890ff" />
                <Text fw={600}>Company Information</Text>
              </Group>
              <Grid gutter="md">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <DescriptionItem label="Company Name">
                    {consultantData.companyName}
                  </DescriptionItem>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <DescriptionItem label="License Number">
                    {consultantData.licenseNumber}
                  </DescriptionItem>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <DescriptionItem label="License Category">
                    <Text c="#1890ff" fw={600}>
                      {consultantData.licenseCategory}
                    </Text>
                  </DescriptionItem>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <DescriptionItem label="Registration Date">
                    {consultantData.registrationDate}
                  </DescriptionItem>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <DescriptionItem label="License Expiry">
                    <Text c="#52c41a">{consultantData.expiryDate}</Text>
                  </DescriptionItem>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <DescriptionItem label="Address">
                    {consultantData.address}
                  </DescriptionItem>
                </Grid.Col>
              </Grid>
            </Card>

            {/* Contact Information */}
            <Card shadow="sm" radius="lg" withBorder p="lg">
              <Group gap="sm" mb="md">
                <IconMail size={20} color="#1890ff" />
                <Text fw={600}>Contact Information</Text>
              </Group>
              <Stack gap="md">
                <Group gap="sm">
                  <IconMail size={18} color="#1890ff" />
                  <Box>
                    <Text size="xs" c="#888">
                      Email
                    </Text>
                    <Text c="#1a1a2e" fw={500}>
                      {consultantData.email}
                    </Text>
                  </Box>
                </Group>
                <Group gap="sm">
                  <IconPhone size={18} color="#1890ff" />
                  <Box>
                    <Text size="xs" c="#888">
                      Phone
                    </Text>
                    <Text c="#1a1a2e" fw={500}>
                      {consultantData.phone}
                    </Text>
                  </Box>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>

          {/* Right Column - Excellence Rating & Stats */}
          <Grid.Col span={{ base: 12, lg: 4 }}>
            {/* DM Excellence Rating */}
            <Card shadow="sm" radius="lg" withBorder mb="lg" p="lg">
              <Group gap="sm" mb="lg">
                <IconTrophy size={20} color="#faad14" />
                <Title order={5} c="#1a1a2e" fw={600}>
                  DM Excellence Rating
                </Title>
              </Group>

              <Stack align="center" py="md">
                <Box
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    border: "4px solid #52c41a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f6ffed",
                  }}
                >
                  <Text fz={32} fw={700} c="#52c41a">
                    A+
                  </Text>
                </Box>
                <Text c="#52c41a" fw={600} size="lg" mt="md">
                  Excellent Performance
                </Text>
                <Text c="#888" size="sm">
                  Based on 24 completed projects
                </Text>
              </Stack>

              <Divider my="md" />

              <Grid gutter="md">
                <Grid.Col span={6}>
                  <StatCard label="Total Projects" value={24} />
                </Grid.Col>
                <Grid.Col span={6}>
                  <StatCard label="Approval Rate" value="98%" color="#52c41a" />
                </Grid.Col>
              </Grid>

              <Divider my="md" />

              <Grid gutter="md">
                <Grid.Col span={6}>
                  <StatCard label="Avg. Approval Time" value="5 days" color="#1890ff" />
                </Grid.Col>
                <Grid.Col span={6}>
                  <StatCard label="Compliance Score" value="99%" color="#52c41a" />
                </Grid.Col>
              </Grid>
            </Card>

            {/* Certifications */}
            <Card shadow="sm" radius="lg" withBorder p="lg">
              <Group gap="sm" mb="lg">
                <IconCertificate size={20} color="#1890ff" />
                <Title order={5} c="#1a1a2e" fw={600}>
                  Certifications
                </Title>
              </Group>

              <Stack gap="sm">
                <Box
                  p="sm"
                  style={{
                    background: "#f6ffed",
                    borderRadius: 8,
                    border: "1px solid #b7eb8f",
                  }}
                >
                  <Text fw={600} c="#52c41a">
                    ISO 9001:2015
                  </Text>
                  <Text size="xs" c="#888">
                    Quality Management
                  </Text>
                </Box>
                <Box
                  p="sm"
                  style={{
                    background: "#e6f7ff",
                    borderRadius: 8,
                    border: "1px solid #91d5ff",
                  }}
                >
                  <Text fw={600} c="#1890ff">
                    Dubai Municipality Approved
                  </Text>
                  <Text size="xs" c="#888">
                    Category: Unlimited
                  </Text>
                </Box>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfilePage;
