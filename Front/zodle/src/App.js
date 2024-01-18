import { Button, IconButton, List, ListItem, ListItemButton, ListItemText, TextField, styled } from '@mui/material';
import './App.css';
import { useState } from 'react';
import { Add, Delete } from '@mui/icons-material';
import { grey, purple } from '@mui/material/colors';
import AddFileModal from './AddFileModal';

//https://legacy.reactjs.org/docs/forms.html

class DocEntry {
  constructor(id) {
    this.Id = id;
    this.Title = 'Title ' + id;
    this.Description = 'Description ' + id;
    this.Details = 'Details ' + id;
    this.Tags = ["Tag1"];

    for(let i = 0; i < id; i++)
    {
      this.Details += "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    }
  }
}

function App() {

  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchField, setSearchField] = useState("");

  const handleSearchFieldChange = (value) => {
    setSearchField(value.toLowerCase());
  };

  const docList = [];
  for(let i = 0; i < 50; i++)
  {
    docList.push(new DocEntry(i));
  }
  const filteredList = docList.filter(
    (script) => {
      return (
        script.Title.toLowerCase().includes(searchField) ||
        script.Description.toLowerCase().includes(searchField) ||
        script.Tags.includes(searchField)
      );
    }
  );

  return (
    <div className='App'>
      <div className='Body'>

        <div className='LeftPanel'>

          <div className='ButtonMenu'>
            
            <IconButton
              style={{
                color: 'white',
                border: '1px solid white',
                borderRadius: '8px'
              }}
              aria-label="add" 
              size="large"
              onClick={() => setModalOpen(true)}
            >
              <Add/>
            </IconButton>
            <AddFileModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

            <TextField
              autoFocus
              required
              margin="dense"
              fullWidth
              type='search'
              sx={{
                background: "white",
                borderRadius: "4px"
              }}
              onChange={(change) => handleSearchFieldChange(change.target.value)}
            />
          </div>

          <div className='ScrollList'>
            <List>
              {filteredList.map((entry) => 
                <ListItem disablePadding>
                    <ListItemButton key={1} onClick={() => setSelectedEntry(entry)}>
                      <ListItemText primary={entry.Title} />
                    </ListItemButton>
                </ListItem>
              )}
            </List>
          </div>

        </div>

        <div className='RightPanel'>
          <div className='Description'>
            {selectedEntry ? selectedEntry.Description : 'Cia turetu buti aprasymas'}
          </div>
          <div className='Details'>
            {selectedEntry ? selectedEntry.Details : 'Cia turetu buti details'}
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default App;
