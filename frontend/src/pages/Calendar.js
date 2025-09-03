import React from 'react';
import {
    Container,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    Box,
    useTheme,
} from '@mui/material';
import { Event as EventIcon } from '@mui/icons-material';

const Calendar = () => {
    const theme = useTheme();
    
    const academicEvents = [
        {
            month: 'January 2025',
            events: [
                { date: '5', event: 'Spring Semester Registration Begins' },
                { date: '15', event: 'Technical Symposium' },
                { date: '20', event: 'Last Date for Registration' },
                { date: '25', event: 'Career Fair' },
            ]
        },
        {
            month: 'February 2025',
            events: [
                { date: '1', event: 'Spring Classes Begin' },
                { date: '10', event: 'Last Date for Add/Drop Courses' },
                { date: '15', event: 'Guest Lecture Series' },
                { date: '28', event: 'Mid-Semester Examinations' },
            ]
        },
        {
            month: 'March 2025',
            events: [
                { date: '5', event: 'Industry Visit Week' },
                { date: '15', event: 'Annual Sports Meet' },
                { date: '25', event: 'Project Presentations' },
            ]
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            {/* Header Section */}
            <Paper
                sx={{
                    p: 4,
                    mb: 4,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                    color: 'white',
                    borderRadius: 2,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h3" gutterBottom>
                    Academic Calendar
                </Typography>
                <Typography variant="h6">
                    Stay updated with important academic dates and events
                </Typography>
            </Paper>

            {/* Calendar Grid */}
            <Grid container spacing={4}>
                {academicEvents.map((monthData, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card
                            sx={{
                                height: '100%',
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                },
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{
                                        color: 'primary.main',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 3,
                                    }}
                                >
                                    <EventIcon />
                                    {monthData.month}
                                </Typography>
                                {monthData.events.map((event, eventIndex) => (
                                    <Box
                                        key={eventIndex}
                                        sx={{
                                            mb: 2,
                                            p: 2,
                                            borderRadius: 1,
                                            bgcolor: 'background.paper',
                                            boxShadow: 1,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                boxShadow: 3,
                                                bgcolor: 'primary.light',
                                                color: 'primary.contrastText',
                                            },
                                        }}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            {event.date}
                                        </Typography>
                                        <Typography variant="body1">
                                            {event.event}
                                        </Typography>
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Calendar;
