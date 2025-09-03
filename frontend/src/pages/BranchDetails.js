import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  styled,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import MemoryIcon from '@mui/icons-material/Memory';
import RouterIcon from '@mui/icons-material/Router';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import Loader from '../components/Loader/Loader';

const branchDetails = {
  cse: {
    title: "Computer Science and Engineering",
    description: "A comprehensive 4-year undergraduate program focusing on computer science fundamentals, software development, and cutting-edge technologies.",
    image: "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    labImages: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    highlights: [
      { title: "Duration", value: "4 Years", icon: <SchoolIcon color="primary" /> },
      { title: "Annual Fee", value: "₹1,20,000", icon: <WorkIcon color="primary" /> },
      { title: "Placement Rate", value: "95%", icon: <WorkIcon color="primary" /> }
    ],
    keyFeatures: [
      { title: "Programming Languages", content: ["Java", "Python", "C++", "JavaScript"], icon: <CodeIcon /> },
      { title: "Core Subjects", content: ["Data Structures", "Algorithms", "Database Systems", "Operating Systems"], icon: <MemoryIcon /> },
      { title: "Specializations", content: ["AI/ML", "Web Development", "Cloud Computing", "Cybersecurity"], icon: <RouterIcon /> }
    ],
    careerProspects: [
      "Software Developer - ₹6-12 LPA",
      "Data Scientist - ₹8-15 LPA",
      "Full Stack Developer - ₹7-14 LPA",
      "Cloud Architect - ₹12-25 LPA",
      "AI/ML Engineer - ₹10-20 LPA"
    ],
    facilities: [
      "Modern Computer Labs",
      "High-Speed Internet",
      "Research Centers",
      "Innovation Hub",
      "Software Development Center"
    ],
    companies: [
      "Google",
      "Microsoft",
      "Amazon",
      "IBM",
      "Oracle",
      "TCS",
      "Infosys"
    ]
  },
  ece: {
    title: "Electronics and Communication Engineering",
    description: "A cutting-edge program focusing on electronic systems, communication technologies, and signal processing.",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    labImages: [
      "https://images.unsplash.com/photo-1581092334247-ddef2a41a4f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    highlights: [
      { title: "Duration", value: "4 Years", icon: <SchoolIcon color="primary" /> },
      { title: "Annual Fee", value: "₹1,15,000", icon: <WorkIcon color="primary" /> },
      { title: "Placement Rate", value: "92%", icon: <WorkIcon color="primary" /> }
    ],
    keyFeatures: [
      { title: "Core Areas", content: ["Digital Electronics", "Communication Systems", "VLSI Design", "Signal Processing"], icon: <DeveloperBoardIcon /> },
      { title: "Technologies", content: ["5G", "IoT", "Embedded Systems", "Wireless Networks"], icon: <RouterIcon /> },
      { title: "Specializations", content: ["VLSI", "Communications", "Embedded Systems", "Signal Processing"], icon: <MemoryIcon /> }
    ],
    careerProspects: [
      "VLSI Design Engineer - ₹6-12 LPA",
      "Communication Engineer - ₹7-14 LPA",
      "Embedded Systems Engineer - ₹8-15 LPA",
      "RF Engineer - ₹9-16 LPA",
      "IoT Developer - ₹7-13 LPA"
    ],
    facilities: [
      "Electronics Labs",
      "Communication Labs",
      "VLSI Design Center",
      "IoT Lab",
      "Research Center"
    ],
    companies: [
      "Intel",
      "Qualcomm",
      "Samsung",
      "Texas Instruments",
      "Broadcom",
      "Nokia",
      "Cisco"
    ]
  },
  me: {
    title: "Mechanical Engineering",
    description: "A comprehensive program covering mechanical systems, thermodynamics, manufacturing processes, and industrial automation.",
    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    labImages: [
      "https://images.unsplash.com/photo-1581092160607-f6aa4887ab6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    highlights: [
      { title: "Duration", value: "4 Years", icon: <SchoolIcon color="primary" /> },
      { title: "Annual Fee", value: "₹1,10,000", icon: <WorkIcon color="primary" /> },
      { title: "Placement Rate", value: "90%", icon: <WorkIcon color="primary" /> }
    ],
    keyFeatures: [
      { title: "Core Areas", content: ["Thermodynamics", "Machine Design", "Manufacturing", "Robotics"], icon: <DeveloperBoardIcon /> },
      { title: "Technologies", content: ["CAD/CAM", "3D Printing", "Industrial Automation", "IoT"], icon: <RouterIcon /> },
      { title: "Specializations", content: ["Automotive", "Robotics", "Industrial Design", "Energy Systems"], icon: <MemoryIcon /> }
    ],
    careerProspects: [
      "Design Engineer - ₹5-10 LPA",
      "Manufacturing Engineer - ₹6-12 LPA",
      "Automation Engineer - ₹7-14 LPA",
      "Project Manager - ₹8-15 LPA",
      "R&D Engineer - ₹7-13 LPA"
    ],
    facilities: [
      "CAD/CAM Lab",
      "Manufacturing Workshop",
      "Thermal Lab",
      "Robotics Lab",
      "Material Testing Lab"
    ],
    companies: [
      "Tata Motors",
      "Mahindra",
      "Bosch",
      "Siemens",
      "L&T",
      "Honda",
      "Toyota"
    ]
  },
  civil: {
    title: "Civil Engineering",
    description: "A comprehensive program focusing on infrastructure development, structural engineering, and sustainable construction practices.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    labImages: [
      "https://images.unsplash.com/photo-1581092160607-f6aa4887ab6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    highlights: [
      { title: "Duration", value: "4 Years", icon: <SchoolIcon color="primary" /> },
      { title: "Annual Fee", value: "₹1,10,000", icon: <WorkIcon color="primary" /> },
      { title: "Placement Rate", value: "88%", icon: <WorkIcon color="primary" /> }
    ],
    keyFeatures: [
      { title: "Core Areas", content: ["Structural Engineering", "Geotechnical", "Transportation", "Environmental"], icon: <DeveloperBoardIcon /> },
      { title: "Technologies", content: ["AutoCAD", "GIS", "Project Management", "Green Building"], icon: <RouterIcon /> },
      { title: "Specializations", content: ["Construction Management", "Structural Design", "Environmental", "Transportation"], icon: <MemoryIcon /> }
    ],
    careerProspects: [
      "Structural Engineer - ₹5-10 LPA",
      "Construction Manager - ₹6-12 LPA",
      "Project Engineer - ₹7-13 LPA",
      "Environmental Engineer - ₹6-11 LPA",
      "Transportation Engineer - ₹6-12 LPA"
    ],
    facilities: [
      "Structural Lab",
      "Environmental Lab",
      "Surveying Lab",
      "Material Testing Lab",
      "CAD Center"
    ],
    companies: [
      "L&T",
      "DLF",
      "Shapoorji Pallonji",
      "NHAI",
      "Gammon India",
      "Tata Projects",
      "AECOM"
    ]
  }
};

// Styled components
const HeroSection = styled(Paper)(({ theme }) => ({
  position: 'relative',
  background: 'linear-gradient(45deg, #000000 30%, #333333 90%)',
  color: '#ffffff',
  padding: theme.spacing(12, 0),
  marginBottom: theme.spacing(6),
  borderRadius: '40px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,64,129,0.15), rgba(0,0,0,0))',
    zIndex: 1,
    borderRadius: 'inherit',
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  padding: theme.spacing(0, 4),
}));

const BranchImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '300px',
  objectFit: 'cover',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const HighlightCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255,255,255,0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  padding: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: '#ffffff',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  fontSize: '2.5rem',
  color: theme.palette.secondary.main,
  marginBottom: theme.spacing(2),
}));

const CompanyChip = styled(Box)(({ theme }) => ({
  margin: theme.spacing(0.5),
  padding: theme.spacing(1, 2),
  background: '#f8f9fa',
  border: '2px solid #000',
  color: '#000',
  fontWeight: 500,
  borderRadius: '8px',
  display: 'inline-block',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    background: '#000',
    color: '#fff',
    transform: 'translateY(-2px)',
  },
}));

const CareerList = styled(List)(({ theme }) => ({
  '& .MuiListItem-root': {
    padding: theme.spacing(1.5),
    borderRadius: '8px',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      background: '#f8f9fa',
      transform: 'translateX(8px)',
    },
  },
}));

const FacilityCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  background: '#ffffff',
  borderRadius: '16px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
    background: 'linear-gradient(45deg, #000000, #333333)',
    color: '#ffffff',
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  zIndex: 1000,
  background: '#000',
  color: '#fff',
  '&:hover': {
    background: '#333',
    transform: 'translateY(-4px) scale(1.05)',
  },
}));

const LabImage = styled(CardMedia)(({ theme }) => ({
  height: 200,
  borderRadius: '8px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const SectionCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  },
}));

const BranchDetails = () => {
  const navigate = useNavigate();
  const { branchId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Add a small delay for loading animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Get branch data based on branchId
  const branchData = branchDetails[branchId];

  if (loading) {
    return <Loader message="Loading Branch Details" subMessage="Please wait while we fetch the branch information..." />;
  }

  if (!branchData) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center">
          Branch not found
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/courses')}
          >
            Go Back
          </Button>
        </Box>
      </Container>
    );
  }

  const handleBack = () => {
    navigate('/courses');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <HeroSection elevation={0}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ position: 'absolute', top: 20, left: 20, color: 'white' }}
        >
          Back
        </Button>
        <HeroContent>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h3" gutterBottom>
                {branchData.title}
              </Typography>
              <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                {branchData.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {branchData.highlights.map((highlight, index) => (
                  <HighlightCard key={index}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        {highlight.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        {highlight.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {highlight.value}
                      </Typography>
                    </CardContent>
                  </HighlightCard>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <BranchImage src={branchData.image} alt={branchData.title} />
            </Grid>
          </Grid>
        </HeroContent>
      </HeroSection>

      {/* Key Features */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {branchData.keyFeatures.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <List>
                    {feature.content.map((item, idx) => (
                      <ListItem key={idx} sx={{ justifyContent: 'center' }}>
                        <Typography variant="body1">{item}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>

        {/* Career Prospects & Companies */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <SectionCard>
              <Typography variant="h5" gutterBottom color="primary">
                Career Prospects
              </Typography>
              <CareerList>
                {branchData.careerProspects.map((career, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <WorkIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary={career} />
                  </ListItem>
                ))}
              </CareerList>
            </SectionCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <SectionCard>
              <Typography variant="h5" gutterBottom color="primary">
                Top Recruiting Companies
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {branchData.companies.map((company, index) => (
                  <CompanyChip key={index}>
                    {company}
                  </CompanyChip>
                ))}
              </Box>
            </SectionCard>
          </Grid>
        </Grid>

        {/* Facilities */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom align="center">
            Facilities
          </Typography>
          <Grid container spacing={2}>
            {branchData.facilities.map((facility, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FacilityCard>
                  <Typography variant="body1">
                    {facility}
                  </Typography>
                </FacilityCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Lab Images */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom align="center">
            Our Labs & Facilities
          </Typography>
          <Grid container spacing={2}>
            {branchData.labImages.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="240"
                    image={image}
                    alt={`Lab ${index + 1}`}
                    sx={{ objectFit: 'cover' }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default BranchDetails;
