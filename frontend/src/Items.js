import { Container } from '@mui/material'
import React, { Fragment } from 'react'
import Item from './components/Item'
import SearchBar from './components/SearchBar'
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';

function Items() {
  const data = [
    {
      id: 1,
      description: 'cat black cute nice 123',
      day: '2021-01-15 17:38',
      location: 'BCIT SE06 320',
      contacts: '236-990-3350',
      img: 'https://nwhacks2022storage.blob.core.windows.net/image/sample-cat-0.jpeg'
    },
    {
      id: 2,
      description: 'dog yellow brown hairy fun',
      day: '2021-01-13 19:38',
      location: 'Central Park',
      contacts: '236-996-1017',
      img: 'https://picsum.photos/200/300'
    },
    {
      id: 3,
      description: 'phone iphone black new',
      day: '2021-01-13 19:38',
      location: 'Expo Line MetroTown station',
      contacts: 'peterpang1103@gmail.com',
      img: 'https://picsum.photos/200/299'
    }
  ]



  return (
    <Fragment>
      <div style={{marginLeft: "auto", marginRight: "auto", marginTop:"20px"}}>
        <SearchBar />
      </div>
      <Grid container spacing={1} sx={{mb:10}}>
        {data.map((item) =>
        (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Item key={item.id} item={item} />
            </Grid>
        )
        )}
      </Grid>
    </ Fragment >

  )
}

export default Items
