import React from "react";
import { Stack, Title, Text, Button, Box, Center } from "@mantine/core";
import { IconInbox } from "@tabler/icons-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: React.ReactNode;
  image?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

/**
 * EmptyState Component
 * Displays a beautiful empty state with optional action button
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  actionIcon,
  image,
  size = "md",
}) => {
  const sizeStyles = {
    sm: {
      padding: 24,
      titleSize: "h4" as const,
      iconSize: 32,
    },
    md: {
      padding: 48,
      titleSize: "h3" as const,
      iconSize: 48,
    },
    lg: {
      padding: 64,
      titleSize: "h2" as const,
      iconSize: 64,
    },
  };

  const currentStyles = sizeStyles[size];

  return (
    <Center
      style={{
        padding: currentStyles.padding,
      }}
    >
      <Stack align="center" gap="md">
        {/* Icon or Image */}
        {image ? (
          <Box
            style={{
              height: size === "lg" ? 120 : size === "sm" ? 60 : 80,
            }}
          >
            {image}
          </Box>
        ) : icon ? (
          <Box
            style={{
              fontSize: currentStyles.iconSize,
              color: "#9ca3af",
            }}
          >
            {icon}
          </Box>
        ) : (
          <IconInbox size={currentStyles.iconSize} color="#9ca3af" />
        )}

        {/* Title */}
        {title && (
          <Title order={currentStyles.titleSize === "h2" ? 2 : currentStyles.titleSize === "h3" ? 3 : 4} c="#1f2937">
            {title}
          </Title>
        )}

        {/* Description */}
        {description && (
          <Text
            c="dimmed"
            ta="center"
            size={size === "sm" ? "sm" : "md"}
            maw={400}
          >
            {description}
          </Text>
        )}

        {/* Action Button */}
        {actionLabel && onAction && (
          <Button
            color="dubaiBlue"
            leftSection={actionIcon}
            onClick={onAction}
            size={size === "sm" ? "sm" : "md"}
            mt="md"
          >
            {actionLabel}
          </Button>
        )}
      </Stack>
    </Center>
  );
};

export default EmptyState;
