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
import Input from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
import computerVision from '../utilities/azure-computer-vision';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import uploadFileToBlob from "../utilities/upload-image-to-azure-blob"


function ReportLoss() {
  const [open, setOpen] = React.useState(false);
  const [isUploadingImage, setImageUploadingStatus] = React.useState(false);
  const [imagePath, setImagePath] = React.useState("");

  const handleFound = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const saveFound = () => {
    setOpen(false);
  }

  const Input = styled('input')({
    display: 'none',
  });

  async function handleImageUpload(event) {
    const file = document.querySelector("#image-upload").files[0];
    const imageUrl = await uploadFileToBlob(file);
    setImageUploadingStatus(true);
    const tags = await computerVision(imageUrl)
    setImageUploadingStatus(false);
    setImagePath(imageUrl)
    console.log(tags);
  }

  return (
    <Fragment>
      <Card sx={{ minWidth: 275, mx: 'auto', mt: '1em' }}>
        <CardContent>

          <Typography variant="h5" component="div">
            I found an item
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleFound}>Found item</Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Found Item</DialogTitle>
        <DialogContent>

          <Grid container spacing={2}>
            <Grid item xs={8}>
              <label htmlFor="image-upload">
                <Input accept="image/*" id="image-upload" type="file" onChange={handleImageUpload} />
                <Box>
                  <Button variant="contained" component="span" sx={{ marginBottom: "20px", marginTop: "10px" }}>
                    <PhotoCamera sx={{ marginRight: "10px" }} />
                    {(imagePath !== "") ? "Upload New Photo" : "Upload Photo"}
                  </Button>
                  {(isUploadingImage) ? <CircularProgress size={20} sx={{ marginLeft: "10px" }} /> : ""}
                </Box>
              </label>
            </Grid>
            <Grid item xs={4}>
              {imagePath !== ""
                ?
                <ImageList sx={{ width: 100 }} rowHeight={164} cols={1}>
                  <ImageListItem >
                    <img src={imagePath} style={{objectFit: "contain"}}/>
                  </ImageListItem>
                </ImageList>
                : ""}
            </Grid>
          </Grid>
          <TextField autoFocusmargin="dense" id="description" label="Description"
            placeholder='Description' multiline
            sx={{ width: '75vw', maxWidth: 450 }}
            type="text" />
          <DialogContentText>
            <br />
          </DialogContentText>

          <TextField
            autoFocusmargin="dense"
            id="datetime-local"
            label="Found Time"
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
          <TextField autoFocusmargin="dense" id="location" label="Found Location"
            placeholder='Found Location'
            sx={{ width: '75vw', maxWidth: 450 }}
            type="text" />

          <DialogContentText>
            <br />
          </DialogContentText>
          <TextField autoFocusmargin="dense" id="contact" label="Contacts"
            placeholder='Contacts'
            sx={{ width: '75vw', maxWidth: 450 }}

            type="text" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFound}>Save</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default ReportLoss
