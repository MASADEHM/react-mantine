import React from "react";
import { Badge } from "@mantine/core";
import {
  IconClock,
  IconRefresh,
  IconCircleCheck,
  IconX,
  IconAlertTriangle,
  IconFileText,
  IconBan,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import type { ApplicationStatus } from "@/shared/types/common.types";

interface StatusTagProps {
  status: ApplicationStatus;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

interface StatusConfig {
  color: string;
  icon: React.ReactNode;
  labelKey: string;
}

const statusConfig: Record<ApplicationStatus, StatusConfig> = {
  draft: {
    color: "gray",
    icon: <IconFileText size={12} />,
    labelKey: "applications.status.draft",
  },
  submitted: {
    color: "blue",
    icon: <IconClock size={12} />,
    labelKey: "applications.status.submitted",
  },
  under_review: {
    color: "blue",
    icon: <IconRefresh size={12} />,
    labelKey: "applications.status.under_review",
  },
  pending_documents: {
    color: "yellow",
    icon: <IconAlertTriangle size={12} />,
    labelKey: "applications.status.pending_documents",
  },
  approved: {
    color: "green",
    icon: <IconCircleCheck size={12} />,
    labelKey: "applications.status.approved",
  },
  rejected: {
    color: "red",
    icon: <IconX size={12} />,
    labelKey: "applications.status.rejected",
  },
  cancelled: {
    color: "gray",
    icon: <IconBan size={12} />,
    labelKey: "applications.status.cancelled",
  },
};

/**
 * StatusTag Component
 * Displays application status with appropriate color and icon
 */
export const StatusTag: React.FC<StatusTagProps> = ({
  status,
  size = "md",
  showIcon = true,
}) => {
  const { t } = useTranslation();
  const config = statusConfig[status];

  if (!config) {
    return <Badge variant="light">{status}</Badge>;
  }

  return (
    <Badge
      color={config.color}
      variant="light"
      size={size}
      leftSection={showIcon ? config.icon : undefined}
    >
      {t(config.labelKey)}
    </Badge>
  );
};

export default StatusTag;
