import { Box, IconButton, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material';
import './ScriptStore.css';
import { useEffect, useState } from 'react';
import { Add, Delete, Download } from '@mui/icons-material';
import AddFileModal from './AddFileModal';
import CodeEditor from '@uiw/react-textarea-code-editor';
import ApiClient from '../Client/ApiClient';
import DeleteDialog from './DeleteDialog';

  export default function ScriptStore() {

    const [selectedEntry, setSelectedEntry] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [searchField, setSearchField] = useState("");
    const [scriptList, setScriptList] = useState([]);
  
    useEffect(() => {
        const getScripts = async () => {
            const scriptData = await ApiClient.get('ScriptStore');
            if(scriptData)
            {
                setScriptList(scriptData);
            }
        } 
        getScripts()
    }, []);
  
    const handleModalClose = (isSubmitted) => {
        setModalOpen(false);
        if(isSubmitted){
          window.location.reload();
        }
    }

    const handleDeleteDialogClose = async (isDeleted) => {
      setDeleteDialogOpen(false);
      if(isDeleted){
        const url = '/ScriptStore/' + selectedEntry.Id;
        await ApiClient.delete(url);
        const index = scriptList.findIndex(x => x.Id === selectedEntry.Id);
        if (index > -1) { // only splice array when item is found
          scriptList.splice(index, 1); // 2nd parameter means remove one item only
        }
        setScriptList(scriptList);
        setSelectedEntry(null);
      }
  }
  
    const handleSearchFieldChange = (value) => {
        setSearchField(value.toLowerCase());
    };

    const handleDownload = () => {
      const path = process.env.REACT_APP_API_URL + '/ScriptStore/download/' + selectedEntry.Id;
      ApiClient.download(path);
    }
  
    const filteredList = scriptList.filter(
      (script) => {
        return (
          script.Name.toLowerCase().includes(searchField) ||
          script.Description.toLowerCase().includes(searchField) ||
          script.Tags.includes(searchField)
        );
      }
    );
  
    return (
      <div className='App'>
        <DeleteDialog isOpen={isDeleteDialogOpen} onClose={handleDeleteDialogClose}/>
        <AddFileModal isOpen={isModalOpen} onClose={handleModalClose} />
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
                size="medium"
                onClick={() => setModalOpen(true)}
              >
                <Add/>
                <Box fontSize={16}>Add script</Box>
              </IconButton>
  
              <TextField
                autoFocus
                required
                margin="dense"
                fullWidth
                type='search'
                placeholder='Search'
                sx={{
                  background: "white",
                  borderRadius: "4px"
                }}
                onChange={(change) => handleSearchFieldChange(change.target.value)}
              />
            </div>
  
            <div className='ScrollList'>
              <List>
                {filteredList.length <= 0 ? 
                <Box sx={{padding: "8px"}}>
                  List is empty
                </Box>
                : 
                
                filteredList.map((entry) => 
                  <ListItem key={entry.Id} disablePadding>
                      <ListItemButton onClick={() => setSelectedEntry(entry)}>
                        <ListItemText primary={entry.Name} />
                      </ListItemButton>
                  </ListItem>
                )}
              </List>
            </div>
  
          </div>
  
          <div className='RightPanel'>
            <div className='Description'>
              <div className='Description-top-panel'>
                <Box padding={1}>
                  {selectedEntry ? selectedEntry.Name : 'Select a script'}
                </Box>
                <Box className='ScriptButtonPanel' visibility={selectedEntry ? 'visible' : 'hidden'}>
                  <IconButton aria-label="download" onClick={() => handleDownload()}>
                    <Download />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => setDeleteDialogOpen(true)}>
                    <Delete />
                  </IconButton>
                </Box>
              </div>
              <div>
                {selectedEntry ? selectedEntry.Description : ''}
              </div>
            </div>
            <div className='Details'>
              <CodeEditor
                language={selectedEntry ? selectedEntry.Language : ''}
                readOnly
                value={selectedEntry ? selectedEntry.Script : '<...>'}
              />
            </div>
          </div>
        </div>
      </div>
      
    );
  }