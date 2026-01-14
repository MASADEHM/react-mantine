import React from 'react';
import { Title, Text, Button, Box } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useNavigate } from 'react-router-dom';

const HeroSlider: React.FC = () => {
    const navigate = useNavigate();

    const slides = [
        {
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            title: 'Welcome to PCFC Company Setup',
            description: 'Your gateway to establishing a successful business in Dubai\'s thriving free zone',
            buttonText: 'Start Company Setup',
            buttonLink: '/company-setup'
        },
        {
            image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            title: 'Business Growth Opportunities',
            description: 'Access world-class facilities and a business-friendly environment',
            buttonText: 'Learn More',
            buttonLink: '/about'
        },
        {
            image: 'https://images.unsplash.com/photo-1581092160607-ee284c4d0384?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            title: 'Expert Support & Guidance',
            description: 'Get comprehensive assistance throughout your business setup journey',
            buttonText: 'Contact Us',
            buttonLink: '/contact'
        }
    ];

    return (
        <Box
            style={{
                width: '100vw',
                position: 'relative',
                left: '50%',
                right: '50%',
                marginLeft: '-50vw',
                marginRight: '-50vw',
                marginBottom: '2rem'
            }}
        >
            <Carousel
                withIndicators
                height={600}
                styles={{
                    indicator: {
                        width: 12,
                        height: 4,
                        transition: 'width 250ms ease',
                        '&[data-active]': {
                            width: 40,
                        },
                    },
                }}
            >
                {slides.map((slide, index) => (
                    <Carousel.Slide key={index}>
                        <Box
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '600px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                color: 'white'
                            }}
                        >
                            <Box>
                                <Title order={1} c="white" mb="md">
                                    {slide.title}
                                </Title>
                                <Text c="white" size="lg" mb="xl">
                                    {slide.description}
                                </Text>
                                <Button
                                    size="lg"
                                    color="dubaiBlue"
                                    onClick={() => navigate(slide.buttonLink)}
                                >
                                    {slide.buttonText}
                                </Button>
                            </Box>
                        </Box>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Box>
    );
};

export default HeroSlider;
