import React, { Fragment } from 'react'
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

  const navigate= useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleReportLoss = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const saveLoss = () => {
    setOpen(false);
    navigate('/items');

  }


  return (
    <Fragment>
      <Card sx={{ width:'75vw', maxWidth:500, mx: 'auto', mt: '1em' }}>
        <CardContent>

          <Typography variant="h5" component="div">
            I would like to report lost
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
          type="text" />
          <DialogContentText>
            <br />
          </DialogContentText>

          <TextField
            autoFocusmargin="dense"
            id="datetime-local"
            label="LossTime"
            type="datetime-local"
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
          type="text" />

          <DialogContentText>
            <br />
          </DialogContentText>
          <TextField autoFocusmargin="dense" id="contact" label="Contacts"
          placeholder='contacts'
          sx={{ width: '75vw', maxWidth: 450 }}

            type="text" />
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
