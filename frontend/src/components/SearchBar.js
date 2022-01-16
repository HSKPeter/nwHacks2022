import {React, Fragment} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';

function SearchBar() {


  return (
    <Fragment>
    <TextField id="standard-basic" label="Search" variant="standard" sx={{width: 300}}
    InputProps={{
      endAdornment: (
       <SearchIcon / > 
      )
    }}/>
    </Fragment>
  )
}

export default SearchBar
