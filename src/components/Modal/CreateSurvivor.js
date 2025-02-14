import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import axios from "axios";

function CreateSurvivor({ open, onClose }) {
  const [name, setFullName] = useState("");
  const [status, setStatus] = useState("");

  const handleAddSurvivor = async () => {
    try {
      const response = await axios.post("/api/survivors", { name, status });

      setFullName("");
      setStatus("");
      onClose(); // Close the dialog after successful addition
    } catch (error) {
      console.error("Error adding survivor:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { width: "400px", maxWidth: "none" } }}
    >
      <DialogTitle>Add Survivor</DialogTitle>
      <DialogContent>
        <TextField
          label="Full Name of Survivor"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setFullName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="Healthy">Healthy</MenuItem>
            <MenuItem value="Infected">Infected</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddSurvivor} color="primary">
          Add Survivor
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateSurvivor;
