import React from "react";
import {
  Card,
  Badge,
  Button,
  Group,
  Stack,
  Title,
  Text,
  Grid,
  Timeline,
  Tabs,
  Avatar,
  Divider,
  Box,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconArrowLeft,
  IconFile,
  IconDownload,
  IconCircleCheck,
  IconClock,
  IconAlertTriangle,
  IconRefresh,
  IconUser,
  IconSend,
} from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";

// Mock application data
const mockApplication = {
  id: "1",
  referenceNumber: "DM-2024-001234",
  projectName: "Palm Heights Residence",
  projectNameAr: "إقامة بالم هايتس",
  serviceType: "Initial Master Plan Approval",
  serviceCategory: "Master Plan",
  status: "approved",
  description:
    "A luxurious residential tower with 25 floors featuring 200 apartments with premium amenities including swimming pool, gym, and landscaped gardens.",
  location: {
    emirate: "Dubai",
    area: "Jumeirah Village Circle",
    plotNumber: "JVC-456",
  },
  owner: {
    name: "Emirates Properties Development",
    email: "contact@emiratesproperties.ae",
    phone: "+971 4 123 4567",
    type: "Company",
  },
  consultant: {
    name: "Ahmed Al Rashid",
    company: "Al Rashid Engineering Consultants",
    license: "DM-CON-2020-001234",
  },
  fees: {
    total: 27000,
    paid: 27000,
    status: "paid",
  },
  dates: {
    submitted: "2024-01-10",
    approved: "2024-01-25",
    expires: "2025-01-25",
  },
  documents: [
    { id: "1", name: "Title Deed", status: "approved", uploadedAt: "2024-01-10" },
    { id: "2", name: "Site Plan", status: "approved", uploadedAt: "2024-01-10" },
    { id: "3", name: "Consultant License", status: "approved", uploadedAt: "2024-01-10" },
  ],
  timeline: [
    {
      status: "approved",
      comment: "Application approved. Initial master plan is approved with conditions.",
      date: "2024-01-25 15:00",
      by: "Admin User",
    },
    {
      status: "under_review",
      comment: "Application is under technical review",
      date: "2024-01-11 08:00",
      by: "Admin User",
    },
    {
      status: "submitted",
      comment: "Application submitted for review",
      date: "2024-01-10 10:30",
      by: "Ahmed Al Rashid",
    },
    {
      status: "draft",
      comment: "Application created",
      date: "2024-01-10 09:00",
      by: "Ahmed Al Rashid",
    },
  ],
  comments: [
    {
      id: "1",
      text: "Please ensure all dimensions in the site plan are accurate.",
      by: "Admin User",
      date: "2024-01-15 10:00",
    },
    {
      id: "2",
      text: "Dimensions have been verified and are accurate.",
      by: "Ahmed Al Rashid",
      date: "2024-01-16 09:00",
    },
  ],
};

const statusConfig: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
  draft: { color: "gray", label: "Draft", icon: <IconClock size={14} /> },
  submitted: { color: "blue", label: "Submitted", icon: <IconClock size={14} /> },
  under_review: { color: "blue", label: "Under Review", icon: <IconRefresh size={14} /> },
  pending_documents: { color: "yellow", label: "Pending Documents", icon: <IconAlertTriangle size={14} /> },
  approved: { color: "green", label: "Approved", icon: <IconCircleCheck size={14} /> },
  rejected: { color: "red", label: "Rejected", icon: <IconAlertTriangle size={14} /> },
};

// Description Item Component
const DescriptionItem: React.FC<{ label: string; children: React.ReactNode; span?: number }> = ({
  label,
  children,
  span = 1,
}) => (
  <Grid.Col span={{ base: 12, md: span === 2 ? 12 : 6 }}>
    <Text size="sm" c="dimmed" mb={4}>
      {label}
    </Text>
    <Text size="sm" fw={500}>
      {children}
    </Text>
  </Grid.Col>
);

const ApplicationDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const form = useForm({
    initialValues: {
      comment: "",
    },
  });

  // Use params.id to fetch actual application data in real implementation
  console.log("Application ID:", params.id);

  const app = mockApplication;
  const statusInfo = statusConfig[app.status];

  const handleAddComment = (values: { comment: string }) => {
    console.log("Adding comment:", values.comment);
    form.reset();
  };

  return (
    <Box p="lg">
      {/* Header */}
      <Group mb="lg">
        <Button
          variant="subtle"
          color="gray"
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => navigate("/consultant/applications")}
        >
          Back to Applications
        </Button>
      </Group>

      {/* Application Header */}
      <Card shadow="sm" radius="md" withBorder mb="lg" p="lg">
        <Group justify="space-between" align="flex-start">
          <Stack gap="xs">
            <Group gap="sm">
              <Title order={3}>{app.referenceNumber}</Title>
              <Badge
                color={statusInfo.color}
                variant="light"
                leftSection={statusInfo.icon}
              >
                {statusInfo.label}
              </Badge>
            </Group>
            <Text c="dimmed">{app.projectName}</Text>
            <Text c="dimmed" size="sm">
              {app.serviceType}
            </Text>
          </Stack>
          <Group>
            {app.status === "approved" && (
              <Button color="dubaiBlue" leftSection={<IconDownload size={16} />}>
                Download Certificate
              </Button>
            )}
            <Button variant="outline" leftSection={<IconDownload size={16} />}>
              Download Summary
            </Button>
          </Group>
        </Group>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="details">
        <Tabs.List mb="lg">
          <Tabs.Tab value="details">Details</Tabs.Tab>
          <Tabs.Tab value="documents">Documents</Tabs.Tab>
          <Tabs.Tab value="timeline">Timeline</Tabs.Tab>
          <Tabs.Tab value="comments">Comments</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="details">
          <Grid gutter="lg">
            <Grid.Col span={{ base: 12, lg: 8 }}>
              <Card shadow="sm" radius="md" withBorder p="lg" mb="lg">
                <Title order={4} mb="md">
                  Project Details
                </Title>
                <Grid gutter="md">
                  <DescriptionItem label="Project Name" span={2}>
                    {app.projectName}
                  </DescriptionItem>
                  <DescriptionItem label="Project Name (Arabic)" span={2}>
                    {app.projectNameAr}
                  </DescriptionItem>
                  <DescriptionItem label="Description" span={2}>
                    {app.description}
                  </DescriptionItem>
                  <DescriptionItem label="Emirate">{app.location.emirate}</DescriptionItem>
                  <DescriptionItem label="Area">{app.location.area}</DescriptionItem>
                  <DescriptionItem label="Plot Number" span={2}>
                    {app.location.plotNumber}
                  </DescriptionItem>
                </Grid>
              </Card>

              <Card shadow="sm" radius="md" withBorder p="lg">
                <Title order={4} mb="md">
                  Owner Information
                </Title>
                <Grid gutter="md">
                  <DescriptionItem label="Name">{app.owner.name}</DescriptionItem>
                  <DescriptionItem label="Type">{app.owner.type}</DescriptionItem>
                  <DescriptionItem label="Email">{app.owner.email}</DescriptionItem>
                  <DescriptionItem label="Phone">{app.owner.phone}</DescriptionItem>
                </Grid>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 4 }}>
              <Card shadow="sm" radius="md" withBorder p="lg" mb="lg">
                <Title order={4} mb="md">
                  Fees & Payment
                </Title>
                <Stack gap="sm">
                  <Group justify="space-between">
                    <Text c="dimmed">Total Fee</Text>
                    <Text fw={600}>AED {app.fees.total.toLocaleString()}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text c="dimmed">Paid Amount</Text>
                    <Text fw={600} c="green">
                      AED {app.fees.paid.toLocaleString()}
                    </Text>
                  </Group>
                  <Divider />
                  <Group justify="space-between">
                    <Text c="dimmed">Payment Status</Text>
                    <Badge color="green">Paid</Badge>
                  </Group>
                </Stack>
              </Card>

              <Card shadow="sm" radius="md" withBorder p="lg">
                <Title order={4} mb="md">
                  Important Dates
                </Title>
                <Stack gap="sm">
                  <Group justify="space-between">
                    <Text c="dimmed">Submitted</Text>
                    <Text>{app.dates.submitted}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text c="dimmed">Approved</Text>
                    <Text>{app.dates.approved}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text c="dimmed">Expires</Text>
                    <Text>{app.dates.expires}</Text>
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="documents">
          <Card shadow="sm" radius="md" withBorder p="lg">
            <Stack gap="md">
              {app.documents.map((doc) => (
                <Group key={doc.id} justify="space-between" p="sm" style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <Group>
                    <Avatar color="dubaiBlue" radius="xl">
                      <IconFile size={20} />
                    </Avatar>
                    <Box>
                      <Text fw={500}>{doc.name}</Text>
                      <Text size="xs" c="dimmed">
                        Uploaded on {doc.uploadedAt}
                      </Text>
                    </Box>
                  </Group>
                  <Group>
                    <Badge color="green">Approved</Badge>
                    <Button variant="subtle" leftSection={<IconDownload size={14} />}>
                      Download
                    </Button>
                  </Group>
                </Group>
              ))}
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="timeline">
          <Card shadow="sm" radius="md" withBorder p="lg">
            <Timeline active={0} bulletSize={24} lineWidth={2}>
              {app.timeline.map((item, index) => {
                const config = statusConfig[item.status];
                return (
                  <Timeline.Item
                    key={index}
                    bullet={config?.icon}
                    color={config?.color === "green" ? "green" : "blue"}
                    title={
                      <Group gap="sm">
                        <Badge color={config?.color} variant="light">
                          {config?.label}
                        </Badge>
                        <Text size="xs" c="dimmed">
                          {item.date}
                        </Text>
                      </Group>
                    }
                  >
                    {item.comment && (
                      <Text size="sm" mt="xs">
                        {item.comment}
                      </Text>
                    )}
                    <Text size="xs" c="dimmed" mt={4}>
                      By: {item.by}
                    </Text>
                  </Timeline.Item>
                );
              })}
            </Timeline>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="comments">
          <Card shadow="sm" radius="md" withBorder p="lg">
            <Stack gap="md">
              {app.comments.map((comment) => (
                <Group key={comment.id} align="flex-start" p="sm" style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <Avatar radius="xl">
                    <IconUser size={20} />
                  </Avatar>
                  <Box style={{ flex: 1 }}>
                    <Group gap="sm">
                      <Text fw={600}>{comment.by}</Text>
                      <Text size="xs" c="dimmed">
                        {comment.date}
                      </Text>
                    </Group>
                    <Text size="sm" mt={4}>
                      {comment.text}
                    </Text>
                  </Box>
                </Group>
              ))}

              <Divider />

              <form onSubmit={form.onSubmit(handleAddComment)}>
                <Textarea
                  placeholder="Write a comment..."
                  minRows={3}
                  {...form.getInputProps("comment")}
                />
                <Group justify="flex-end" mt="md">
                  <Button
                    type="submit"
                    color="dubaiBlue"
                    leftSection={<IconSend size={16} />}
                  >
                    Add Comment
                  </Button>
                </Group>
              </form>
            </Stack>
          </Card>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default ApplicationDetailPage;
