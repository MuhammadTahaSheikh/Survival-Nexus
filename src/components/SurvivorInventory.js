import React, { useState, useEffect } from "react";
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
import RequestItemModal from "./Modal/CreateInventory";
import axios from "axios";

const SurvivoryInventory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false); // State to control modal
  const [selectedSurvivor, setSelectedSurvivor] = useState(null); // State to store the selected survivor's info
  const [survivors, Setsurvivors] = useState([]);
  const handleAddSurvivor = async () => {
    try {
      const response = await axios.get("/api/survivors");
      Setsurvivors(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding survivor:", error);
    }
  };
  useEffect(() => {
    handleAddSurvivor();
  }, []);
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

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

  const handleRequestItemClick = (survivor) => {
    console.log("survivor check", survivor._id);
    setSelectedSurvivor(survivor);
    setOpenModal(true);
  };

  const handleRequestItem = (survivor, item) => {
    handleAddSurvivor();
  };

  return (
    <Box sx={{ padding: 5, margin: "auto" }}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h5" fontWeight="bold">
            List of Survivors Inventories
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            display="flex"
            alignItems="center"
          >
            You have {survivors.length} inventories logged
            <Tooltip title="Healthy survivors count">
              <IconButton size="small" sx={{ ml: 1 }}>
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Typography>
        </Box>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Inventories</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
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
                    <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                      {/* {survivor.inventories} */}
                      {survivor.inventory
                        .map((inv) => inv.item.name)
                        .join(", ")}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button
                      sx={{ color: "black", border: "1px solid #bdbdbd" }}
                      onClick={() => handleRequestItemClick(survivor)}
                    >
                      Request Item
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Section */}
      <Box display="flex" justifyContent="end" alignItems="center" mt={2}>
        {/* <Typography variant="body2">
          Showing {page * rowsPerPage + 1} to{" "}
          {Math.min((page + 1) * rowsPerPage, survivors.length)} of{" "}
          {survivors.length} results
        </Typography> */}
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

      {/* Request Item Modal */}
      <RequestItemModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedSurvivor={selectedSurvivor}
        onRequestItem={handleRequestItem}
      />
    </Box>
  );
};

export default SurvivoryInventory;
