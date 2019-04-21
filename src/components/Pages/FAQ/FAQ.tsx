import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import React from 'react';

const FAQ = () => (
  <div>
    <Typography variant="h2">Used Tools and Libraries</Typography>
    <List component="nav">
      <ListItem>
        <ListItemText primary="react" />
      </ListItem>
      <ListItem>
        <ListItemText primary="react-router" />
      </ListItem>
      <ListItem>
        <ListItemText primary="mobx" />
      </ListItem>
      <ListItem>
        <ListItemText primary="mobx-react" />
      </ListItem>
      <ListItem>
        <ListItemText primary="@material-ui" />
      </ListItem>
    </List>
    <Divider />
    <List component="nav">
      <ListItem>
        <ListItemText primary="json-server" />
      </ListItem>
    </List>
    <Divider />
    <List component="nav">
      <ListItem>
        <ListItemText primary="typescript" />
      </ListItem>
      <ListItem>
        <ListItemText primary="jest" />
      </ListItem>
      <ListItem>
        <ListItemText primary="webpack" />
      </ListItem>
      <ListItem>
        <ListItemText primary="tslint" />
      </ListItem>
      <ListItem>
        <ListItemText primary="prettier" />
      </ListItem>
    </List>
  </div>
);

export default FAQ;
