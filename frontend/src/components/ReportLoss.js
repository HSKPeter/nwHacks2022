import React, { Fragment, useRef } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';



function ReportLoss() {

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [lossTime, setLossTime] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [contact, setContact] = React.useState("");

  const handleReportLoss = () => {
    setOpen(true);
  }



  const handleClose = () => {
    setOpen(false);
  }

  
  const saveLoss = () => {
    let lossItem = {
      description: description,
      lossTime: lossTime,
      location: location,
      contact: contact
    }

    fetch("localhost:8080/items-lost", {
    method: 'POST',
    body: JSON.stringify(lossItem),
    headers: { 'Content-Type': 'application/json'}
  }).then(() => {
    console.log("loss notice posted");
  });



    console.log(lossItem)
    setOpen(false);
    navigate('/items');

  }


  return (
    <Fragment>
      <Card sx={{ width: '75vw', maxWidth: 500, mx: 'auto', mt: '1em' }}>
        <CardContent>
          <div style={{fontSize: "160px"}}>
            😕
          </div>
          <Typography variant="h5" component="div">
            {/* I would like to report lost */}
            I have lost an item
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleReportLoss}>Report Lost</Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Report Loss</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please describe your loss item
          </DialogContentText>
          <TextField autoFocusmargin="dense" id="description" label="Description"
            placeholder='description' multiline
            sx={{ width: '75vw', maxWidth: 450 }}
            type="text" onChange={(e) => {
              setDescription(e.target.value);
            }} />
          <DialogContentText>
            <br />
          </DialogContentText>

          <TextField
            autoFocusmargin="dense"
            id="datetime-local"
            label="LossTime"
            type="datetime-local"
            onChange={(e) => {
              setLossTime(e.target.value);
            }}
            defaultValue="2021-01-16T10:30"
            sx={{ width: '75vw', maxWidth: 450 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <DialogContentText>
            <br />
          </DialogContentText>
          <TextField autoFocusmargin="dense" id="location" label="Location"
            placeholder='Location'
            sx={{ width: '75vw', maxWidth: 450 }}
            type="text" onChange={(e) => {
              setLocation(e.target.value);
            }} />

          <DialogContentText>
            <br />
          </DialogContentText>
          <TextField autoFocusmargin="dense" id="contact" label="Contacts"
            placeholder='contacts'
            sx={{ width: '75vw', maxWidth: 450 }}
            type="text"
            onChange={(e) => {
              setContact(e.target.value);
            }} />
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveLoss}>Save</Button>
        </DialogActions>
      </Dialog>

    </Fragment>
  )
}

export default ReportLoss
