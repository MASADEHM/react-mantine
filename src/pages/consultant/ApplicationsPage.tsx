import React, { useState } from "react";
import {
  Card,
  Table,
  Badge,
  Button,
  Group,
  TextInput,
  Select,
  Grid,
  Title,
  Box,
  ActionIcon,
} from "@mantine/core";
import { DatePickerInput, DatesRangeValue } from "@mantine/dates";
import {
  IconPlus,
  IconEye,
  IconEdit,
  IconTrash,
  IconSearch,
  IconFileText,
  IconCircleCheck,
  IconClock,
  IconAlertTriangle,
  IconRefresh,
  IconX,
} from "@tabler/icons-react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Application {
  id: string;
  referenceNumber: string;
  projectName: string;
  serviceType: string;
  serviceCategory: string;
  status: string;
  ownerName: string;
  submittedAt: string;
  updatedAt: string;
  totalFee: number;
}

// Mock data
const mockApplications: Application[] = [
  {
    id: "1",
    referenceNumber: "DM-2024-001234",
    projectName: "Palm Heights Residence",
    serviceType: "Initial Master Plan",
    serviceCategory: "master_plan",
    status: "approved",
    ownerName: "Emirates Properties Development",
    submittedAt: "2024-01-10",
    updatedAt: "2024-01-25",
    totalFee: 27000,
  },
  {
    id: "2",
    referenceNumber: "DM-2024-001456",
    projectName: "Marina Business Tower",
    serviceType: "Building Permit",
    serviceCategory: "building_permit",
    status: "under_review",
    ownerName: "Emirates Properties Development",
    submittedAt: "2024-02-01",
    updatedAt: "2024-02-02",
    totalFee: 1505000,
  },
  {
    id: "3",
    referenceNumber: "DM-2024-001789",
    projectName: "Retail Store Fit-Out - Mall of Emirates",
    serviceType: "Fit-Out NOC",
    serviceCategory: "noc",
    status: "pending_documents",
    ownerName: "Sara Al Fahim",
    submittedAt: "2024-03-01",
    updatedAt: "2024-03-02",
    totalFee: 1000,
  },
  {
    id: "4",
    referenceNumber: "DM-2024-002001",
    projectName: "Silicon Oasis Villa Project",
    serviceType: "Initial Master Plan",
    serviceCategory: "master_plan",
    status: "draft",
    ownerName: "Emirates Properties Development",
    submittedAt: "",
    updatedAt: "2024-03-15",
    totalFee: 0,
  },
  {
    id: "5",
    referenceNumber: "DM-2024-000987",
    projectName: "Old Warehouse Demolition",
    serviceType: "Demolition NOC",
    serviceCategory: "demolition",
    status: "rejected",
    ownerName: "Emirates Properties Development",
    submittedAt: "2024-01-05",
    updatedAt: "2024-01-08",
    totalFee: 2000,
  },
];

const statusConfig: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
  draft: { color: "gray", label: "Draft", icon: <IconFileText size={12} /> },
  submitted: { color: "blue", label: "Submitted", icon: <IconClock size={12} /> },
  under_review: { color: "blue", label: "Under Review", icon: <IconRefresh size={12} /> },
  pending_documents: { color: "yellow", label: "Pending Documents", icon: <IconAlertTriangle size={12} /> },
  approved: { color: "green", label: "Approved", icon: <IconCircleCheck size={12} /> },
  rejected: { color: "red", label: "Rejected", icon: <IconX size={12} /> },
  cancelled: { color: "gray", label: "Cancelled", icon: <IconX size={12} /> },
};

const ApplicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialStatus = searchParams.get("status");
  
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(initialStatus || null);
  const [serviceFilter, setServiceFilter] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DatesRangeValue>([null, null]);

  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch =
      !searchText ||
      app.referenceNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      app.projectName.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = !statusFilter || app.status === statusFilter;
    const matchesService = !serviceFilter || app.serviceCategory === serviceFilter;
    return matchesSearch && matchesStatus && matchesService;
  });

  const rows = filteredApplications.map((app) => {
    const config = statusConfig[app.status];
    return (
      <Table.Tr key={app.id}>
        <Table.Td>
          <strong>{app.referenceNumber}</strong>
        </Table.Td>
        <Table.Td style={{ maxWidth: 200 }}>
          {app.projectName}
        </Table.Td>
        <Table.Td>{app.serviceType}</Table.Td>
        <Table.Td style={{ maxWidth: 150 }}>
          {app.ownerName}
        </Table.Td>
        <Table.Td>
          <Badge
            color={config?.color}
            variant="light"
            leftSection={config?.icon}
          >
            {config?.label || app.status}
          </Badge>
        </Table.Td>
        <Table.Td>{app.updatedAt}</Table.Td>
        <Table.Td style={{ textAlign: "right" }}>
          {app.totalFee.toLocaleString()}
        </Table.Td>
        <Table.Td>
          <Group gap="xs">
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => navigate(`/consultant/applications/${app.id}`)}
            >
              <IconEye size={16} />
            </ActionIcon>
            {app.status === "draft" && (
              <>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={() => navigate(`/consultant/applications/${app.id}/edit`)}
                >
                  <IconEdit size={16} />
                </ActionIcon>
                <ActionIcon variant="subtle" color="red">
                  <IconTrash size={16} />
                </ActionIcon>
              </>
            )}
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Box p="lg">
      {/* Header */}
      <Group justify="space-between" align="center" mb="lg">
        <Title order={2}>Applications</Title>
        <Button
          size="md"
          color="dubaiBlue"
          leftSection={<IconPlus size={16} />}
          onClick={() => navigate("/consultant/applications/new")}
        >
          New Application
        </Button>
      </Group>

      {/* Filters */}
      <Card shadow="sm" radius="md" withBorder mb="lg" p="md">
        <Grid gutter="md" align="flex-end">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              placeholder="Search by reference or project name..."
              leftSection={<IconSearch size={16} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 2.5 }}>
            <Select
              placeholder="Filter by status"
              clearable
              value={statusFilter}
              onChange={setStatusFilter}
              data={[
                { value: "draft", label: "Draft" },
                { value: "submitted", label: "Submitted" },
                { value: "under_review", label: "Under Review" },
                { value: "pending_documents", label: "Pending Documents" },
                { value: "approved", label: "Approved" },
                { value: "rejected", label: "Rejected" },
              ]}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 2.5 }}>
            <Select
              placeholder="Filter by service"
              clearable
              value={serviceFilter}
              onChange={setServiceFilter}
              data={[
                { value: "master_plan", label: "Master Plan" },
                { value: "building_permit", label: "Building Permit" },
                { value: "noc", label: "NOC" },
                { value: "modification", label: "Modification" },
                { value: "demolition", label: "Demolition" },
              ]}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <DatePickerInput
              type="range"
              placeholder="Date range"
              value={dateRange}
              onChange={setDateRange}
              clearable
            />
          </Grid.Col>
        </Grid>
      </Card>

      {/* Table */}
      <Card shadow="sm" radius="md" withBorder>
        <Table.ScrollContainer minWidth={800}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Reference</Table.Th>
                <Table.Th>Project Name</Table.Th>
                <Table.Th>Service Type</Table.Th>
                <Table.Th>Owner</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Updated</Table.Th>
                <Table.Th style={{ textAlign: "right" }}>Fee (AED)</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>
    </Box>
  );
};

export default ApplicationsPage;
