import React from 'react';
import { Card, Button, TextInput, Stack, Text, Box } from '@mantine/core';

const ExampleComponent: React.FC = () => {
  return (
    <Box p="lg">
      {/* Using Mantine components */}
      <Card shadow="sm" radius="md" withBorder>
        <Text size="xl" fw={700} mb="md">
          Mantine Example
        </Text>
        
        <Stack gap="md">
          {/* Mantine TextInput */}
          <TextInput 
            placeholder="Enter your text"
          />
          
          {/* Mantine Button */}
          <Button color="dubaiBlue" fullWidth>
            Submit
          </Button>
          
          {/* Custom styled div */}
          <Box mt="md" p="md" bg="gray.0" style={{ borderRadius: 6 }}>
            <Text c="dimmed">
              This is a custom styled container using Mantine
            </Text>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default ExampleComponent;
