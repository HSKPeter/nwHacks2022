import { Container } from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import Item from './components/Item'
import SearchBar from './components/SearchBar'
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { loadData } from './utilities/load-data-from-api'
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    items: state.items,
    loading: state.loading,
    error: state.error
  }
};


function Items(props) {
  useEffect(() => {props.dispatch(loadData())}, []);
  console.log(props.items)
  const data = [
    {
      found_items_id: 1,
      name: 'cat black cute nice 123',
      date: '2021-01-15 17:38',
      // location: 'BCIT SE06 320',
      // contacts: '236-990-3350',
      photo_url: 'https://www.cnet.com/a/img/vf8F_Ne6G46iFv2e8KnBCWlPn-s=/940x0/2017/01/26/0935cf37-ae8e-444b-9139-83b782784664/4731067532c1e6dc1443z.jpg'
    },
    {
      found_items_id: 1,
      name: 'cat black cute nice 123',
      date: '2021-01-15 17:38',
      // location: 'BCIT SE06 320',
      // contacts: '236-990-3350',
      photo_url: 'https://www.cnet.com/a/img/vf8F_Ne6G46iFv2e8KnBCWlPn-s=/940x0/2017/01/26/0935cf37-ae8e-444b-9139-83b782784664/4731067532c1e6dc1443z.jpg'
    },
    {
      found_items_id: 1,
      name: 'cat black cute nice 123',
      date: '2021-01-15 17:38',
      // location: 'BCIT SE06 320',
      // contacts: '236-990-3350',
      photo_url: 'https://www.cnet.com/a/img/vf8F_Ne6G46iFv2e8KnBCWlPn-s=/940x0/2017/01/26/0935cf37-ae8e-444b-9139-83b782784664/4731067532c1e6dc1443z.jpg'
    },
    {
      found_items_id: 1,
      name: 'cat black cute nice 123',
      date: '2021-01-15 17:38',
      // location: 'BCIT SE06 320',
      // contacts: '236-990-3350',
      photo_url: 'https://www.cnet.com/a/img/vf8F_Ne6G46iFv2e8KnBCWlPn-s=/940x0/2017/01/26/0935cf37-ae8e-444b-9139-83b782784664/4731067532c1e6dc1443z.jpg'
    },
    {
      found_items_id: 1,
      name: 'cat black cute nice 123',
      date: '2021-01-15 17:38',
      // location: 'BCIT SE06 320',
      // contacts: '236-990-3350',
      photo_url: 'https://www.cnet.com/a/img/vf8F_Ne6G46iFv2e8KnBCWlPn-s=/940x0/2017/01/26/0935cf37-ae8e-444b-9139-83b782784664/4731067532c1e6dc1443z.jpg'
    }
  ]



  return (
    <Fragment>
      <div style={{ marginLeft: "auto", marginRight: "auto", marginTop: "20px" }}>
        <SearchBar fetch={() => {props.dispatch(loadData())}}/>
      </div>
      <Grid container spacing={1} sx={{ mb: 10 }}>
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

// export default Items
export default connect(mapStateToProps)(Items);