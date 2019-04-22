import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import { StyleRulesCallback, withStyles } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import InfoIcon from '@material-ui/icons/Info';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { RoutesEnum } from '../../constants';
import { Image } from '../../types';

export interface ImagesProps {
  images: Image[];
  classes: ClassNameMap<string>;
}

const styles: StyleRulesCallback = (theme) => ({
  root: {
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridItem: {
    maxHeight: 254,
    width: '100% !important',
  },
  gridList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  icon: {
    color: '#f9d4d4',
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
    color: 'inherit',
    '&:visited': {
      color: 'inherit',
    },
  },
});

const Images: React.SFC<ImagesProps> = ({ classes, images }) => (
  <div className={classes.root}>
    <GridList cellHeight={250} className={classes.gridList}>
      {images.map((image) => {
        const detailsUrl = RoutesEnum.ImageDetails.replace(':id', image.id);

        return (
          <GridListTile key={image.id} className={classes.gridItem}>
            <img src={image.src} alt={image.title} className={classes.img} />
            <GridListTileBar
              title={image.title}
              actionIcon={
                <IconButton className={classes.icon}>
                  <Link to={detailsUrl} className={classes.link}>
                    <InfoIcon />
                  </Link>
                </IconButton>
              }
            />
          </GridListTile>
        );
      })}
      {images.length === 0 && (
        <ListSubheader className={classes.gridItem}>
          Nothing to show, pleaes check that API server is running
        </ListSubheader>
      )}
    </GridList>
  </div>
);

export default withStyles(styles)(Images);
