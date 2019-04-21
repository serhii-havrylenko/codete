import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { RouterStore } from 'mobx-react-router';
import React from 'react';

import Layout from './Layout';

storiesOf('Layout', module).add('default', () => {
  const routing = ({
    push: action('Navigate to clicked'),
  } as unknown) as RouterStore;

  return <Layout routing={routing}>Body 1</Layout>;
});
