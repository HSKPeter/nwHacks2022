import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import BottomNav from './components/BottomNav'
import Grid from '@mui/material/Grid';
import Home from "./Home";
import Header from './components/Header';
import Items from './Items';



function App() {
  return (
    <Router>
      <Grid container spacing={2}>

      <Grid item xs={12} md={12}>
      <Header />

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
