import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    useTheme,
    Container,
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Button,
    styled,
    Alert
} from '@mui/material';
import {
    School as SchoolIcon,
    Person as PersonIcon,
    Book as BookIcon,
    Assessment as AssessmentIcon,
    LinkedIn as LinkedInIcon,
    GitHub as GitHubIcon,
    Email as EmailIcon,
    Announcement as AnnouncementIcon,
    Event as EventIcon,
    Link as LinkIcon,
    ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { getTeachers, getStudents, getCourses } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
    position: 'relative',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(6),
    marginBottom: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)',
        borderRadius: 'inherit',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)',
        transform: 'rotate(30deg)',
    }
}));

const StyledStatCard = styled(Card)(({ theme, color }) => ({
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: `linear-gradient(135deg, ${color}15, ${color}05)`,
    border: `1px solid ${color}20`,
    '&:hover': {
        transform: 'translateY(-8px) scale(1.02)',
        boxShadow: `0 12px 20px -10px ${color}30`,
        background: `linear-gradient(135deg, ${color}25, ${color}15)`,
    },
}));

const AnnouncementCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    marginBottom: theme.spacing(2),
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid rgba(0,0,0,0.08)',
    '&:hover': {
        transform: 'translateY(-4px) scale(1.01)',
        boxShadow: '0 8px 16px -8px rgba(0,0,0,0.2)',
        '& .MuiCardContent-root': {
            background: 'linear-gradient(135deg, #f8f9fa, #ffffff)',
        }
    }
}));

const QuickLinkItem = styled(ListItem)(({ theme }) => ({
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: theme.shape.borderRadius,
    margin: '4px 0',
    '&:hover': {
        backgroundColor: theme.palette.primary.main + '10',
        transform: 'translateX(4px)',
        '& .MuiListItemIcon-root': {
            color: theme.palette.primary.main,
        },
        '& .MuiListItemText-primary': {
            color: theme.palette.primary.main,
        }
    }
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main + '10',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.primary.main + '20',
        transform: 'translateY(-2px)',
    }
}));

const StyledTeamCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
    border: '1px solid rgba(0,0,0,0.08)',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 20px -10px rgba(0,0,0,0.2)',
        '& .MuiCardContent-root': {
            background: 'linear-gradient(135deg, #f8f9fa, #ffffff)',
        },
        '& .social-icons': {
            transform: 'translateY(0)',
            opacity: 1,
        }
    },
    '& .social-icons': {
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: 'translateY(10px)',
        opacity: 0,
    }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 70,
    height: 70,
    border: `3px solid ${theme.palette.primary.main}20`,
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
    }
}));

const Dashboard = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        teachers: 0,
        students: 0,
        courses: 0,
        departments: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teachersData, studentsData, coursesData] = await Promise.all([
                    getTeachers(),
                    getStudents(),
                    getCourses()
                ]);

                const departments = new Set();
                coursesData.data.forEach(course => departments.add(course.department));

                setStats({
                    teachers: teachersData.data.length,
                    students: studentsData.data.length,
                    courses: coursesData.data.length,
                    departments: departments.size,
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                // Add a minimum delay for loading effect
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loader message="Loading Dashboard" subMessage="Please wait while we fetch your personalized dashboard..." />;
    }

    const getBranchName = (code) => {
        const branchNames = {
            'CSE': 'Computer Science Engineering',
            'ECE': 'Electronics & Communication Engineering',
            'MECH': 'Mechanical Engineering',
            'CIVIL': 'Civil Engineering',
            'EEE': 'Electrical & Electronics Engineering'
        };
        return branchNames[code] || code;
    };

    const StatCard = ({ title, value, icon: Icon, color, link }) => {
        const navigate = useNavigate();
        
        return (
            <StyledStatCard onClick={() => navigate(link)} color={color}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
                            <Icon />
                        </Avatar>
                        <Typography variant="h4" component="div" sx={{ ml: 2, fontWeight: 'bold' }}>
                            {value}
                        </Typography>
                    </Box>
                    <Typography variant="h6" color="text.secondary">
                        {title}
                    </Typography>
                </CardContent>
            </StyledStatCard>
        );
    };

    const announcements = [
        {
            title: "New Semester Registration Open",
            date: "January 5, 2025",
            description: "Registration for the Spring 2025 semester is now open. Please complete your registration before January 20th.",
            branch: 'CSE'
        },
        {
            title: "Campus Technology Upgrade",
            date: "January 3, 2025",
            description: "We're upgrading our campus-wide Wi-Fi infrastructure to provide better connectivity.",
            branch: 'ECE'
        },
        {
            title: "Guest Lecture Series",
            date: "January 2, 2025",
            description: "Join us for an exciting series of guest lectures from industry experts starting next week.",
            branch: 'MECH'
        }
    ];

    const quickLinks = [
        { title: "Academic Calendar", link: "/calendar" },
        { title: "Course Catalog", link: "/courses" },
        { title: "Library Resources", link: "/library" },
    ];

    const members = [
        {
            name: 'H.L.S.Manikanta',
            role: 'Frontend Developer',
            department: 'Computer Science',
            avatar: 'https://res.cloudinary.com/dhdcwvoop/image/upload/v1736099165/ioag25seeznc2i5vbyxr.jpg',
            linkedin: 'https://www.linkedin.com/in/manihari7/',
            github: 'https://github.com/Manihari7',
            email: 'mani.77.manikanta@gmail.com'
        },
        {
            name: 'Akhil Duddi',
            role: 'Fullstack Developer',
            department: 'Computer Science',
            avatar: 'https://res.cloudinary.com/dm94ctges/image/upload/v1747334323/1682186789297-02.jpeg_uxemzu.jpg',
            linkedin: 'https://www.linkedin.com/in/akhilduddi/',
            github: 'https://github.com/akhilduddi',
            email: 'akhilduddi95@gmail.com'
        }
    ];

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <HeroSection>
                <Box sx={{ position: 'relative', zIndex: 2, p: 4 }}>
                    <Typography 
                        variant="h3" 
                        gutterBottom 
                        align="center"
                        sx={{
                            fontWeight: 700,
                            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            mb: 3
                        }}
                    >
                        Welcome to Your Dashboard
                    </Typography>
                    <Typography 
                        variant="h6" 
                        align="center" 
                        sx={{ 
                            mb: 4, 
                            opacity: 0.9,
                            maxWidth: '800px',
                            mx: 'auto',
                            lineHeight: 1.6
                        }}
                    >
                        Track your progress and manage your academic journey
                    </Typography>
                </Box>
            </HeroSection>
            <Grid container spacing={3}>
                {/* Stats Section */}
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title="Teachers"
                                value={stats.teachers}
                                icon={PersonIcon}
                                color="#1976d2"
                                link="/teachers"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title="Students"
                                value={stats.students}
                                icon={SchoolIcon}
                                color="#2e7d32"
                                link="/students"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title="Courses"
                                value={stats.courses}
                                icon={BookIcon}
                                color="#ed6c02"
                                link="/courses"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title="Departments"
                                value={stats.departments}
                                icon={AssessmentIcon}
                                color="#9c27b0"
                                link="/departments"
                            />
                        </Grid>
                    </Grid>
                </Grid>

                {/* Announcements Section */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Announcements
                    </Typography>
                    {announcements.map((announcement, index) => (
                        <AnnouncementCard key={index}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <AnnouncementIcon sx={{ mr: 1 }} />
                                    <Typography variant="h6">{announcement.title}</Typography>
                                </Box>
                                <Typography color="text.secondary" sx={{ mb: 1 }}>
                                    {announcement.date}
                                </Typography>
                                <Typography>{announcement.description}</Typography>
                            </CardContent>
                        </AnnouncementCard>
                    ))}
                </Grid>

                {/* Quick Links Section */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Quick Links
                    </Typography>
                    <Card>
                        <List>
                            {quickLinks.map((link, index) => (
                                <React.Fragment key={index}>
                                    <QuickLinkItem button onClick={() => navigate(link.link)}>
                                        <ListItemIcon>
                                            <LinkIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={link.title} />
                                        <ArrowForwardIcon />
                                    </QuickLinkItem>
                                    {index < quickLinks.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Card>
                </Grid>

                {/* Team Members Section - Updated with centered layout */}
                <Grid item xs={12} sx={{ mt: 6 }}>
                    <Typography 
                        variant="h4" 
                        gutterBottom 
                        sx={{ 
                            textAlign: 'center',
                            fontWeight: 600,
                            mb: 4,
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: '-8px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '60px',
                                height: '4px',
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: '2px'
                            }
                        }}
                    >
                        Our Team Members
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {members.map((member, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <StyledTeamCard sx={{ width: '100%', maxWidth: 345 }}>
                                    <CardContent>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            mb: 2,
                                            flexDirection: 'column',
                                            textAlign: 'center'
                                        }}>
                                            <StyledAvatar
                                                src={member.avatar}
                                                sx={{ mb: 2 }}
                                            >
                                                {member.name.charAt(0)}
                                            </StyledAvatar>
                                            <Box>
                                                <Typography 
                                                    variant="h6"
                                                    sx={{ 
                                                        fontWeight: 600,
                                                        mb: 0.5
                                                    }}
                                                >
                                                    {member.name}
                                                </Typography>
                                                <Typography 
                                                    color="primary"
                                                    variant="subtitle1"
                                                    sx={{ mb: 0.5 }}
                                                >
                                                    {member.role}
                                                </Typography>
                                                <Typography 
                                                    variant="body2" 
                                                    color="text.secondary"
                                                    sx={{ mb: 2 }}
                                                >
                                                    {member.department}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box 
                                            className="social-icons"
                                            sx={{ 
                                                display: 'flex', 
                                                gap: 1, 
                                                justifyContent: 'center',
                                                mt: 2
                                            }}
                                        >
                                            <SocialButton
                                                size="small"
                                                href={`mailto:${member.email}`}
                                                target="_blank"
                                            >
                                                <EmailIcon />
                                            </SocialButton>
                                            <SocialButton
                                                size="small"
                                                href={member.linkedin}
                                                target="_blank"
                                            >
                                                <LinkedInIcon />
                                            </SocialButton>
                                            <SocialButton
                                                size="small"
                                                href={member.github}
                                                target="_blank"
                                            >
                                                <GitHubIcon />
                                            </SocialButton>
                                        </Box>
                                    </CardContent>
                                </StyledTeamCard>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;