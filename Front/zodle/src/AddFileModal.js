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
import axios from 'axios';

class ScriptUpload {
  constructor(name, description, tags, script) {
    this.Name = name;
    this.Description = description;
    this.Tags = tags;
    this.Script = script;
  }
}

const AddFileModal = ({isOpen, onClose}) => {
  const [selectedTags, setTags] = React.useState([]);

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            const Name = formJson.Name;
            const Script = formJson.Script;
            const Description = formJson.Description;
            const Tags = selectedTags;

            const script = new ScriptUpload(
              formJson.Name,
              formJson.Description,
              selectedTags,
              formJson.File
            );

            console.log(formData);

            axios.postForm('https://localhost:7109/ScriptStore', formData).then(onClose());
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
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" >Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddFileModal;