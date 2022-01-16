import React, {Fragment, useState} from 'react'
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { Box, Stack, Cancel, Typography } from '@mui/system';

function TagsInput() {
  const [tags, setTags] = useState(["Cat", "Cute"]);
  const addTags = (e) => {
    if(e.key == "Enter") {
      setTags([...tags, e.target.value]);
      e.target.value= "";
    }

  }

  const Tags = () => {
    return (
      <Box
        sx={{
          background: "#283240",
          height: "100%",
          display: "flex",
          padding: "0.4rem",
          margin: "0 0.5rem 0 0",
          justifyContent: "center",
          alignContent: "center",
          color: "#ffffff",
        }}
      >
        <Stack direction='row' gap={1}>
          <Typography>Tags</Typography>
          <Cancel/>
          />
        </Stack>
      </Box>
    );
  };
  
  export default function InputTags (){
  
  return (
    <Box sx={{ flexGrow: 1}}>
      <TextField fullWidth
    </Box>  

  )
  
  }
  

export default TagsInput
