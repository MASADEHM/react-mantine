import React, { useState } from 'react';
import { AppShell, NavLink, Text, Box, ScrollArea } from '@mantine/core';
import {
  IconDashboard,
  IconCreditCard,
  IconFileText,
  IconRefresh,
  IconFileOff,
} from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  const [localCollapsed] = useState(false);

  const isCollapsed = collapsed ?? localCollapsed;

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppShell.Navbar
      p="md"
      style={{
        background: '#fff',
        borderRight: '1px solid #f0f0f0',
      }}
    >
      {/* Header */}
      <Box
        h={64}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #f0f0f0',
        }}
        mb="md"
      >
        <Text fw={700} size="lg">
          {isCollapsed ? 'Menu' : 'Main Menu'}
        </Text>
      </Box>

      {/* Navigation */}
      <ScrollArea style={{ flex: 1 }}>
        <NavLink
          component={Link}
          to="/dashboard"
          label={!isCollapsed ? "Dashboard" : undefined}
          leftSection={<IconDashboard size={18} />}
          active={isActive("/dashboard")}
          variant="light"
          color="dubaiBlue"
        />

        <NavLink
          component={Link}
          to="/payment"
          label={!isCollapsed ? "Payment" : undefined}
          leftSection={<IconCreditCard size={18} />}
          active={isActive("/payment")}
          variant="light"
          color="dubaiBlue"
        />

        <NavLink
          label={!isCollapsed ? "License Services" : undefined}
          leftSection={<IconFileText size={18} />}
          childrenOffset={28}
          defaultOpened
        >
          <NavLink
            component={Link}
            to="/license/renewal"
            label="Renewal"
            leftSection={<IconRefresh size={16} />}
            active={isActive("/license/renewal")}
            variant="light"
            color="dubaiBlue"
          />
          <NavLink
            component={Link}
            to="/license/cancellation"
            label="Cancellation"
            leftSection={<IconFileOff size={16} />}
            active={isActive("/license/cancellation")}
            variant="light"
            color="dubaiBlue"
          />
          <NavLink
            component={Link}
            to="/license/letters"
            label="Letters"
            leftSection={<IconFileText size={16} />}
            active={isActive("/license/letters")}
            variant="light"
            color="dubaiBlue"
          />
        </NavLink>

        <NavLink
          component={Link}
          to="/requests"
          label={!isCollapsed ? "Requests" : undefined}
          leftSection={<IconFileText size={18} />}
          active={isActive("/requests")}
          variant="light"
          color="dubaiBlue"
        />
      </ScrollArea>
    </AppShell.Navbar>
  );
};

export default Sidebar;
