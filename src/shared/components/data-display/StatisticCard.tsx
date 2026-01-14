import React from "react";
import { Card, Text, Group, Box, Skeleton } from "@mantine/core";
import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";

interface TrendInfo {
  value: number;
  isPositive: boolean;
}

interface StatisticCardProps {
  title: string;
  value: number | string;
  prefix?: React.ReactNode;
  suffix?: string;
  trend?: TrendInfo;
  description?: string;
  loading?: boolean;
  onClick?: () => void;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * StatisticCard Component
 * Displays a statistic with optional trend indicator and description
 */
export const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  prefix,
  suffix,
  trend,
  description,
  loading = false,
  onClick,
  color,
  style,
}) => {
  if (loading) {
    return (
      <Card
        shadow="sm"
        radius="md"
        withBorder
        p="lg"
        style={{
          borderTop: color ? `3px solid ${color}` : undefined,
          ...style,
        }}
      >
        <Skeleton height={16} width="40%" mb="sm" />
        <Skeleton height={32} width="60%" />
      </Card>
    );
  }

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      p="lg"
      style={{
        cursor: onClick ? "pointer" : "default",
        borderTop: color ? `3px solid ${color}` : undefined,
        ...style,
      }}
      onClick={onClick}
    >
      <Text size="sm" c="dimmed" mb="xs">
        {title}
      </Text>
      <Group gap="xs" align="baseline">
        {prefix && <Box>{prefix}</Box>}
        <Text
          fz={28}
          fw={600}
          style={{ color: color || undefined }}
        >
          {value}
        </Text>
        {suffix && (
          <Text size="sm" c="dimmed">
            {suffix}
          </Text>
        )}
      </Group>

      {(trend || description) && (
        <Box mt="xs">
          {trend && (
            <Group gap={4}>
              {trend.isPositive ? (
                <IconArrowUp size={12} color="#0d9f6e" />
              ) : (
                <IconArrowDown size={12} color="#dc2626" />
              )}
              <Text
                size="sm"
                c={trend.isPositive ? "green" : "red"}
              >
                {trend.value}%
              </Text>
              <Text size="sm" c="dimmed">
                vs last month
              </Text>
            </Group>
          )}
          {description && !trend && (
            <Text size="sm" c="dimmed">
              {description}
            </Text>
          )}
        </Box>
      )}
    </Card>
  );
};

export default StatisticCard;
