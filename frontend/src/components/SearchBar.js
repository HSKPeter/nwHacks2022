import { React, Fragment } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
// import { useState } from 'react';

function SearchBar(props) {
  function sendPostRequestToAPI(text){  
    if (text.length === 0){
      return;
    } else {
      fetch("http://localhost:8080/search", {
        method: 'POST',
        body: JSON.stringify({keywords: text}),
        headers: { 'Content-Type': 'application/json'}
      }).then(() => {
        console.log("search request posted");
      });
    }
    props.fetch();
  }
  
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


export default SearchBar;
