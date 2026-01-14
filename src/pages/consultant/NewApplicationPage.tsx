import React, { useState } from "react";
import {
  Card,
  Stepper,
  Button,
  Group,
  Stack,
  Title,
  Text,
  Grid,
  TextInput,
  Select,
  Radio,
  Badge,
  Box,
  Textarea,
  ThemeIcon,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  IconArrowLeft,
  IconArrowRight,
  IconDeviceFloppy,
  IconSend,
  IconUpload,
  IconCircleCheck,
  IconX,
  IconFile,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

// Mock service types
const serviceTypes = [
  {
    id: "srv-initial-master-plan",
    name: "Initial Master Plan Approval",
    category: "Master Plan",
    estimatedDays: 15,
    estimatedFee: 5000,
    description: "Application for initial master plan approval for new development projects.",
  },
  {
    id: "srv-final-master-plan",
    name: "Final Master Plan Approval",
    category: "Master Plan",
    estimatedDays: 20,
    estimatedFee: 10000,
    description: "Application for final master plan approval after initial approval.",
  },
  {
    id: "srv-building-permit",
    name: "Building Permit",
    category: "Building Permit",
    estimatedDays: 30,
    estimatedFee: 25000,
    description: "Application for building permit to commence construction activities.",
  },
  {
    id: "srv-noc-fitout",
    name: "Fit-Out NOC",
    category: "NOC",
    estimatedDays: 7,
    estimatedFee: 1000,
    description: "No Objection Certificate for interior fit-out works.",
  },
  {
    id: "srv-noc-demolition",
    name: "Demolition NOC",
    category: "Demolition",
    estimatedDays: 10,
    estimatedFee: 12000,
    description: "No Objection Certificate for demolition works.",
  },
];

const dubaiAreas = [
  { value: "downtown", label: "Downtown Dubai" },
  { value: "dubai_marina", label: "Dubai Marina" },
  { value: "palm_jumeirah", label: "Palm Jumeirah" },
  { value: "jvc", label: "Jumeirah Village Circle" },
  { value: "business_bay", label: "Business Bay" },
  { value: "al_barsha", label: "Al Barsha" },
  { value: "dubai_silicon_oasis", label: "Dubai Silicon Oasis" },
];

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

const NewApplicationPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm({
    initialValues: {
      projectName: "",
      projectNameAr: "",
      projectDescription: "",
      emirate: "dubai",
      area: "",
      plotNumber: "",
      ownerType: "self",
      ownerName: "",
      ownerEmail: "",
      ownerPhone: "",
    },
    validate: {
      projectName: (value) => (!value ? "Please enter project name" : null),
      projectDescription: (value) => (!value ? "Please enter project description" : null),
      area: (value) => (!value ? "Please select area" : null),
      plotNumber: (value) => (!value ? "Please enter plot number" : null),
    },
  });

  const handleNext = async () => {
    if (currentStep === 0 && !selectedService) {
      notifications.show({
        title: "Warning",
        message: "Please select a service type",
        color: "yellow",
      });
      return;
    }
    if (currentStep === 1) {
      const validation = form.validate();
      if (validation.hasErrors) {
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      notifications.show({
        title: "Success",
        message: "Application submitted successfully!",
        color: "green",
        icon: <IconCircleCheck size={16} />,
      });
    }, 2000);
  };

  const selectedServiceData = serviceTypes.find((s) => s.id === selectedService);

  // Step 1: Service Type Selection
  const renderServiceTypeStep = () => (
    <Box>
      <Title order={4} mb="xs">
        Select Service Type
      </Title>
      <Text c="dimmed" mb="lg">
        Choose the type of service you want to apply for
      </Text>
      <Grid gutter="md">
        {serviceTypes.map((service) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }} key={service.id}>
            <Card
              shadow="sm"
              radius="md"
              withBorder
              p="md"
              style={{
                cursor: "pointer",
                borderColor: selectedService === service.id ? "#004d99" : undefined,
                borderWidth: selectedService === service.id ? 2 : 1,
              }}
              onClick={() => setSelectedService(service.id)}
            >
              <Stack gap="xs">
                <Badge color="blue" variant="light">
                  {service.category}
                </Badge>
                <Title order={5}>{service.name}</Title>
                <Text size="sm" c="dimmed">
                  {service.description}
                </Text>
                <Group gap="xs">
                  <Text size="sm" c="dimmed">
                    ~{service.estimatedDays} days
                  </Text>
                  <Text c="dimmed">|</Text>
                  <Text size="sm" c="dimmed">
                    ~AED {service.estimatedFee.toLocaleString()}
                  </Text>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );

  // Step 2: Project Information
  const renderProjectInfoStep = () => (
    <Box>
      <Title order={4} mb="xs">
        Project Information
      </Title>
      <Text c="dimmed" mb="lg">
        Provide details about your project
      </Text>

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label="Project Name"
            placeholder="Enter project name"
            withAsterisk
            {...form.getInputProps("projectName")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label="Project Name (Arabic)"
            placeholder="أدخل اسم المشروع"
            dir="rtl"
            {...form.getInputProps("projectNameAr")}
          />
        </Grid.Col>
      </Grid>

      <Textarea
        label="Project Description"
        placeholder="Describe your project..."
        minRows={4}
        withAsterisk
        mt="md"
        {...form.getInputProps("projectDescription")}
      />

      <Title order={5} mt="xl" mb="md">
        Location Details
      </Title>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="Emirate"
            data={[{ value: "dubai", label: "Dubai" }]}
            disabled
            {...form.getInputProps("emirate")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="Area"
            placeholder="Select area"
            data={dubaiAreas}
            withAsterisk
            {...form.getInputProps("area")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="Plot Number"
            placeholder="e.g., JVC-456"
            withAsterisk
            {...form.getInputProps("plotNumber")}
          />
        </Grid.Col>
      </Grid>

      <Title order={5} mt="xl" mb="md">
        Owner Information
      </Title>
      <Radio.Group
        value={form.values.ownerType}
        onChange={(value) => form.setFieldValue("ownerType", value)}
        mb="md"
      >
        <Group>
          <Radio value="self" label="I am the owner" />
          <Radio value="other" label="Different owner" />
        </Group>
      </Radio.Group>

      {form.values.ownerType === "other" && (
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="Owner Name"
              placeholder="Enter owner name"
              withAsterisk
              {...form.getInputProps("ownerName")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="Owner Email"
              placeholder="owner@example.com"
              withAsterisk
              {...form.getInputProps("ownerEmail")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="Owner Phone"
              placeholder="+971 50 123 4567"
              withAsterisk
              {...form.getInputProps("ownerPhone")}
            />
          </Grid.Col>
        </Grid>
      )}
    </Box>
  );

  // Step 3: Document Upload
  const renderDocumentsStep = () => (
    <Box>
      <Title order={4} mb="xs">
        Upload Documents
      </Title>
      <Text c="dimmed" mb="lg">
        Upload all required documents for your application
      </Text>

      <Grid gutter="lg">
        {[
          { title: "Title Deed", hint: "PDF only, max 10MB", required: true },
          { title: "Site Plan", hint: "PDF or DWG, max 50MB", required: true },
          { title: "Consultant License", hint: "PDF only, max 5MB", required: true },
          { title: "Additional Documents", hint: "Any additional supporting documents", required: false },
        ].map((doc, index) => (
          <Grid.Col span={{ base: 12, md: 6 }} key={index}>
            <Card shadow="sm" radius="md" withBorder p="md">
              <Group justify="space-between" mb="sm">
                <Text fw={500}>{doc.title}</Text>
                <Badge color={doc.required ? "red" : "gray"} variant="light">
                  {doc.required ? "Required" : "Optional"}
                </Badge>
              </Group>
              <Dropzone
                onDrop={(files) => console.log("accepted files", files)}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={50 * 1024 ** 2}
                accept={[MIME_TYPES.pdf]}
              >
                <Group justify="center" gap="xs" style={{ minHeight: 100, pointerEvents: "none" }}>
                  <Dropzone.Accept>
                    <IconUpload size={32} color="#004d99" />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX size={32} color="red" />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconFile size={32} color="#666" />
                  </Dropzone.Idle>
                  <Stack gap={0} align="center">
                    <Text size="sm" c="dimmed">
                      Click or drag file to upload
                    </Text>
                    <Text size="xs" c="dimmed">
                      {doc.hint}
                    </Text>
                  </Stack>
                </Group>
              </Dropzone>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );

  // Step 4: Review
  const renderReviewStep = () => (
    <Box>
      <Title order={4} mb="xs">
        Review & Submit
      </Title>
      <Text c="dimmed" mb="lg">
        Please review your application before submitting
      </Text>

      <Card shadow="sm" radius="md" withBorder p="lg">
        <Title order={5} mb="md">
          Service Details
        </Title>
        <Grid gutter="md" mb="xl">
          <DescriptionItem label="Service Type" span={2}>
            {selectedServiceData?.name}
          </DescriptionItem>
          <DescriptionItem label="Category">
            {selectedServiceData?.category}
          </DescriptionItem>
          <DescriptionItem label="Estimated Fee">
            AED {selectedServiceData?.estimatedFee.toLocaleString()}
          </DescriptionItem>
        </Grid>

        <Title order={5} mb="md">
          Project Details
        </Title>
        <Grid gutter="md" mb="xl">
          <DescriptionItem label="Project Name" span={2}>
            {form.values.projectName || "-"}
          </DescriptionItem>
          <DescriptionItem label="Description" span={2}>
            {form.values.projectDescription || "-"}
          </DescriptionItem>
          <DescriptionItem label="Area">
            {dubaiAreas.find((a) => a.value === form.values.area)?.label || "-"}
          </DescriptionItem>
          <DescriptionItem label="Plot Number">
            {form.values.plotNumber || "-"}
          </DescriptionItem>
        </Grid>

        <Title order={5} mb="md">
          Documents
        </Title>
        <Grid gutter="md">
          <DescriptionItem label="Title Deed">
            <Badge color="orange" variant="light">
              Pending upload
            </Badge>
          </DescriptionItem>
          <DescriptionItem label="Site Plan">
            <Badge color="orange" variant="light">
              Pending upload
            </Badge>
          </DescriptionItem>
          <DescriptionItem label="Consultant License">
            <Badge color="orange" variant="light">
              Pending upload
            </Badge>
          </DescriptionItem>
        </Grid>
      </Card>
    </Box>
  );

  // Success Screen
  if (isSubmitted) {
    return (
      <Box p="lg">
        <Card shadow="sm" radius="md" withBorder p="xl">
          <Stack align="center" gap="lg">
            <ThemeIcon size={80} radius="xl" color="green" variant="light">
              <IconCircleCheck size={48} />
            </ThemeIcon>
            <Title order={2} ta="center">
              Application Submitted Successfully!
            </Title>
            <Text ta="center" c="dimmed">
              Your application reference number is:{" "}
              <Text span fw={700}>
                DM-2024-{Math.floor(Math.random() * 900000 + 100000)}
              </Text>
            </Text>
            <Text ta="center" c="dimmed">
              You will receive a confirmation email shortly.
            </Text>
            <Group>
              <Button
                color="dubaiBlue"
                onClick={() => navigate("/consultant/dashboard")}
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/consultant/applications")}
              >
                View Applications
              </Button>
            </Group>
          </Stack>
        </Card>
      </Box>
    );
  }

  return (
    <Box p="lg">
      {/* Header */}
      <Group mb="lg">
        <Button
          variant="subtle"
          color="gray"
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => navigate("/consultant/dashboard")}
        >
          Back to Dashboard
        </Button>
      </Group>

      <Card shadow="sm" radius="md" withBorder p="lg">
        {/* Stepper */}
        <Stepper active={currentStep} mb="xl">
          <Stepper.Step label="Service Type" description="Select service" />
          <Stepper.Step label="Project Info" description="Project details" />
          <Stepper.Step label="Documents" description="Upload files" />
          <Stepper.Step label="Review" description="Review & submit" />
        </Stepper>

        {/* Step Content */}
        <Box style={{ minHeight: 400 }} py="lg">
          {currentStep === 0 && renderServiceTypeStep()}
          {currentStep === 1 && renderProjectInfoStep()}
          {currentStep === 2 && renderDocumentsStep()}
          {currentStep === 3 && renderReviewStep()}
        </Box>

        {/* Navigation */}
        <Group justify="space-between" mt="xl">
          <Group>
            {currentStep > 0 && (
              <Button
                variant="outline"
                leftSection={<IconArrowLeft size={16} />}
                onClick={handlePrev}
              >
                Previous
              </Button>
            )}
          </Group>
          <Group>
            <Button variant="outline" leftSection={<IconDeviceFloppy size={16} />}>
              Save as Draft
            </Button>
            {currentStep < 3 ? (
              <Button
                color="dubaiBlue"
                rightSection={<IconArrowRight size={16} />}
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button
                color="dubaiBlue"
                leftSection={<IconSend size={16} />}
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Submit Application
              </Button>
            )}
          </Group>
        </Group>
      </Card>
    </Box>
  );
};

export default NewApplicationPage;
