import { IconButton, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material';
import './ScriptStore.css';
import { useEffect, useState } from 'react';
import { Add } from '@mui/icons-material';
import AddFileModal from './AddFileModal';
import CodeEditor from '@uiw/react-textarea-code-editor';
import ApiClient from '../Client/ApiClient';

  export default function ScriptStore() {

    const [selectedEntry, setSelectedEntry] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchField, setSearchField] = useState("");
    const [scriptList, setScriptList] = useState([]);
  
    useEffect(() => {
        const getScripts = async () => {
            const scriptData = await ApiClient.get('ScriptStore');
            console.log(process.env.API_URL);
            if(scriptData)
            {
                setScriptList(scriptData);
            }
        } 
        getScripts()
    }, []);
  
    const handleModalClose = () => {
        setModalOpen(false);
        window.location.reload();
    }
  
    const handleSearchFieldChange = (value) => {
        setSearchField(value.toLowerCase());
    };
  
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
              <AddFileModal isOpen={isModalOpen} onClose={() => handleModalClose()} />
  
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
              {selectedEntry ? selectedEntry.Description : 'Cia turetu buti aprasymas'}
            </div>
            <div className='Details'>
              <CodeEditor
                language={selectedEntry ? selectedEntry.Language : ''}
                readOnly
                value={selectedEntry ? selectedEntry.Script : 'Cia turetu buti details'}
              />
            </div>
          </div>
        </div>
      </div>
      
    );
  }