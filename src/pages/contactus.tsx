import React from "react";
import {
  TextInput,
  Textarea,
  Button,
  Card,
  Grid,
  Title,
  Text,
  Stack,
  Group,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconMail, IconPhone, IconMapPin, IconCheck } from "@tabler/icons-react";

const ContactUs: React.FC = () => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validate: {
      name: (value) => (!value ? "Please enter your name" : null),
      email: (value) => {
        if (!value) return "Please enter your email";
        if (!/^\S+@\S+$/.test(value)) return "Please enter a valid email";
        return null;
      },
      phone: (value) => (!value ? "Please enter your phone number" : null),
      subject: (value) => (!value ? "Please enter a subject" : null),
      message: (value) => (!value ? "Please enter your message" : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log("Form values:", values);
    notifications.show({
      title: "Message Sent",
      message: "Thank you for your message. We will get back to you soon!",
      color: "green",
      icon: <IconCheck size={16} />,
    });
    form.reset();
  };

  return (
    <Box p="lg">
      <Title order={2} ta="center" mb="sm">
        Contact Us
      </Title>
      <Text ta="center" c="dimmed" maw={700} mx="auto" mb="xl">
        We value your interest in Dubai Building Permits Portal. Whether you have questions about our services,
        need support, or want to discuss your projects, our team is here to help.
      </Text>

      <Grid gutter="lg">
        {/* Contact Information */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" radius="md" withBorder p="lg" h="100%">
            <Title order={4} mb="md">
              Get in Touch
            </Title>
            <Text c="dimmed" mb="xl">
              We're here to help you with your building permit applications.
              Feel free to reach out to us through any of the following channels.
            </Text>

            <Stack gap="xl">
              <Group>
                <IconMapPin size={24} color="#004d99" />
                <Box>
                  <Text fw={600}>Address:</Text>
                  <Text c="dimmed" size="sm">
                    Dubai Municipality
                    <br />
                    Dubai, United Arab Emirates
                  </Text>
                </Box>
              </Group>

              <Group>
                <IconPhone size={24} color="#004d99" />
                <Box>
                  <Text fw={600}>Phone:</Text>
                  <Text c="dimmed" size="sm">
                    +971 4 123 4567
                    <br />
                    +971 4 123 4568
                  </Text>
                </Box>
              </Group>

              <Group>
                <IconMail size={24} color="#004d99" />
                <Box>
                  <Text fw={600}>Email:</Text>
                  <Text c="dimmed" size="sm">
                    info@dm.gov.ae
                    <br />
                    support@dm.gov.ae
                  </Text>
                </Box>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>

        {/* Contact Form */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" radius="md" withBorder p="lg">
            <Title order={4} mb="md">
              Send us a Message
            </Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <TextInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  withAsterisk
                  {...form.getInputProps("name")}
                />

                <TextInput
                  label="Email"
                  placeholder="Enter your email"
                  withAsterisk
                  {...form.getInputProps("email")}
                />

                <TextInput
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  withAsterisk
                  {...form.getInputProps("phone")}
                />

                <TextInput
                  label="Subject"
                  placeholder="Enter message subject"
                  withAsterisk
                  {...form.getInputProps("subject")}
                />

                <Textarea
                  label="Message"
                  placeholder="Enter your message"
                  minRows={4}
                  withAsterisk
                  {...form.getInputProps("message")}
                />

                <Button type="submit" color="dubaiBlue" fullWidth>
                  Send Message
                </Button>
              </Stack>
            </form>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default ContactUs;
