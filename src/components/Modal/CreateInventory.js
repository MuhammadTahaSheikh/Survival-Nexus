import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const RequestItemModal = ({ open, onClose, selectedSurvivor, onRequestItem }) => {
  const [itemsSelected, setItemsSelected] = useState([]);  
  const [items, setItems] = useState([]); 

  const getItems = async () => {
    try {
      const response = await axios.get("api/items");
      setItems(response.data);  
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    if (open) {
      getItems();  
    }
  }, [open]);

  const handleRequestItem = async () => {
    try {
      const payload = { inventory: itemsSelected };  
      await axios.put(`/api/survivors/${selectedSurvivor._id}`, payload);
      onRequestItem(selectedSurvivor, itemsSelected);
      
      setItemsSelected([]);  
      onClose();  
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { width: "400px", maxWidth: "none" } }}
    >
      <DialogTitle>Request Item - {selectedSurvivor?.name}</DialogTitle>
      <DialogContent>
        <Box>
          <Typography variant="body1" mb={2}>Choose items</Typography>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="item-select-label">Items</InputLabel>
            <Select
              labelId="item-select-label"
              multiple
              value={itemsSelected}
              onChange={(e) => setItemsSelected(e.target.value)}
              label="Items"
            >
              {items.map((itemData) => (
                <MenuItem key={itemData._id} value={itemData._id}>
                  {itemData.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleRequestItem} color="primary">Request Items</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestItemModal;
