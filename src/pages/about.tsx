import React from 'react';
import { Grid, Title, Text, Card, Timeline, Stack, Box, Group, ThemeIcon } from '@mantine/core';
import {
    IconWorld,
    IconUsers,
    IconTrophy,
    IconShield,
    IconClock,
    IconCircleCheck,
} from '@tabler/icons-react';

// Stat Card Component
const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({
    title,
    value,
    icon,
}) => (
    <Card shadow="sm" radius="md" withBorder p="lg">
        <Group>
            <ThemeIcon size="lg" radius="md" variant="light" color="blue">
                {icon}
            </ThemeIcon>
            <Box>
                <Text size="xl" fw={700}>
                    {value}
                </Text>
                <Text size="sm" c="dimmed">
                    {title}
                </Text>
            </Box>
        </Group>
    </Card>
);

const About: React.FC = () => {
    const stats = [
        { title: 'Years of Experience', value: '25+', icon: <IconClock size={20} /> },
        { title: 'Companies Established', value: '10,000+', icon: <IconUsers size={20} /> },
        { title: 'Global Presence', value: '50+', icon: <IconWorld size={20} /> },
        { title: 'Success Rate', value: '98%', icon: <IconTrophy size={20} /> },
    ];

    const milestones = [
        {
            year: '1998',
            title: 'Foundation',
            description: "PCFC was established as a key player in Dubai's business landscape",
        },
        {
            year: '2005',
            title: 'Expansion',
            description: 'Launched comprehensive business setup services',
        },
        {
            year: '2010',
            title: 'Innovation',
            description: 'Introduced digital services for business registration',
        },
        {
            year: '2015',
            title: 'Global Recognition',
            description: 'Received international recognition for business excellence',
        },
        {
            year: '2020',
            title: 'Digital Transformation',
            description: 'Launched fully digital business setup platform',
        },
        {
            year: '2023',
            title: 'Future Ready',
            description: 'Expanding services to support emerging business sectors',
        },
    ];

    const services = [
        {
            title: 'Business Setup',
            description: "Comprehensive assistance in establishing your business in Dubai's free zones",
            icon: <IconCircleCheck size={32} color="#1890ff" />,
        },
        {
            title: 'Legal Support',
            description: 'Expert guidance on regulatory compliance and legal requirements',
            icon: <IconShield size={32} color="#1890ff" />,
        },
        {
            title: 'Business Advisory',
            description: 'Strategic consulting for business growth and market entry',
            icon: <IconUsers size={32} color="#1890ff" />,
        },
        {
            title: 'Global Expansion',
            description: 'Support for international businesses looking to establish in Dubai',
            icon: <IconWorld size={32} color="#1890ff" />,
        },
    ];

    return (
        <Box style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }} p="lg">
            <Box ta="center" mb="xl">
                <Title order={1}>About PCFC</Title>
                <Text size="lg" c="dimmed" maw={700} mx="auto" mt="md">
                    Your trusted partner in establishing and growing your business in Dubai's thriving free zone
                </Text>
            </Box>

            {/* Company Overview */}
            <Grid gutter="lg" mb="xl">
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Title order={2} mb="md">
                        Our Story
                    </Title>
                    <Text mb="md">
                        PCFC (Ports, Customs and Free Zone Corporation) has been at the forefront of Dubai's
                        business landscape for over two decades. We have played a pivotal role in transforming
                        Dubai into a global business hub, facilitating thousands of successful business setups
                        and contributing to the emirate's economic growth.
                    </Text>
                    <Text>
                        Our commitment to excellence, innovation, and customer service has made us the preferred
                        choice for businesses looking to establish their presence in Dubai's free zones. We
                        understand the unique challenges and opportunities of the region and provide tailored
                        solutions to help businesses thrive.
                    </Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Title order={2} mb="md">
                        Our Mission
                    </Title>
                    <Text mb="lg">
                        To be the leading facilitator of business growth in Dubai, providing innovative and
                        comprehensive solutions that enable businesses to establish, operate, and expand
                        successfully in the region.
                    </Text>
                    <Title order={2} mb="md">
                        Our Vision
                    </Title>
                    <Text>
                        To be the global benchmark for business setup services, driving economic growth and
                        fostering international business relationships in Dubai.
                    </Text>
                </Grid.Col>
            </Grid>

            {/* Statistics */}
            <Grid gutter="lg" mb="xl">
                {stats.map((stat, index) => (
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
                        <StatCard title={stat.title} value={stat.value} icon={stat.icon} />
                    </Grid.Col>
                ))}
            </Grid>

            {/* Services */}
            <Title order={2} ta="center" mb="lg">
                Our Services
            </Title>
            <Grid gutter="lg" mb="xl">
                {services.map((service, index) => (
                    <Grid.Col span={{ base: 12, md: 3 }} key={index}>
                        <Card shadow="sm" radius="md" withBorder p="lg" h="100%">
                            <Stack align="center">
                                {service.icon}
                                <Title order={4} ta="center">
                                    {service.title}
                                </Title>
                                <Text ta="center" c="dimmed">
                                    {service.description}
                                </Text>
                            </Stack>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>

            {/* Timeline */}
            <Title order={2} ta="center" mb="lg">
                Our Journey
            </Title>
            <Grid justify="center" mb="xl">
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Timeline active={milestones.length - 1} bulletSize={24} lineWidth={2}>
                        {milestones.map((milestone, index) => (
                            <Timeline.Item key={index} title={milestone.year}>
                                <Text fw={600}>{milestone.title}</Text>
                                <Text size="sm" c="dimmed">
                                    {milestone.description}
                                </Text>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                </Grid.Col>
            </Grid>

            {/* Why Choose Us */}
            <Card shadow="sm" radius="md" withBorder p="xl" mb="xl">
                <Title order={2} ta="center" mb="lg">
                    Why Choose PCFC?
                </Title>
                <Grid gutter="lg">
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Title order={4}>Expertise</Title>
                        <Text c="dimmed">
                            With over 25 years of experience, we have the knowledge and expertise to guide
                            you through every step of your business setup journey.
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Title order={4}>Innovation</Title>
                        <Text c="dimmed">
                            We continuously innovate our services and processes to provide the most efficient
                            and effective solutions for our clients.
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Title order={4}>Support</Title>
                        <Text c="dimmed">
                            Our dedicated team provides comprehensive support throughout your business journey,
                            ensuring your success in Dubai's competitive market.
                        </Text>
                    </Grid.Col>
                </Grid>
            </Card>
        </Box>
    );
};

export default About;
