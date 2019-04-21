import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import red from '@material-ui/core/colors/red';
import IconButton from '@material-ui/core/IconButton';
import { StyleRulesCallback, withStyles } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import * as React from 'react';

import { Image } from '../../types';

export interface ImageDetailsProps {
  image: Image | null;
  classes: ClassNameMap;
  onDeleteClick: (id: Image['id']) => void;
  onEditClick: (id: Image['id']) => void;
}

const styles: StyleRulesCallback = (theme) => ({
  card: {
    maxWidth: '100%',
  },
  media: {
    objectFit: 'cover',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class ImageDetails extends React.Component<ImageDetailsProps> {
  public handleOnDeleteClick = () => {
    this.props.onDeleteClick(this.props.image!.id);
  };

  public handleOnEditClick = () => {
    this.props.onEditClick(this.props.image!.id);
  };

  public render() {
    const { classes, image } = this.props;

    if (!image) {
      return <div>Nothing to show. Image is not found</div>;
    }

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {image.author.substring(0, 4)}
            </Avatar>
          }
          action={
            <IconButton onClick={this.handleOnEditClick}>
              <EditIcon />
            </IconButton>
          }
          title={image.title}
          subheader={new Date(image.created).toLocaleString()}
        />
        <CardMedia
          className={classes.media}
          src={image.src}
          component="img"
          title={image.title}
        />
        <CardContent>
          <Typography component="pre">{image.details}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing={true}>
          <Button onClick={this.handleOnDeleteClick}>
            <DeleteIcon />
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(ImageDetails);
