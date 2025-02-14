import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";

const Reports = () => {
  const [reportData, setReportData] = useState([]);
  const handleGetReport = async () => {
    try {
      const response = await axios.get("/api/reports");
      setReportData(response.data);
    } catch (error) {
      console.error("Error adding survivor:", error);
    }
  };
  useEffect(() => {
    handleGetReport();
  }, []);
  return (
    <Box>
      {/* Reports Section */}
      <Box sx={{ padding: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          Reports
        </Typography>
        <Typography
          variant="body1"
          color="gray"
          display="flex"
          alignItems="center"
        >
          Your camp has grown{" "}
          <Typography
            component="span"
            color="green"
            fontWeight="bold"
            sx={{ marginX: 0.5 }}
          >
            +5%
          </Typography>{" "}
          this month
          <InfoIcon sx={{ fontSize: 18, marginLeft: 1, color: "gray" }} />
        </Typography>

        {/* Cards */}
        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          {/* Healthy Survivors */}
          <Grid item xs={12} md={4}>
            <Card sx={{ padding: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Number of Healthy Survivors
                </Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>
                  {reportData.nonInfectedPercentage}
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#E8F5E9",
                      color: "#388E3C",
                      paddingX: 1.5,
                      paddingY: 0.5,
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: "bold",
                      mt: 1,
                      position: "relative",
                      bottom: "0.9rem",
                      left: "1rem",
                    }}
                  >
                    +5%
                  </Box>
                </Typography>

                <Typography color="gray" fontSize={14} sx={{ mt: 1 }}>
                  Last 30 days
                </Typography>
                <hr style={{ border: "1px solid #ddd" }} />

                <Button sx={{ mt: 2, color: "#3A1D49", fontWeight: "bold" }}>
                  Download Report
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Infected Survivors */}
          <Grid item xs={12} md={4}>
            <Card sx={{ padding: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Number of Infected Survivors
                </Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>
                  {reportData.infectedPercentage}
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#FFEBEE",
                      color: "#D32F2F",
                      paddingX: 1.5,
                      paddingY: 0.5,
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: "bold",
                      mt: 1,
                      position: "relative",
                      bottom: "0.9rem",
                      left: "1rem",
                    }}
                  >
                    -12%
                  </Box>
                </Typography>

                <Typography color="gray" fontSize={14} sx={{ mt: 1 }}>
                  Last 30 days
                </Typography>
                <hr style={{ border: "1px solid #ddd" }} />

                <Button sx={{ mt: 2, color: "#3A1D49", fontWeight: "bold" }}>
                  Download Report
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Resource Allocation */}
          <Grid item xs={12} md={4}>
            <Card sx={{ padding: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Average Resource Allocation
                </Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>
                  Food
                </Typography>
                <Typography color="gray" fontSize={14} sx={{ mt: 1 }}>
                  10 days worth
                </Typography>
                <hr style={{ border: "1px solid #ddd" }} />

                <Button sx={{ mt: 2, color: "#3A1D49", fontWeight: "bold" }}>
                  Download Report
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Reports;
