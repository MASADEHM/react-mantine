/**
 * App Footer Component
 */
import React from "react";
import { Box, Grid, Title, Text, Divider, Group, Anchor, Stack } from "@mantine/core";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandInstagram,
} from "@tabler/icons-react";

export const AppFooter: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { title: t("common.home"), path: "/" },
    { title: t("common.about"), path: "/about" },
    { title: t("common.contact"), path: "/contact" },
  ];

  const socialLinks = [
    { icon: <IconBrandFacebook size={20} />, url: "https://facebook.com", name: "Facebook" },
    { icon: <IconBrandTwitter size={20} />, url: "https://twitter.com", name: "Twitter" },
    { icon: <IconBrandLinkedin size={20} />, url: "https://linkedin.com", name: "LinkedIn" },
    { icon: <IconBrandInstagram size={20} />, url: "https://instagram.com", name: "Instagram" },
  ];

  return (
    <Box
      component="footer"
      style={{
        background: "#001529",
        color: "#fff",
        padding: "48px 24px 24px",
      }}
    >
      <Box style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Grid gutter={{ base: 32, md: 48 }}>
          {/* About */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Title order={4} c="white" mb="md">
              DCCJ Portal
            </Title>
            <Text c="rgba(255, 255, 255, 0.65)" size="sm">
              Dubai Civil Consultant Journey Portal - Your gateway to streamlined 
              building permit and NOC workflows in Dubai.
            </Text>
          </Grid.Col>

          {/* Quick Links */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Title order={4} c="white" mb="md">
              {t("footer.quickLinks")}
            </Title>
            <Stack gap="xs">
              {quickLinks.map((link, index) => (
                <Anchor
                  key={index}
                  component={Link}
                  to={link.path}
                  c="rgba(255, 255, 255, 0.65)"
                  underline="hover"
                  size="sm"
                >
                  {link.title}
                </Anchor>
              ))}
            </Stack>
          </Grid.Col>

          {/* Contact */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Title order={4} c="white" mb="md">
              {t("footer.contact")}
            </Title>
            <Stack gap="xs">
              <Text c="rgba(255, 255, 255, 0.65)" size="sm">
                Dubai Municipality<br />
                Dubai, United Arab Emirates
              </Text>
              <Text c="rgba(255, 255, 255, 0.65)" size="sm">
                {t("footer.phone")}: +971 4 221 5555
              </Text>
              <Text c="rgba(255, 255, 255, 0.65)" size="sm">
                {t("footer.email")}: info@dm.gov.ae
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider my="xl" color="rgba(255, 255, 255, 0.15)" />

        {/* Bottom Row */}
        <Grid justify="space-between" align="center">
          <Grid.Col span={{ base: 12, md: 6 }} style={{ textAlign: "center" }}>
            <Group justify="center" gap="lg" mb={{ base: "md", md: 0 }}>
              {socialLinks.map((social, index) => (
                <Anchor
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  c="white"
                  aria-label={social.name}
                >
                  {social.icon}
                </Anchor>
              ))}
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} style={{ textAlign: "center" }}>
            <Text c="rgba(255, 255, 255, 0.45)" size="xs">
              © {currentYear} Dubai Municipality. {t("footer.allRightsReserved")}
            </Text>
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
};

export default AppFooter;
