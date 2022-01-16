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
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';


function ReportLoss() {
  const [open, setOpen] = React.useState(false);
  const [isUploadingImage, setImageUploadingStatus] = React.useState(false);
  const [imagePath, setImagePath] = React.useState("");
  const [hashtags, updateHashtags] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [foundTime, setFoundTime] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [contact, setContact] = React.useState("");


  const handleFound = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const saveFound = () => {
    let foundItem = {
      imagePath, description, foundTime, location, contact, hashtags
    }

    fetch("localhost:8080/items-found", {
      method: 'POST',
      body: JSON.stringify(foundItem),
      headers: { 'Content-Type': 'application/json'}
    }).then(() => {
      console.log("found notice posted");
    });

    setOpen(false);
    setImagePath("");
    updateHashtags([]);
  }

  const handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      addHashtag();
    }
  }

  const addHashtag = () => {
    const input = document.querySelector("#hashtags-input").value
    if (hashtags.includes(input)) {
      return
    }
    const newHashtags = hashtags.slice();
    newHashtags.push(input);
    console.log(newHashtags)
    document.querySelector("#hashtags-input").value = "";
    updateHashtags(newHashtags);
  }

  const removeTag = (hashtag) => {
    const newHashtags = hashtags.slice();
    const index = newHashtags.indexOf(hashtag);
    if (index > -1) {
      newHashtags.splice(index, 1);
    }
    console.log("xx")
    updateHashtags(newHashtags);
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
    updateHashtags(tags.map(tag => tag.name));
  }

  return (
    <Fragment>
      <Card sx={{ width: '75vw', maxWidth: 500, mx: 'auto', mt: '1em' }}>
        <CardContent>
          <div style={{ fontSize: "160px" }}>
            🗣️
          </div>
          <Typography variant="h5" component="div">
            {/* I found an item */}
            I have found an item
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleFound}>Share Info</Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share Info</DialogTitle>
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
                    <img src={imagePath} style={{ objectFit: "contain" }} />
                  </ImageListItem>
                </ImageList>
                : ""}
            </Grid>
          </Grid>
          <TextField id="description" label="Description"
            placeholder='Description' multiline
            sx={{ width: '75vw', maxWidth: 450 }}
            type="text" onChange={(e) => {
              setDescription(e.target.value);
            }}/>
          <DialogContentText>
            <br />
          </DialogContentText>

          <TextField
          
            id="datetime-local"
            label="Found Time"
            type="datetime-local"
            defaultValue="2021-01-16T10:30"
            sx={{ width: '75vw', maxWidth: 450 }}
            onChange={(e) => {
              setFoundTime(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <DialogContentText>
            <br />
          </DialogContentText>
          <TextField id="location" label="Found Location"
            placeholder='Found Location'
            sx={{ width: '75vw', maxWidth: 450 }}
            type="text" onChange={(e) => {
              setLocation(e.target.value);
            }} />

          <DialogContentText>
            <br />
          </DialogContentText>
          <TextField id="contact" label="Contacts"
            placeholder='Contacts'
            sx={{ width: '75vw', maxWidth: 450 }}
            type="text" 
            onChange={(e) => {
              setContact(e.target.value);
            }} />
          <DialogContentText>
            <br />
          </DialogContentText>
          <>
            <TextField autoFocusmargin="dense" id="hashtags-input" label="hashtags" variant="outlined"
              label="Hashtags"
              placeholder='Hashtags'
              sx={{ width: '75vw', maxWidth: 450 }}
              InputProps={{
                endAdornment: (
                  <AddIcon onClick={addHashtag} />
                )
              }}
              onKeyDown={handleKeyDown}
              type="text" />
            <Box sx={{ marginTop: "12px", display: 'block' }}>

              {
                hashtags.map((hashtag, i) => {
                  return (
                    <div
                      style={{ margin: "8px 6px", padding: "2px 4px", background: "#FAFAFA", border: "1px solid #E8E8E8", borderRadius: "4px", display: 'inline-block' }}
                      key={`hashtag-${i}`}>
                      <span>{"#" + hashtag}</span>
                      <ClearIcon sx={{ "fontSize": "10px", color: "white", marginLeft: "6px", padding: "1px", backgroundColor: "#E33E2C", borderRadius: "4px" }} onClick={() => { removeTag(hashtag) }} />
                    </div>
                  )
                })}
            </Box>
          </>
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
