import React, { useState } from 'react';
import { AppShell, Box } from '@mantine/core';
import Sidebar from './Sidebar';

const ServiceLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AppShell
      navbar={{
        width: collapsed ? 80 : 240,
        breakpoint: 'md',
        collapsed: { mobile: true },
      }}
      padding="lg"
      styles={{
        main: {
          minHeight: '100vh',
        },
      }}
    >
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <AppShell.Main>
        <Box p="lg" w="100%">
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};

export default ServiceLayout;
