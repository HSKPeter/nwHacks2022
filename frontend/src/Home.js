import React, {Fragment} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

import ReportLoss from './components/ReportLoss';
import FoundItem from './components/FoundItem'

function Home() {
  

  return (
    <Fragment>
     <ReportLoss />
     <FoundItem />
    </Fragment>


  )
}

export default Home
