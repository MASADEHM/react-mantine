import React from 'react';
import { Box, Grid, Title, Text, Divider, Group, Anchor, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandInstagram,
} from '@tabler/icons-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { title: 'Home', path: '/' },
        { title: 'About Us', path: '/about' },
        { title: 'Company Setup', path: '/company-setup' },
        { title: 'Contact Us', path: '/contact' }
    ];

    const socialLinks = [
        { icon: <IconBrandFacebook size={24} />, url: 'https://facebook.com' },
        { icon: <IconBrandTwitter size={24} />, url: 'https://twitter.com' },
        { icon: <IconBrandLinkedin size={24} />, url: 'https://linkedin.com' },
        { icon: <IconBrandInstagram size={24} />, url: 'https://instagram.com' }
    ];

    return (
        <Box
            component="footer"
            py="xl"
            mt="xl"
            style={{ backgroundColor: '#f8f9fa' }}
        >
            <Box className="footer-area" px="md">
                <Grid gutter={{ base: 24, md: 48 }} justify="center">
                    {/* Company Information */}
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Title order={4}>PCFC Company Setup</Title>
                        <Text c="dimmed" mt="sm">
                            Your trusted partner in establishing and growing your business in Dubai's thriving free zone.
                            We provide comprehensive business setup services and support to help you succeed.
                        </Text>
                    </Grid.Col>

                    {/* Quick Links */}
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Title order={4}>Quick Links</Title>
                        <Stack gap="xs" mt="sm">
                            {quickLinks.map((link, index) => (
                                <Anchor
                                    key={index}
                                    component={Link}
                                    to={link.path}
                                    underline="hover"
                                    c="dimmed"
                                >
                                    {link.title}
                                </Anchor>
                            ))}
                        </Stack>
                    </Grid.Col>

                    {/* Contact Information */}
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Title order={4}>Contact Info</Title>
                        <Stack gap="xs" mt="sm">
                            <Text c="dimmed">
                                <strong>Address:</strong><br />
                                Ports, Customs and Free Zone Corporation<br />
                                Dubai, United Arab Emirates
                            </Text>
                            <Text c="dimmed">
                                <strong>Phone:</strong><br />
                                +971 4 123 4567<br />
                                +971 4 123 4568
                            </Text>
                            <Text c="dimmed">
                                <strong>Email:</strong><br />
                                info@pcfc.ae<br />
                                support@pcfc.ae
                            </Text>
                        </Stack>
                    </Grid.Col>
                </Grid>

                <Divider my="xl" />

                {/* Social Media Links and Copyright */}
                <Grid justify="center" align="center">
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Group justify="center" gap="lg">
                            {socialLinks.map((social, index) => (
                                <Anchor
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    c="dark"
                                >
                                    {social.icon}
                                </Anchor>
                            ))}
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Text ta="center" c="dimmed">
                            © {currentYear} PCFC Company Setup. All rights reserved.
                        </Text>
                    </Grid.Col>
                </Grid>
            </Box>
        </Box>
    );
};

export default Footer;
