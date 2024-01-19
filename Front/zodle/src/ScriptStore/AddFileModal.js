import * as React from 'react';
import './AddFileModal.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TagsInput from 'react-tagsinput';
import ApiClient from '../Client/ApiClient';

const AddFileModal = ({isOpen, onClose}) => {
  const [selectedTags, setTags] = React.useState([]);

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={() => onClose(false)}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            ApiClient.postForm('ScriptStore', formData).then(onClose(true));
          },
        }}
      >
        <DialogTitle>Add new script</DialogTitle>
        <DialogContent>

        <TextField
            autoFocus
            required
            margin="dense"
            id="Name"
            name="Name"
            label="Name"
            fullWidth
        />

        <TextField
            autoFocus
            required
            margin="dense"
            id="Script"
            name="Script"
            type="file"
            fullWidth
        />

        <TextField
            autoFocus
            margin="dense"
            id="Description"
            name="Description"
            label="Description"
            fullWidth
        />

        <TagsInput 
          className='react-tagsinput'
          id="Tags"
          name="Tags"
          addKeys={[32]}
          value={selectedTags}
          onChange={(tags) => setTags(tags)}
        />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)}>Cancel</Button>
          <Button type="submit" >Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddFileModal;