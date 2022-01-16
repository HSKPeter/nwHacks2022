import { React, Fragment } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
// import { useState } from 'react';

function SearchBar() {

  const handleEnterKeyPress = (e) => {
    if (e.keyCode == 13) {
      sendPostRequestToAPI(e.target.value);
    }
  }

  const handleClickOfSearchIcon = () => {
    const userInput = document.getElementById("standard-basic").value;
    sendPostRequestToAPI(userInput);
  }

  return (
    <Fragment>
      <TextField id="standard-basic" label="Search" variant="standard" sx={{ width: 360 }}
        InputProps={{
          endAdornment: (
            <SearchIcon onClick={handleClickOfSearchIcon} />
          )
        }}
        onKeyDown={handleEnterKeyPress} />
    </Fragment>
  )
}

function sendPostRequestToAPI(text){  
  if (text.length === 0){
    return;
  }
  console.log(text);
}

export default SearchBar;
