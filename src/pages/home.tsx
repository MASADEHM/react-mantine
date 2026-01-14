import React from 'react';
import { Title, Text, Button, Group, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Box
                style={{
                    width: '100vw',
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -10,
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />
            <Box
                style={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    color: 'white',
                    padding: '0 60px'
                }}
            >
                <Box style={{ maxWidth: '800px' }}>
                    <Title
                        order={1}
                        style={{
                            color: 'white',
                            fontSize: '3.5rem',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                        }}
                    >
                        Automate Your Business Setup
                    </Title>
                    <Text
                        style={{
                            color: 'white',
                            fontSize: '1.4rem',
                            marginBottom: '2.5rem',
                            lineHeight: '1.6',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                        }}
                    >
                        Streamline your company registration process with our intelligent automation platform.
                    </Text>
                    <Group gap="lg">
                        <Button
                            size="lg"
                            color="blue"
                            style={{
                                fontSize: '1.1rem',
                                height: '50px',
                                padding: '0 30px',
                                fontWeight: 600,
                            }}
                            onClick={() => navigate('/signup')}
                        >
                            Start Your Business
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            color="white"
                            style={{
                                fontSize: '1.1rem',
                                height: '50px',
                                padding: '0 30px',
                                fontWeight: 600,
                            }}
                            onClick={() => navigate('/about')}
                        >
                            Learn More
                        </Button>
                    </Group>
                </Box>
            </Box>
        </>
    );
};

export default Home;
