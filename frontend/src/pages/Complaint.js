import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  Snackbar,
  Alert,
  Grid,
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  Send as SendIcon,
  AddCircle as AddCircleIcon,
  History as HistoryIcon,
  Create as CreateIcon,
  Edit as EditIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { submitComplaint, getComplaints } from "../services/api";

// Tab Panel Component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`complaint-tabpanel-${index}`}
      aria-labelledby={`complaint-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ComplaintForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    complaintType: "",
    roomNumber: "",
    fanNumber: "",
    problemDescription: "",
    suggestions: "",
  });

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Check authentication status and load user data
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch complaints when tab changes or after authentication is confirmed
  useEffect(() => {
    if (isAuthenticated && tabValue === 1) {
      fetchComplaints();
    }
  }, [tabValue, isAuthenticated]);

  const fetchComplaints = async () => {
    if (!isAuthenticated) {
      return;
    }

    setLoading(true);
    try {
      // Use the authenticated API endpoint that uses JWT token
      const response = await getComplaints();
      if (response.data.success) {
        setComplaints(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch complaints. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    if (newValue === 1 && isAuthenticated) {
      fetchComplaints();
    }
    setTabValue(newValue);
  };

  const complaintTypes = [
    "Fans",
    "Bathrooms",
    "Benches",
    "Lights",
    "Projectors",
    "Classroom Equipment",
  ];

  // Add room numbers array
  const roomNumbers = Array.from({ length: 20 }, (_, i) => (i + 101).toString());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: "Please login to submit a complaint",
        severity: "error",
      });
      navigate("/students");
      return;
    }

    // Basic validation
    if (!formData.complaintType || !formData.problemDescription) {
      setSnackbar({
        open: true,
        message: "Please fill all required fields",
        severity: "error",
      });
      return;
    }

    if (
      formData.complaintType === "Fans" &&
      (!formData.roomNumber || !formData.fanNumber)
    ) {
      setSnackbar({
        open: true,
        message: "Please provide room number and fan number for fan complaints",
        severity: "error",
      });
      return;
    }

    try {
      // Map form data to match API expected format - we only need to send complaint details
      const complaintData = {
        complaint_type: formData.complaintType,
        location: formData.roomNumber,
        specific_item: formData.fanNumber || null,
        problem_description: formData.problemDescription,
        suggestions: formData.suggestions || null,
      };

      // Call API to submit complaint
      const response = await submitComplaint(complaintData);

      // On successful submission
      if (response.data.success) {
        setSnackbar({
          open: true,
          message: "Complaint submitted successfully!",
          severity: "success",
        });

        // Reset form
        setFormData({
          complaintType: "",
          roomNumber: "",
          fanNumber: "",
          problemDescription: "",
          suggestions: "",
        });

        // Switch to the previous complaints tab
        setTabValue(1);
        // Fetch the updated complaints list
        fetchComplaints();
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setSnackbar({
        open: true,
        message:
          error.response?.data?.error ||
          "Failed to submit complaint. Please try again.",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const renderComplaintSpecificFields = () => {
    switch (formData.complaintType) {
      case "Fans":
        return (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Room Number</InputLabel>
                <Select
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  label="Room Number"
                  required
                >
                  {roomNumbers.map((room) => (
                    <MenuItem key={room} value={room}>
                      {room}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Fan Number"
                name="fanNumber"
                value={formData.fanNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Problem Description"
                name="problemDescription"
                value={formData.problemDescription}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="Describe the fan problem in detail..."
                required
              />
            </Grid>
          </Grid>
        );
      case "Bathrooms":
        return (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Problem Location"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="Which floor/building bathroom? (e.g., Ground Floor, Block A)"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Problem Description"
                name="problemDescription"
                value={formData.problemDescription}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="Describe the bathroom problem in detail (leakage, cleanliness, etc.)..."
                required
              />
            </Grid>
          </Grid>
        );
      case "Benches":
        return (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bench Location"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="Room number or location where bench is located"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Problem Description"
                name="problemDescription"
                value={formData.problemDescription}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="Describe the bench problem (broken, unstable, etc.)..."
                required
              />
            </Grid>
          </Grid>
        );
      default:
        return (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="Where is the problem located?"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Problem Description"
                name="problemDescription"
                value={formData.problemDescription}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="Describe the problem in detail..."
                required
              />
            </Grid>
          </Grid>
        );
    }
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "success";
      case "In Progress":
        return "warning";
      default:
        return "error";
    }
  };

  // Format date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // If not authenticated, show a prompt to login
  if (!isAuthenticated) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Complaint Portal
        </Typography>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Please login to access the complaint portal
          </Typography>
          <Button
            variant="contained"
            startIcon={<LoginIcon />}
            onClick={() => navigate("/students")}
            sx={{ mt: 2, borderRadius: "20px", px: 3 }}
          >
            Go to Login
          </Button>
        </Paper>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Complaint Portal
      </Typography>

      <Paper elevation={3} sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
        >
          <Tab
            icon={<CreateIcon />}
            label="Submit New Complaint"
            id="complaint-tab-0"
            aria-controls="complaint-tabpanel-0"
          />
          <Tab
            icon={<HistoryIcon />}
            label="Your Previous Complaints"
            id="complaint-tab-1"
            aria-controls="complaint-tabpanel-1"
          />
        </Tabs>

        {/* Submit New Complaint Tab */}
        <TabPanel value={tabValue} index={0}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={user?.name || ""}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Roll Number"
                  value={user?.roll_number || ""}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Branch"
                  value={user?.branch || ""}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Complaint Type *</InputLabel>
                  <Select
                    name="complaintType"
                    value={formData.complaintType}
                    onChange={handleChange}
                    label="Complaint Type *"
                    required
                  >
                    <MenuItem value="">
                      <em>Select a complaint type</em>
                    </MenuItem>
                    {complaintTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {formData.complaintType && renderComplaintSpecificFields()}

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Suggestions (Optional)"
                  name="suggestions"
                  value={formData.suggestions}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  placeholder="Any suggestions for improvement..."
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                type="submit"
                startIcon={<SendIcon />}
                size="large"
              >
                Submit Complaint
              </Button>
            </Box>
          </form>
        </TabPanel>

        {/* Previous Complaints Tab */}
        <TabPanel value={tabValue} index={1}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          ) : complaints.length > 0 ? (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="complaints table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Problem</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {complaints.map((complaint) => (
                    <TableRow
                      key={complaint.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {complaint.id}
                      </TableCell>
                      <TableCell>{complaint.complaint_type}</TableCell>
                      <TableCell>{complaint.location}</TableCell>
                      <TableCell>
                        {complaint.problem_description.length > 50
                          ? `${complaint.problem_description.substring(
                              0,
                              50
                            )}...`
                          : complaint.problem_description}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={complaint.status}
                          color={getStatusColor(complaint.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{formatDate(complaint.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "200px",
                p: 4,
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 2, textAlign: "center" }}
              >
                You haven't submitted any complaints yet.
              </Typography>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setTabValue(0)}
                sx={{ mt: 2, borderRadius: "20px", px: 3 }}
              >
                Submit Your First Complaint
              </Button>
            </Box>
          )}
        </TabPanel>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ComplaintForm;
