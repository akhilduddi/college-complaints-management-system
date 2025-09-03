import React from 'react';
import {
    Container,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    Box,
    Button,
    useTheme,
    Avatar,
} from '@mui/material';
import {
    Person as PersonIcon,
    School as SchoolIcon,
    Assignment as AssignmentIcon,
    Grade as GradeIcon,
    Event as EventIcon,
    Notifications as NotificationsIcon,
} from '@mui/icons-material';

const StudentPortal = () => {
    const theme = useTheme();

    const studentInfo = {
        name: 'John Doe',
        id: 'STU2025001',
        department: 'Computer Science Engineering',
        year: '3rd Year',
        semester: '6th Semester',
        cgpa: '8.75',
    };

    const quickActions = [
        {
            title: 'Assignments',
            icon: AssignmentIcon,
            count: '5 Pending',
            color: theme.palette.primary.main,
        },
        {
            title: 'Attendance',
            icon: SchoolIcon,
            count: '85%',
            color: theme.palette.success.main,
        },
        {
            title: 'Upcoming Tests',
            icon: GradeIcon,
            count: '2 Tests',
            color: theme.palette.warning.main,
        },
        {
            title: 'Events',
            icon: EventIcon,
            count: '3 New',
            color: theme.palette.info.main,
        },
    ];

    const notifications = [
        {
            title: 'Assignment Deadline',
            message: 'Database Management System assignment due tomorrow',
            time: '2 hours ago',
        },
        {
            title: 'Test Announcement',
            message: 'Mid-semester examination schedule released',
            time: '1 day ago',
        },
        {
            title: 'Event Registration',
            message: 'Register for the upcoming technical symposium',
            time: '2 days ago',
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            {/* Student Profile Section */}
            <Paper
                sx={{
                    p: 4,
                    mb: 4,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                    color: 'white',
                    borderRadius: 2,
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    <Grid item>
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                bgcolor: 'white',
                                color: 'primary.main',
                            }}
                        >
                            <PersonIcon sx={{ fontSize: 60 }} />
                        </Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h4" gutterBottom>
                            {studentInfo.name}
                        </Typography>
                        <Typography variant="subtitle1">
                            ID: {studentInfo.id} | {studentInfo.department}
                        </Typography>
                        <Typography variant="subtitle1">
                            {studentInfo.year} | {studentInfo.semester} | CGPA: {studentInfo.cgpa}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Quick Actions */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
                {quickActions.map((action, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card
                            sx={{
                                height: '100%',
                                transition: 'transform 0.3s ease-in-out',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                },
                            }}
                        >
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 2,
                                    }}
                                >
                                    <Avatar sx={{ bgcolor: action.color }}>
                                        <action.icon />
                                    </Avatar>
                                </Box>
                                <Typography variant="h6" gutterBottom>
                                    {action.title}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                >
                                    {action.count}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Notifications */}
            <Paper sx={{ p: 3 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'primary.main',
                    }}
                >
                    <NotificationsIcon />
                    Recent Notifications
                </Typography>
                <Grid container spacing={3}>
                    {notifications.map((notification, index) => (
                        <Grid item xs={12} key={index}>
                            <Card
                                sx={{
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateX(8px)',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {notification.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {notification.message}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {notification.time}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
};

export default StudentPortal;
