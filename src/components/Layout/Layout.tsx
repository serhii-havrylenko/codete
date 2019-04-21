import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { StyleRulesCallback, withStyles } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import ImageIcon from '@material-ui/icons/Image';
import MenuIcon from '@material-ui/icons/Menu';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import * as React from 'react';

import { RoutesEnum } from '../../constants';

const drawerWidth = 240;

const styles: StyleRulesCallback = (theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

interface LayoutProps {
  routing?: RouterStore;
  children: React.ReactNode;
  classes: ClassNameMap<string>;
}
interface LayoutState {
  open: boolean;
}

@inject('routing')
@observer
class Layout extends React.Component<LayoutProps, LayoutState> {
  public state = {
    open: true,
  };

  public handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  public handleDrawerClose = () => {
    this.setState({ open: false });
  };

  public navigateTo = (location: string) => {
    this.props.routing!.push(location);
  };

  public navigateToImages = () => {
    this.navigateTo(RoutesEnum.Images);
  };

  public navigateToFAQ = () => {
    this.navigateTo(RoutesEnum.FAQ);
  };

  public render() {
    const { classes, children } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap={true}
              className={classes.title}
            >
              <DonutSmallIcon />
              Images gallery
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !open && classes.drawerPaperClose,
            ),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <Typography variant="h4">
              <FlightTakeoffIcon />
              Navigate
            </Typography>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {' '}
            <ListItem button={true} onClick={this.navigateToImages}>
              <ListItemIcon>
                <ImageIcon />
              </ListItemIcon>
              <ListItemText primary="Images" />
            </ListItem>
            <ListItem button={true} onClick={this.navigateToFAQ}>
              <ListItemIcon>
                <QuestionAnswerIcon />
              </ListItemIcon>
              <ListItemText primary="FAQ" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {children}
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Layout);
