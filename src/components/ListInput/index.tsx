import { Box, Button, IconButton, TextField, SxProps } from '@mui/material'
import { memo } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

type ListInputProps = {
  value: string[]
  onChange: (value: string[]) => void
  buttonLabel?: string
  sx?: SxProps
}

const ListInput = ({ value, onChange, buttonLabel = 'Add Item', sx }: ListInputProps) => {
  const handleAddItem = () => {
    onChange([...value, '']);
  };

  const handleRemoveItem = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  const handleEditItem = (index: number, newValue: string) => {
    const newItems = [...value];
    newItems[index] = newValue;
    onChange(newItems);
  };

  return (
    <Box sx={sx}>
      {value.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: index > 0 ? 1 : 0 }}>
          <TextField
            fullWidth
            value={item}
            onChange={(e) => handleEditItem(index, e.target.value)}
            variant="outlined"
            size="small"
          />
          <IconButton
            onClick={() => handleRemoveItem(index)}
            color="error"
            size="small"
            sx={{ ml: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleAddItem}
        sx={{ mt: 1 }}
      >
        {buttonLabel}
      </Button>
    </Box>
  );
};

export default memo(ListInput)
