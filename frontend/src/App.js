import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import BottomNav from './components/BottomNav'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Home from "./Home";
import Header from './components/Header'
import { blue } from '@mui/material/colors';
import Items from './Items'

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  palette: 'light'
    
  
}));



function App({ children }) {
  return (
    <Router>
      <Grid container spacing={2}>

      <Grid item xs={12} md={12}>
      <Item>
      <Header />

      </Item>
      </Grid>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="items" element={<Items />} />
      </Routes>
      <BottomNav />

      </Grid>

    </Router>
  );
}

export default App;
