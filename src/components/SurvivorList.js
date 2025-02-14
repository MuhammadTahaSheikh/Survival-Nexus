import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import CreateSurvivor from "./Modal/CreateSurvivor";
import axios from "axios";


const SurvivorList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [survivors, Setsurvivors] = useState([]);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleChangePage = (newPage) => setPage(newPage);
  const handleNextPage = () => {
    if (page < Math.ceil(survivors.length / rowsPerPage) - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const handleAddSurvivor = async () => {
    try {
      const response = await axios.get("/api/survivors");
      Setsurvivors(response.data);
    } catch (error) {
      console.error("Error adding survivor:", error);
    }
  };
  useEffect(() => {
    handleAddSurvivor();
  }, []);
  return (
    <Box sx={{ padding: 5, margin: "auto" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h5" fontWeight="bold">
            List of Survivors
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            display="flex"
            alignItems="center"
          >
           You have {survivors.filter((s) => s.status === "Healthy").length} healthy survivors

            <Tooltip title="Healthy survivors count">
              <IconButton size="small" sx={{ ml: 1 }}>
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            textTransform: "none",
            backgroundColor: "#f4f4f4",
            color: "black",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#e0e0e0" },
          }}
          onClick={handleOpenModal}
        >
          Add Survivor
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date Added</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {survivors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((survivor, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ bgcolor: "#e0e0e0", marginRight: 1 }} />
                      {survivor.name}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "4px 12px",
                        borderRadius: "12px",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        color:
                          survivor.status === "Healthy" ? "#4CAF50" : "#FF5252",
                        backgroundColor:
                          survivor.status === "Healthy" ? "#E8F5E9" : "#FFEBEE",
                      }}
                    >
                      ● {survivor.status}
                    </Box>
                  </TableCell>
                  <TableCell>{survivor.date}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Typography variant="body2">
          Showing {page * rowsPerPage + 1} to{" "}
          {Math.min((page + 1) * rowsPerPage, survivors.length)} of{" "}
          {survivors.length} results
        </Typography>
        <Box>
          <IconButton
            onClick={handlePreviousPage}
            disabled={page === 0}
            sx={{
              marginRight: 1,
              border: "1px solid #bdbdbd",
              borderRadius: "5px",
            }}
          >
            Previous
          </IconButton>
          <IconButton
            onClick={handleNextPage}
            sx={{ border: "1px solid #bdbdbd", borderRadius: "5px" }}
            disabled={page >= Math.ceil(survivors.length / rowsPerPage) - 1}
          >
            Next
          </IconButton>
        </Box>
      </Box>

      <CreateSurvivor open={openModal} onClose={handleCloseModal} />
    </Box>
  );
};

export default SurvivorList;
