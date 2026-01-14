import React from "react";
import { Title, Text, Group, Box, Breadcrumbs, Anchor, Button, Grid } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface BreadcrumbItem {
  title: string;
  path?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  showBack?: boolean;
  onBack?: () => void;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * PageHeader Component
 * Consistent page header with breadcrumbs, title, and optional actions
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  showBack = false,
  onBack,
  extra,
  children,
  style,
}) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const breadcrumbItems = breadcrumbs?.map((item, index) => (
    item.path ? (
      <Anchor key={index} onClick={() => item.path && navigate(item.path)}>
        {item.title}
      </Anchor>
    ) : (
      <Text key={index}>{item.title}</Text>
    )
  ));

  return (
    <Box
      mb="lg"
      style={style}
    >
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs mb="md">
          {breadcrumbItems}
        </Breadcrumbs>
      )}

      {/* Header Row */}
      <Grid justify="space-between" align="center" gutter="md">
        <Grid.Col span="auto">
          <Group gap="md" align="center">
            {showBack && (
              <Button
                variant="subtle"
                color="gray"
                p={0}
                onClick={handleBack}
              >
                <IconArrowLeft
                  size={20}
                  style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
                />
              </Button>
            )}
            <Box>
              <Title
                order={2}
                mb={subtitle ? 4 : 0}
                fz={24}
                fw={600}
              >
                {title}
              </Title>
              {subtitle && (
                <Text c="dimmed" size="sm">
                  {subtitle}
                </Text>
              )}
            </Box>
          </Group>
        </Grid.Col>

        {/* Extra actions */}
        {extra && (
          <Grid.Col span="content">
            <Group>{extra}</Group>
          </Grid.Col>
        )}
      </Grid>

      {/* Additional content */}
      {children && <Box mt="md">{children}</Box>}
    </Box>
  );
};

export default PageHeader;
