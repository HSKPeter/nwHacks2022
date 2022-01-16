import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function Item( {item}) {
  const [openBox, setOpenBox] = React.useState(false);

  const getContacts = () => {
    setOpenBox(true);
  }

  const handleClose = () => {
    setOpenBox(false);
  }

  return (
    <Card sx={{ width:'100%', maxWidth: '325px', mx: 'auto', mt: '2em' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          image={item.photo_url}
          alt={item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location found: {item.location}
            <br/>
            Date found: {item.date}
          </Typography>
        </CardContent>
        <CardActions>
        <Button size="small" onClick={getContacts}>Get contacts</Button>
      </CardActions>
      </CardActionArea>
      <Dialog open={openBox} onClose={handleClose}>
        <DialogTitle>Contacts</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {item.contacts}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default Item
