import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Divider,
  InputAdornment,
  useTheme,
  Snackbar,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  ThumbUp as ThumbUpIcon,
  Book as BookIcon,
} from "@mui/icons-material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  getAdminComplaints,
  updateComplaintStatus,
  getStatistics,
  getTeacherApprovedComplaints,
  getAdminTeacherComplaints,
  getResources,
  addResource,
} from "../services/api";

// TabPanel component for handling tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [approvedComplaints, setApprovedComplaints] = useState([]);
  const [teacherComplaints, setTeacherComplaints] = useState([]);
  const [loadingApproved, setLoadingApproved] = useState(false);
  const [loadingTeacherComplaints, setLoadingTeacherComplaints] =
    useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [statistics, setStatistics] = useState({
    total: 0,
    byStatus: [],
    byType: [],
    byBranch: [],
    recent: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    totalTeachers: 45,
    totalStudents: 1200,
    totalCourses: 28,
    totalComplaints: 0,
  });

  // Add new state for chart data
  const [chartData, setChartData] = useState({
    statusData: [],
    branchData: [],
  });

  // Filters
  const [filters, setFilters] = useState({
    branch: "",
    status: "",
    complaint_type: "",
    search: "",
    category: "",
  });

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [approvedPage, setApprovedPage] = useState(0);
  const [approvedRowsPerPage, setApprovedRowsPerPage] = useState(10);

  // Status update
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [statusDialog, setStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  // Alert
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Resource Management
  const [resources, setResources] = useState([]);
  const [resourceDialog, setResourceDialog] = useState(false);
  const [newResource, setNewResource] = useState({
    name: "",
    item_id: "",
    features: "",
  });
  const [viewResources, setViewResources] = useState(false);
  const [loadingResources, setLoadingResources] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Fetch complaints and statistics on mount
  useEffect(() => {
    fetchComplaints();
    fetchApprovedComplaints();
    fetchStatistics();
  }, []);

  // Update chart data when statistics change
  useEffect(() => {
    if (statistics.byStatus && statistics.byBranch) {
      // Update status counts
      const statusCounts = {
        pending: 0,
        inProgress: 0,
        resolved: 0,
      };

      statistics.byStatus.forEach((item) => {
        if (item.status === "Pending") statusCounts.pending = item.count;
        if (item.status === "In Progress") statusCounts.inProgress = item.count;
        if (item.status === "Resolved") statusCounts.resolved = item.count;
      });

      setStatistics((prev) => ({
        ...prev,
        ...statusCounts,
      }));

      // Update chart data
      setChartData({
        statusData: statistics.byStatus.map((item) => ({
          name: item.status,
          value: item.count,
        })),
        branchData: statistics.byBranch.map((item) => ({
          name: item.branch,
          value: item.count,
        })),
      });
    }
  }, [statistics.byStatus, statistics.byBranch]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

    // If switching to approved complaints tab and no data loaded yet
    if (newValue === 1 && approvedComplaints.length === 0) {
      fetchApprovedComplaints();
    }

    // If switching to teacher complaints tab and no data loaded yet
    if (newValue === 2 && teacherComplaints.length === 0) {
      fetchTeacherComplaints();
    }
  };

  // Fetch complaints based on filters
  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await getAdminComplaints(filters);
      if (response.data.success) {
        setComplaints(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setAlert({
        open: true,
        message: "Failed to fetch complaints",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch teacher-approved complaints
  const fetchApprovedComplaints = async () => {
    setLoadingApproved(true);
    try {
      const response = await getTeacherApprovedComplaints();
      if (response.data.success) {
        setApprovedComplaints(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching approved complaints:", error);
      setAlert({
        open: true,
        message: "Failed to fetch teacher-approved complaints",
        severity: "error",
      });
    } finally {
      setLoadingApproved(false);
    }
  };

  // Fetch teacher complaints
  const fetchTeacherComplaints = async () => {
    setLoadingTeacherComplaints(true);
    try {
      // Create a copy of filters and add category-specific filtering
      const filterParams = { ...filters };

      // If a category is selected, use it to filter complaints that start with that category
      if (filterParams.category) {
        // We need to set complaint_type for the API but we'll filter in the front-end
        // since the API doesn't support prefix matching on complaint_type
        delete filterParams.category;
      }

      const response = await getAdminTeacherComplaints(filterParams);
      if (response.data.success) {
        let filteredComplaints = response.data.data;

        // Apply category filter on the client side if needed
        if (filters.category) {
          if (filters.category === "Other") {
            // For "Other" category, find complaints that don't have a category prefix
            filteredComplaints = filteredComplaints.filter(
              (complaint) => !complaint.complaint_type.includes(" - ")
            );
          } else {
            // For named categories, filter by prefix
            filteredComplaints = filteredComplaints.filter((complaint) =>
              complaint.complaint_type.startsWith(filters.category)
            );
          }
        }

        setTeacherComplaints(filteredComplaints);
      }
    } catch (error) {
      console.error("Error fetching teacher complaints:", error);
      setAlert({
        open: true,
        message: "Failed to fetch teacher complaints",
        severity: "error",
      });
    } finally {
      setLoadingTeacherComplaints(false);
    }
  };

  // Fetch statistics
  const fetchStatistics = async () => {
    try {
      const response = await getStatistics();
      if (response.data.success) {
        setStatistics(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    fetchComplaints();
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      branch: "",
      status: "",
      complaint_type: "",
      search: "",
      category: "",
    });
    fetchComplaints();
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Pagination handlers for approved complaints
  const handleChangeApprovedPage = (event, newPage) => {
    setApprovedPage(newPage);
  };

  const handleChangeApprovedRowsPerPage = (event) => {
    setApprovedRowsPerPage(parseInt(event.target.value, 10));
    setApprovedPage(0);
  };

  // Open status dialog
  const openStatusDialog = (complaint) => {
    setSelectedComplaint(complaint);
    setNewStatus(complaint.status);
    setStatusDialog(true);
  };

  // Close status dialog
  const closeStatusDialog = () => {
    setStatusDialog(false);
    setSelectedComplaint(null);
    setNewStatus("");
  };

  // Update complaint status
  const handleStatusUpdate = async () => {
    if (!selectedComplaint || !newStatus) return;

    setStatusUpdateLoading(true);
    try {
      const response = await updateComplaintStatus(
        selectedComplaint.id,
        newStatus
      );
      if (response.data.success) {
        // Update the complaint in the list
        setComplaints(
          complaints.map((c) =>
            c.id === selectedComplaint.id ? { ...c, status: newStatus } : c
          )
        );
        setAlert({
          open: true,
          message: "Status updated successfully",
          severity: "success",
        });
        fetchStatistics(); // Refresh statistics
        closeStatusDialog();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setAlert({
        open: true,
        message: "Failed to update status",
        severity: "error",
      });
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  // Status color based on value
  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "success"; // Green
      case "In Progress":
        return "warning"; // Orange
      case "Pending":
        return "error"; // Red
      default:
        return "default";
    }
  };

  // Format date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Get the complaint types for filter dropdown
  const complaintTypes = Array.from(
    new Set(complaints.map((c) => c.complaint_type))
  ).filter(Boolean);

  // Get the branches for filter dropdown
  const branches = Array.from(new Set(complaints.map((c) => c.branch))).filter(
    Boolean
  );

  // Helper function to extract category from complaint type
  const getComplaintCategory = (complaintType) => {
    if (!complaintType || !complaintType.includes(" - ")) {
      return "Other";
    }
    return complaintType.split(" - ")[0];
  };

  // Helper function to extract specific type from complaint type
  const getComplaintSpecificType = (complaintType) => {
    if (!complaintType || !complaintType.includes(" - ")) {
      return complaintType;
    }
    return complaintType.split(" - ")[1];
  };

  // Resource Management Functions
  const handleResourceInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddResource = async () => {
    try {
      const response = await addResource(newResource);
      if (response.data.success) {
        setAlert({
          open: true,
          message: "Resource added successfully",
          severity: "success",
        });
        setResourceDialog(false);
        setNewResource({
          name: "",
          item_id: "",
          features: "",
        });
        if (viewResources) {
          fetchResources();
        }
      }
    } catch (error) {
      setAlert({
        open: true,
        message: "Failed to add resource",
        severity: "error",
      });
    }
  };

  const fetchResources = async () => {
    setLoadingResources(true);
    try {
      const response = await getResources();
      if (response.data.success) {
        setResources(response.data.data);
      }
    } catch (error) {
      setAlert({
        open: true,
        message: "Failed to fetch resources",
        severity: "error",
      });
    } finally {
      setLoadingResources(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Admin Dashboard
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            Manage complaints and view statistics
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              localStorage.removeItem("isAdmin");
              localStorage.removeItem("token");
              navigate("/admin/login");
            }}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "error.light",
                color: "white",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 4,
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PersonIcon
                  sx={{ fontSize: 40, color: "primary.main", mr: 2 }}
                />
                <Typography variant="h6" color="textSecondary">
                  Total Teachers
                </Typography>
              </Box>
              <Typography variant="h3">{statistics.totalTeachers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 4,
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <SchoolIcon
                  sx={{ fontSize: 40, color: "success.main", mr: 2 }}
                />
                <Typography variant="h6" color="textSecondary">
                  Total Students
                </Typography>
              </Box>
              <Typography variant="h3">{statistics.totalStudents}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 4,
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <BookIcon sx={{ fontSize: 40, color: "warning.main", mr: 2 }} />
                <Typography variant="h6" color="textSecondary">
                  Total Courses
                </Typography>
              </Box>
              <Typography variant="h3">{statistics.totalCourses}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 4,
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <NotificationsIcon
                  sx={{ fontSize: 40, color: "error.main", mr: 2 }}
                />
                <Typography variant="h6" color="textSecondary">
                  Total Complaints
                </Typography>
              </Box>
              <Typography variant="h3">{statistics.totalComplaints}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              height: 400,
              borderRadius: 2,
              boxShadow: 2,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 4,
              },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Complaints by Status
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={chartData.statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              height: 400,
              borderRadius: 2,
              boxShadow: 2,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 4,
              },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Complaints by Branch
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart
                data={chartData.branchData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fill: theme.palette.text.secondary }}
                />
                <YAxis tick={{ fill: theme.palette.text.secondary }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
                <Legend />
                <Bar
                  dataKey="value"
                  fill={theme.palette.primary.main}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Complaints Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="complaints tabs"
          sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}
        >
          <Tab
            label="All Complaints"
            icon={<NotificationsIcon />}
            iconPosition="start"
          />
          <Tab
            label="Teacher Approved"
            icon={<ThumbUpIcon />}
            iconPosition="start"
          />
          <Tab
            label="Teacher Complaints"
            icon={<SchoolIcon />}
            iconPosition="start"
          />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          {/* All Complaints Tab */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Complaint Management
            </Typography>

            {/* Filters */}
            <Paper elevation={0} variant="outlined" sx={{ p: 2, mb: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Branch</InputLabel>
                    <Select
                      name="branch"
                      value={filters.branch}
                      onChange={handleFilterChange}
                      label="Branch"
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="CSE">CSE</MenuItem>
                      <MenuItem value="ECE">ECE</MenuItem>
                      <MenuItem value="EEE">EEE</MenuItem>
                      <MenuItem value="MECH">MECH</MenuItem>
                      <MenuItem value="CIVIL">CIVIL</MenuItem>
                      <MenuItem value="IT">IT</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                      label="Status"
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Resolved">Resolved</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Type</InputLabel>
                    <Select
                      name="complaint_type"
                      value={filters.complaint_type}
                      onChange={handleFilterChange}
                      label="Type"
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="Fans">Fans</MenuItem>
                      <MenuItem value="Bathrooms">Bathrooms</MenuItem>
                      <MenuItem value="Benches">Benches</MenuItem>
                      <MenuItem value="Lights">Lights</MenuItem>
                      <MenuItem value="Projectors">Projectors</MenuItem>
                      <MenuItem value="Classroom Equipment">
                        Classroom Equipment
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Search"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<FilterListIcon />}
                      onClick={applyFilters}
                    >
                      Apply Filters
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<RefreshIcon />}
                      onClick={resetFilters}
                    >
                      Reset
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Complaints Table */}
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 3,
                }}
              >
                <CircularProgress />
              </Box>
            ) : complaints.length === 0 ? (
              <Paper
                elevation={0}
                variant="outlined"
                sx={{ p: 3, textAlign: "center" }}
              >
                <Typography variant="h6">No complaints found</Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your filters or check back later
                </Typography>
              </Paper>
            ) : (
              <>
                <TableContainer component={Paper} variant="outlined">
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableCell>Student</TableCell>
                        <TableCell>Branch</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Problem</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {complaints
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((complaint) => (
                          <TableRow
                            key={complaint.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                              "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                              },
                            }}
                          >
                            <TableCell>
                              {complaint.name}
                              <Typography
                                variant="caption"
                                display="block"
                                color="text.secondary"
                              >
                                {complaint.roll_number}
                              </Typography>
                            </TableCell>
                            <TableCell>{complaint.branch}</TableCell>
                            <TableCell>{complaint.complaint_type}</TableCell>
                            <TableCell>
                              {complaint.location}
                              {complaint.specific_item && (
                                <Typography
                                  variant="caption"
                                  display="block"
                                  color="text.secondary"
                                >
                                  {complaint.specific_item}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell
                              sx={{
                                maxWidth: "250px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {complaint.problem_description}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={complaint.status}
                                color={getStatusColor(complaint.status)}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              {formatDate(complaint.created_at)}
                            </TableCell>
                            <TableCell>
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => openStatusDialog(complaint)}
                              >
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={complaints.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {/* Teacher Approved Complaints Tab */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Teacher Approved Complaints
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              These complaints have been verified and endorsed by teachers as
              important issues to address.
            </Typography>

            {/* Approved Complaints Table */}
            {loadingApproved ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 3,
                }}
              >
                <CircularProgress />
              </Box>
            ) : approvedComplaints.length === 0 ? (
              <Paper
                elevation={0}
                variant="outlined"
                sx={{ p: 3, textAlign: "center" }}
              >
                <Typography variant="h6">
                  No approved complaints found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Complaints will appear here when teachers approve them
                </Typography>
              </Paper>
            ) : (
              <>
                <TableContainer component={Paper} variant="outlined">
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableCell>Student</TableCell>
                        <TableCell>Branch</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Teacher Approval</TableCell>
                        <TableCell>Problem</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {approvedComplaints
                        .slice(
                          approvedPage * approvedRowsPerPage,
                          approvedPage * approvedRowsPerPage +
                            approvedRowsPerPage
                        )
                        .map((complaint) => (
                          <TableRow
                            key={complaint.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                              "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                              },
                              backgroundColor: "rgba(76, 175, 80, 0.08)",
                            }}
                          >
                            <TableCell>
                              {complaint.name}
                              <Typography
                                variant="caption"
                                display="block"
                                color="text.secondary"
                              >
                                {complaint.roll_number}
                              </Typography>
                            </TableCell>
                            <TableCell>{complaint.branch}</TableCell>
                            <TableCell>{complaint.complaint_type}</TableCell>
                            <TableCell>
                              <Typography variant="body2" fontWeight="medium">
                                By: {complaint.teacher_name}
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                color="text.secondary"
                              >
                                Dept: {complaint.teacher_department}
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                color="text.secondary"
                                sx={{
                                  fontStyle: "italic",
                                  mt: 0.5,
                                  maxWidth: "200px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                "{complaint.approval_note}"
                              </Typography>
                            </TableCell>
                            <TableCell
                              sx={{
                                maxWidth: "200px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {complaint.problem_description}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={complaint.status}
                                color={getStatusColor(complaint.status)}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              {formatDate(complaint.created_at)}
                            </TableCell>
                            <TableCell>
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => openStatusDialog(complaint)}
                              >
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={approvedComplaints.length}
                  rowsPerPage={approvedRowsPerPage}
                  page={approvedPage}
                  onPageChange={handleChangeApprovedPage}
                  onRowsPerPageChange={handleChangeApprovedRowsPerPage}
                />
              </>
            )}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          {/* Teacher Complaints Tab */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Teacher Complaints
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              These complaints have been reported by teachers as important
              issues to address.
            </Typography>

            {/* Teacher Complaints Filters */}
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Filter Teacher Complaints
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Complaint Category</InputLabel>
                    <Select
                      name="category"
                      value={filters.category || ""}
                      onChange={handleFilterChange}
                      label="Complaint Category"
                    >
                      <MenuItem value="">All Categories</MenuItem>
                      <MenuItem value="Library">Library</MenuItem>
                      <MenuItem value="Classroom">
                        Classroom & Infrastructure
                      </MenuItem>
                      <MenuItem value="Students">Student Related</MenuItem>
                      <MenuItem value="Administrative">
                        Administrative & Academic
                      </MenuItem>
                      <MenuItem value="Faculty">Staff & Faculty</MenuItem>
                      <MenuItem value="General">General</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={filters.status || ""}
                      onChange={handleFilterChange}
                      label="Status"
                    >
                      <MenuItem value="">All Statuses</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Resolved">Resolved</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Search"
                    name="search"
                    value={filters.search || ""}
                    onChange={handleFilterChange}
                    placeholder="Search by name, description..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={applyFilters}
                    sx={{ mr: 2 }}
                  >
                    Apply Filters
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {/* Teacher Complaints Table */}
            {loadingTeacherComplaints ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 3,
                }}
              >
                <CircularProgress />
              </Box>
            ) : teacherComplaints.length === 0 ? (
              <Paper
                elevation={0}
                variant="outlined"
                sx={{ p: 3, textAlign: "center" }}
              >
                <Typography variant="h6">
                  No teacher complaints found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Complaints will appear here when teachers report them
                </Typography>
              </Paper>
            ) : (
              <>
                <TableContainer component={Paper} variant="outlined">
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableCell>Teacher</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Problem</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teacherComplaints.map((complaint) => (
                        <TableRow
                          key={complaint.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.04)",
                            },
                          }}
                        >
                          <TableCell>
                            {complaint.teacher_name}
                            <Typography
                              variant="caption"
                              display="block"
                              color="text.secondary"
                            >
                              {complaint.teacher_department} -{" "}
                              {complaint.teacher_designation}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {getComplaintCategory(complaint.complaint_type)}
                          </TableCell>
                          <TableCell>
                            {getComplaintSpecificType(complaint.complaint_type)}
                          </TableCell>
                          <TableCell
                            sx={{
                              maxWidth: "250px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {complaint.problem_description}
                          </TableCell>
                          <TableCell>{complaint.location}</TableCell>
                          <TableCell>
                            <Chip
                              label={complaint.status}
                              color={getStatusColor(complaint.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            {formatDate(complaint.created_at)}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => openStatusDialog(complaint)}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>
        </TabPanel>
      </Paper>

      {/* Status Update Dialog */}
      <Dialog open={statusDialog} onClose={closeStatusDialog}>
        <DialogTitle>Update Complaint Status</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Update the status for complaint #{selectedComplaint?.id} from{" "}
            {selectedComplaint?.name}.
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeStatusDialog}>Cancel</Button>
          <Button
            onClick={handleStatusUpdate}
            variant="contained"
            disabled={statusUpdateLoading}
            startIcon={
              statusUpdateLoading ? <CircularProgress size={20} /> : null
            }
          >
            {statusUpdateLoading ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminDashboard;
