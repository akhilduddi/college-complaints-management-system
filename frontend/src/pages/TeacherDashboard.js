import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Divider,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextareaAutosize,
  ListSubheader,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  getTeacherComplaints,
  approveComplaint,
  submitTeacherComplaint,
  getTeacherOwnComplaints,
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
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [teacherComplaints, setTeacherComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teacherComplaintsLoading, setTeacherComplaintsLoading] =
    useState(false);
  const [filters, setFilters] = useState({
    branch: "",
    status: "",
    complaint_type: "",
    search: "",
  });
  const [teacherFilters, setTeacherFilters] = useState({
    status: "",
    complaint_type: "",
    search: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [tabValue, setTabValue] = useState(0);
  const [approvalDialog, setApprovalDialog] = useState({
    open: false,
    complaintId: null,
    note: "",
  });
  const [newComplaintDialog, setNewComplaintDialog] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    complaint_type: "",
    location: "",
    specific_item: "",
    problem_description: "",
    suggestions: "",
  });

  const complaintTypes = [
    "Fans",
    "Bathrooms",
    "Benches",
    "Lights",
    "Projectors",
    "Classroom Equipment",
  ];

  const teacherComplaintTypes = [
    // Library Related Complaints
    "Library - Inadequate Resources",
    "Library - Limited Working Hours",
    "Library - Poor Maintenance",
    "Library - Lack of Digital Resources",
    "Library - Discipline Issues",
    "Library - Space Constraints",

    // Classroom & Infrastructure Issues
    "Classroom - Faulty Equipment",
    "Classroom - Poor Maintenance",
    "Classroom - Overcrowding",

    // Student Related Complaints
    "Students - Low Attendance",
    "Students - Lack of Discipline",
    "Students - Plagiarism & Malpractice",

    // Administrative & Academic Issues
    "Administrative - Excessive Workload",
    "Administrative - Examination Delays",
    "Administrative - Curriculum Issues",

    // Staff & Faculty Concerns
    "Faculty - Shortage of Teachers",
    "Faculty - Lack of Training",
    "Faculty - Uneven Work Distribution",

    // General Complaints
    "General - Poor Wi-Fi/Network",
    "General - Canteen/Hygiene Issues",
    "General - Security Concerns",

    // Original categories for backward compatibility
    "Parking",
    "Security",
    "Watchmen",
    "Facilities",
    "Cafeteria",
    "Administrative",
    "Technical",
    "Other",
  ];

  const statusTypes = ["Pending", "In Progress", "Resolved", "Rejected"];

  const branches = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"];

  // Check authentication status and verify user type is teacher
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const userType = localStorage.getItem("userType");

    if (token && userData && userType === "teacher") {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsAuthenticated(true);
      fetchComplaints();
      fetchTeacherComplaints();
    } else {
      // Redirect to teacher login if not authenticated as teacher
      navigate("/teachers");
    }
  }, [navigate]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      // Use the teacher complaints API which gives access to all complaints for teachers
      const response = await getTeacherComplaints(filters);
      console.log("API Response:", response);
      if (response.data.success) {
        console.log("Complaints data:", response.data.data);
        // Check if any complaints have teacher_approved property
        if (response.data.data.length > 0) {
          const firstComplaint = response.data.data[0];
          console.log("First complaint:", {
            id: firstComplaint.id,
            has_teacher_approved: "teacher_approved" in firstComplaint,
            teacher_approved_value: firstComplaint.teacher_approved,
          });
        }
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

  const fetchTeacherComplaints = async () => {
    setTeacherComplaintsLoading(true);
    try {
      const response = await getTeacherOwnComplaints(teacherFilters);
      if (response.data.success) {
        setTeacherComplaints(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching teacher complaints:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch your complaints. Please try again.",
        severity: "error",
      });
    } finally {
      setTeacherComplaintsLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTeacherFilterChange = (e) => {
    const { name, value } = e.target;
    setTeacherFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    if (tabValue === 0) {
      fetchComplaints();
    } else {
      fetchTeacherComplaints();
    }
  };

  const resetFilters = () => {
    if (tabValue === 0) {
      setFilters({
        branch: "",
        status: "",
        complaint_type: "",
        search: "",
      });
      // Fetch all complaints without filters
      getTeacherComplaints().then((response) => {
        if (response.data.success) {
          setComplaints(response.data.data);
        }
      });
    } else {
      setTeacherFilters({
        status: "",
        complaint_type: "",
        search: "",
      });
      // Fetch all teacher complaints without filters
      getTeacherOwnComplaints().then((response) => {
        if (response.data.success) {
          setTeacherComplaints(response.data.data);
        }
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "success";
      case "In Progress":
        return "warning";
      case "Rejected":
        return "error";
      case "Pending":
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    navigate("/teachers");
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleApproveClick = (complaintId) => {
    setApprovalDialog({
      open: true,
      complaintId,
      note: "",
    });
  };

  const handleApprovalNoteChange = (e) => {
    setApprovalDialog((prev) => ({
      ...prev,
      note: e.target.value,
    }));
  };

  const handleApprovalSubmit = async () => {
    try {
      console.log(
        "Approving complaint ID:",
        approvalDialog.complaintId,
        "with note:",
        approvalDialog.note
      );

      const response = await approveComplaint(
        approvalDialog.complaintId,
        approvalDialog.note
      );

      console.log("Approval response:", response);

      if (response.data.success) {
        setSnackbar({
          open: true,
          message: "Complaint approved successfully!",
          severity: "success",
        });

        // Refresh complaints
        fetchComplaints();

        // Close dialog
        setApprovalDialog({
          open: false,
          complaintId: null,
          note: "",
        });
      } else {
        // Handle API error response
        setSnackbar({
          open: true,
          message:
            response.data.error ||
            "Failed to approve complaint. Please try again.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error approving complaint:", error);

      // Get detailed error message if available
      let errorMessage = "Failed to approve complaint. Please try again.";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  const handleNewComplaintOpen = () => {
    setNewComplaintDialog(true);
  };

  const handleNewComplaintClose = () => {
    setNewComplaintDialog(false);
    setNewComplaint({
      complaint_type: "",
      location: "",
      specific_item: "",
      problem_description: "",
      suggestions: "",
    });
  };

  const handleNewComplaintChange = (e) => {
    const { name, value } = e.target;
    setNewComplaint((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewComplaintSubmit = async () => {
    try {
      const response = await submitTeacherComplaint(newComplaint);

      if (response.data.success) {
        setSnackbar({
          open: true,
          message: "Complaint submitted successfully!",
          severity: "success",
        });

        // Refresh teacher complaints
        fetchTeacherComplaints();

        // Close dialog
        handleNewComplaintClose();
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setSnackbar({
        open: true,
        message: "Failed to submit complaint. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4">Teacher Dashboard</Typography>
          <Box>
            {user && (
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Welcome, {user.name} | Department: {user.department}
              </Typography>
            )}
            <Button
              variant="outlined"
              color="primary"
              onClick={handleLogout}
              sx={{ ml: 2 }}
            >
              Logout
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="dashboard tabs"
          sx={{ mb: 2 }}
        >
          <Tab label="Student Complaints" />
          <Tab label="Teacher Complaints" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h5" gutterBottom>
            Student Complaints
          </Typography>

          {/* Filters */}
          <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Filter Complaints
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Branch</InputLabel>
                  <Select
                    name="branch"
                    value={filters.branch}
                    onChange={handleFilterChange}
                    label="Branch"
                  >
                    <MenuItem value="">All Branches</MenuItem>
                    {branches.map((branch) => (
                      <MenuItem key={branch} value={branch}>
                        {branch}
                      </MenuItem>
                    ))}
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
                    <MenuItem value="">All Statuses</MenuItem>
                    {statusTypes.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Complaint Type</InputLabel>
                  <Select
                    name="complaint_type"
                    value={filters.complaint_type}
                    onChange={handleFilterChange}
                    label="Complaint Type"
                  >
                    <MenuItem value="">All Types</MenuItem>
                    {complaintTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
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
                  placeholder="Search by roll number, name, etc."
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

          {/* Complaints Table */}
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : complaints.length > 0 ? (
            <TableContainer component={Paper} elevation={2}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ backgroundColor: "primary.main" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>Student</TableCell>
                    <TableCell sx={{ color: "white" }}>Branch</TableCell>
                    <TableCell sx={{ color: "white" }}>Type</TableCell>
                    <TableCell sx={{ color: "white" }}>Location</TableCell>
                    <TableCell sx={{ color: "white" }}>Description</TableCell>
                    <TableCell sx={{ color: "white" }}>Status</TableCell>
                    <TableCell sx={{ color: "white" }}>Date</TableCell>
                    <TableCell sx={{ color: "white" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {complaints.map((complaint) => (
                    <TableRow
                      key={complaint.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": { backgroundColor: "action.hover" },
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {complaint.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {complaint.roll_number}
                        </Typography>
                      </TableCell>
                      <TableCell>{complaint.branch}</TableCell>
                      <TableCell>{complaint.complaint_type}</TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {complaint.location}
                        </Typography>
                        {complaint.specific_item && (
                          <Typography variant="caption" color="textSecondary">
                            {complaint.specific_item}
                          </Typography>
                        )}
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
                      <TableCell>{formatDate(complaint.created_at)}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleApproveClick(complaint.id)}
                          disabled={
                            complaint.teacher_approved === 1 ||
                            complaint.teacher_approved === true
                          }
                          sx={{
                            backgroundColor:
                              complaint.teacher_approved === 1 ||
                              complaint.teacher_approved === true
                                ? "success.light"
                                : "",
                            "&.Mui-disabled": {
                              color: "white",
                              backgroundColor: "success.main",
                            },
                          }}
                        >
                          {complaint.teacher_approved === 1 ||
                          complaint.teacher_approved === true
                            ? "Approved"
                            : "Approve"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Paper
              elevation={1}
              sx={{
                p: 3,
                textAlign: "center",
                backgroundColor: "background.default",
              }}
            >
              <Typography variant="h6" color="textSecondary">
                No complaints found
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Try adjusting your filters or check back later
              </Typography>
            </Paper>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h5" gutterBottom>
              My Complaints
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNewComplaintOpen}
            >
              Submit New Complaint
            </Button>
          </Box>

          {/* Filters */}
          <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Filter My Complaints
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={teacherFilters.status}
                    onChange={handleTeacherFilterChange}
                    label="Status"
                  >
                    <MenuItem value="">All Statuses</MenuItem>
                    {statusTypes.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Complaint Type</InputLabel>
                  <Select
                    name="complaint_type"
                    value={teacherFilters.complaint_type}
                    onChange={handleTeacherFilterChange}
                    label="Complaint Type"
                  >
                    <MenuItem value="">All Types</MenuItem>
                    {teacherComplaintTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="Search"
                  name="search"
                  value={teacherFilters.search}
                  onChange={handleTeacherFilterChange}
                  placeholder="Search by location, description, etc."
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
          {teacherComplaintsLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : teacherComplaints.length > 0 ? (
            <TableContainer component={Paper} elevation={2}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ backgroundColor: "primary.main" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>Type</TableCell>
                    <TableCell sx={{ color: "white" }}>Location</TableCell>
                    <TableCell sx={{ color: "white" }}>Description</TableCell>
                    <TableCell sx={{ color: "white" }}>Status</TableCell>
                    <TableCell sx={{ color: "white" }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teacherComplaints.map((complaint) => (
                    <TableRow
                      key={complaint.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": { backgroundColor: "action.hover" },
                      }}
                    >
                      <TableCell>{complaint.complaint_type}</TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {complaint.location}
                        </Typography>
                        {complaint.specific_item && (
                          <Typography variant="caption" color="textSecondary">
                            {complaint.specific_item}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: "300px",
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
                      <TableCell>{formatDate(complaint.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Paper
              elevation={1}
              sx={{
                p: 3,
                textAlign: "center",
                backgroundColor: "background.default",
              }}
            >
              <Typography variant="h6" color="textSecondary">
                No complaints found
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Submit a new complaint using the button above
              </Typography>
            </Paper>
          )}
        </TabPanel>
      </Paper>

      {/* Approval Dialog */}
      <Dialog
        open={approvalDialog.open}
        onClose={() => setApprovalDialog({ ...approvalDialog, open: false })}
        aria-labelledby="approval-dialog-title"
      >
        <DialogTitle id="approval-dialog-title">Approve Complaint</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please provide a note explaining why you approve this complaint as
            important or worth addressing:
          </DialogContentText>
          <TextField
            autoFocus
            multiline
            rows={4}
            label="Approval Note"
            fullWidth
            variant="outlined"
            value={approvalDialog.note}
            onChange={handleApprovalNoteChange}
            placeholder="This complaint is valid because..."
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setApprovalDialog({ ...approvalDialog, open: false })
            }
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApprovalSubmit}
            color="primary"
            variant="contained"
            disabled={!approvalDialog.note.trim()}
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Complaint Dialog */}
      <Dialog
        open={newComplaintDialog}
        onClose={handleNewComplaintClose}
        aria-labelledby="new-complaint-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="new-complaint-dialog-title">
          Submit New Complaint
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please provide details about your complaint:
          </DialogContentText>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Complaint Type</InputLabel>
                <Select
                  name="complaint_type"
                  value={newComplaint.complaint_type}
                  onChange={handleNewComplaintChange}
                  label="Complaint Type"
                  required
                >
                  <MenuItem value="">Select Type</MenuItem>

                  <ListSubheader>Library Related Complaints</ListSubheader>
                  {teacherComplaintTypes
                    .filter((type) => type.startsWith("Library"))
                    .map((type) => (
                      <MenuItem key={type} value={type}>
                        {type.replace("Library - ", "")}
                      </MenuItem>
                    ))}

                  <ListSubheader>
                    Classroom & Infrastructure Issues
                  </ListSubheader>
                  {teacherComplaintTypes
                    .filter((type) => type.startsWith("Classroom"))
                    .map((type) => (
                      <MenuItem key={type} value={type}>
                        {type.replace("Classroom - ", "")}
                      </MenuItem>
                    ))}

                  <ListSubheader>Student Related Complaints</ListSubheader>
                  {teacherComplaintTypes
                    .filter((type) => type.startsWith("Students"))
                    .map((type) => (
                      <MenuItem key={type} value={type}>
                        {type.replace("Students - ", "")}
                      </MenuItem>
                    ))}

                  <ListSubheader>
                    Administrative & Academic Issues
                  </ListSubheader>
                  {teacherComplaintTypes
                    .filter((type) => type.startsWith("Administrative"))
                    .map((type) => (
                      <MenuItem key={type} value={type}>
                        {type.replace("Administrative - ", "")}
                      </MenuItem>
                    ))}

                  <ListSubheader>Staff & Faculty Concerns</ListSubheader>
                  {teacherComplaintTypes
                    .filter((type) => type.startsWith("Faculty"))
                    .map((type) => (
                      <MenuItem key={type} value={type}>
                        {type.replace("Faculty - ", "")}
                      </MenuItem>
                    ))}

                  <ListSubheader>General Complaints</ListSubheader>
                  {teacherComplaintTypes
                    .filter((type) => type.startsWith("General"))
                    .map((type) => (
                      <MenuItem key={type} value={type}>
                        {type.replace("General - ", "")}
                      </MenuItem>
                    ))}

                  <ListSubheader>Other Categories</ListSubheader>
                  {teacherComplaintTypes
                    .filter((type) => !type.includes(" - "))
                    .map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={newComplaint.location}
                onChange={handleNewComplaintChange}
                placeholder="e.g., Parking Area, Main Building"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Specific Item (Optional)"
                name="specific_item"
                value={newComplaint.specific_item}
                onChange={handleNewComplaintChange}
                placeholder="e.g., West Wing Parking Slot #23"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Problem Description"
                name="problem_description"
                value={newComplaint.problem_description}
                onChange={handleNewComplaintChange}
                placeholder="Describe the issue in detail..."
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Suggestions (Optional)"
                name="suggestions"
                value={newComplaint.suggestions}
                onChange={handleNewComplaintChange}
                placeholder="Any suggestions to resolve the issue..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewComplaintClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleNewComplaintSubmit}
            color="primary"
            variant="contained"
            disabled={
              !newComplaint.complaint_type || !newComplaint.problem_description
            }
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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

export default TeacherDashboard;
