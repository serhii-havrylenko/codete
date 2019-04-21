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
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import * as React from 'react';

import { Image } from '../../types';

export interface ImageDetailsProps {
  image: Image | null;
  classes: ClassNameMap;
  onDeleteClick: () => void;
  onEditClick: (title: Image['title']) => void;
}

interface ImageDetailsState {
  edit: boolean;
  titleHasError: boolean;
}

const styles: StyleRulesCallback = (theme) => ({
  card: {
    maxWidth: '700px',
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

const CardHeaderStyled = withStyles({
  action: {
    alignSelf: 'center',
  },
})(CardHeader);

class ImageDetails extends React.Component<
  ImageDetailsProps,
  ImageDetailsState
> {
  public state = {
    edit: false,
    titleHasError: false,
  };

  private titleRef = React.createRef<HTMLInputElement>();

  public render() {
    const { classes, image } = this.props;
    const { edit, titleHasError } = this.state;

    if (!image) {
      return <div>Nothing to show. Image is not found</div>;
    }

    return (
      <Card className={classes.card}>
        <CardHeaderStyled
          avatar={
            <Avatar className={classes.avatar}>
              {image.author.substring(0, 4)}
            </Avatar>
          }
          action={
            edit ? (
              <div>
                <IconButton onClick={this.handleOnSaveEditClick}>
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={this.handleOnCancelEditClick}>
                  <CancelIcon />
                </IconButton>
              </div>
            ) : (
              <IconButton onClick={this.handleOnEditClick}>
                <EditIcon />
              </IconButton>
            )
          }
          title={
            edit ? (
              <div>
                <TextField
                  margin="none"
                  inputRef={this.titleRef}
                  label="Title"
                  required={true}
                  type="text"
                  error={titleHasError}
                  helperText={titleHasError && 'This field is required'}
                />
              </div>
            ) : (
              image.title
            )
          }
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

  private handleOnDeleteClick = () => {
    this.props.onDeleteClick();
  };

  private handleOnEditClick = () => {
    this.setState({ edit: true }, () => {
      if (this.titleRef.current) {
        this.titleRef.current.focus();
        this.titleRef.current.value = this.props.image!.title;
      }
    });
  };

  private handleOnSaveEditClick = () => {
    if (!this.titleRef.current) {
      return;
    }

    const value = this.titleRef.current.value;

    if (!value) {
      this.setState({ titleHasError: true });
      return;
    }

    this.setState({ edit: false, titleHasError: false });
    this.props.onEditClick(value);
  };

  private handleOnCancelEditClick = () => {
    this.setState({ edit: false, titleHasError: false });
  };
}

export default withStyles(styles)(ImageDetails);
