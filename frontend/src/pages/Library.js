import React from 'react';
import {
    Container,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Box,
    useTheme,
    Chip,
} from '@mui/material';
import {
    Book as BookIcon,
    Computer as ComputerIcon,
    LibraryBooks as LibraryBooksIcon,
    Search as SearchIcon,
} from '@mui/icons-material';

const Library = () => {
    const theme = useTheme();

    const resources = [
        {
            title: 'E-Books Collection',
            description: 'Access thousands of academic e-books across all engineering disciplines.',
            image: '/images/ebooks.jpg',
            tags: ['24/7 Access', 'Multiple Formats', 'Downloadable'],
            link: '#',
        },
        {
            title: 'Research Journals',
            description: 'Latest research papers and journals from top publishers worldwide.',
            image: '/images/journals.jpg',
            tags: ['IEEE', 'Springer', 'Science Direct'],
            link: '#',
        },
        {
            title: 'Digital Library',
            description: 'Online repository of academic materials, thesis, and project reports.',
            image: '/images/digital-library.jpg',
            tags: ['Projects', 'Thesis', 'Publications'],
            link: '#',
        },
        {
            title: 'Learning Resources',
            description: 'Video lectures, tutorials, and interactive learning materials.',
            image: '/images/learning.jpg',
            tags: ['Video Lectures', 'Tutorials', 'Interactive'],
            link: '#',
        },
        {
            title: 'Reference Materials',
            description: 'Standard textbooks and reference materials for all courses.',
            image: '/images/reference.jpg',
            tags: ['Textbooks', 'References', 'Study Materials'],
            link: '#',
        },
        {
            title: 'Online Databases',
            description: 'Access to premium academic and research databases.',
            image: '/images/databases.jpg',
            tags: ['Research', 'Academic', 'Database'],
            link: '#',
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
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        fontSize: 180,
                        opacity: 0.1,
                        transform: 'rotate(-15deg)',
                    }}
                >
                    <LibraryBooksIcon sx={{ fontSize: 'inherit' }} />
                </Box>
                <Typography variant="h3" gutterBottom>
                    Library Resources
                </Typography>
                <Typography variant="h6">
                    Explore our comprehensive collection of academic resources
                </Typography>
            </Paper>

            {/* Search Bar (placeholder for future implementation) */}
            <Paper
                sx={{
                    p: 2,
                    mb: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <SearchIcon color="action" />
                <Typography variant="body1" color="text.secondary">
                    Search resources... (Coming Soon)
                </Typography>
            </Paper>

            {/* Resources Grid */}
            <Grid container spacing={4}>
                {resources.map((resource, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                },
                            }}
                        >
                            <CardMedia
                                component="div"
                                sx={{
                                    height: 200,
                                    bgcolor: 'primary.light',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <BookIcon sx={{ fontSize: 60, color: 'white' }} />
                            </CardMedia>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                    sx={{ color: 'primary.main' }}
                                >
                                    {resource.title}
                                </Typography>
                                <Typography sx={{ mb: 2 }}>
                                    {resource.description}
                                </Typography>
                                <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    {resource.tags.map((tag, tagIndex) => (
                                        <Chip
                                            key={tagIndex}
                                            label={tag}
                                            size="small"
                                            sx={{
                                                bgcolor: 'primary.light',
                                                color: 'primary.main',
                                            }}
                                        />
                                    ))}
                                </Box>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        mt: 'auto',
                                        textTransform: 'none',
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                        },
                                    }}
                                >
                                    Access Resource
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Library;
