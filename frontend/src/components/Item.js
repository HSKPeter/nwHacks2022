import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

function Item( {item}) {
  return (
    <Card sx={{ maxWidth: 345, mx: 'auto', mt: '2em' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          image="https://nwhacks2022storage.blob.core.windows.net/image/sample-cat-0.jpeg"
          alt="Cat"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            item.location
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </CardContent>
        <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
      </CardActionArea>
    </Card>
  )
}

export default Item
