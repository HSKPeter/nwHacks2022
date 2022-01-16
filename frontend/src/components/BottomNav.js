import React, {useState} from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';


function BottomNav() {
  const [value, setValue] = React.useState(0);

  const navigate= useNavigate();



  return (
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right:0, width: '100vw' }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon/>} onClick={() => {navigate('/')}}/>
        <BottomNavigationAction label="Items" icon={<SearchIcon />} onClick={() => {navigate('/items')}} />
      </BottomNavigation>
    </Box>
  )
}

export default BottomNav;



