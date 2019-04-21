import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import './addons';

const req = require.context('../src', true, /\.story\.tsx?$/);
function loadStories() {
  addDecorator(withKnobs);
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
