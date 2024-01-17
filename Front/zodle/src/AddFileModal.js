import * as React from 'react';
import './AddFileModal.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TagsInput from 'react-tagsinput';

const AddFileModal = ({isOpen, onClose}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedTags, setTags] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.title;
            const file = formJson.file;
            console.log(file);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add new script</DialogTitle>
        <DialogContent>

        <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Script name"
            fullWidth
        />

        <TextField
            autoFocus
            required
            margin="dense"
            id="file"
            name="file"
            type="file"
            fullWidth
        />

        <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Description"
            fullWidth
        />

        <TagsInput 
          className='react-tagsinput'
          id="tags"
          name="tags"
          addKeys={[32]}
          value={selectedTags}
          onChange={(tags) => setTags(tags)}
        />

        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddFileModal;