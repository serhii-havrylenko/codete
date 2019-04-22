import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import ImageDetails from './ImageDetails';

storiesOf('ImageDetails', module)
  .add('default', () => {
    const props = {
      image: {
        id: '1',
        title: text('Image 1 text', 'Image 1'),
        created: 1555853943382,
        details: text('Image 1 details', 'details\nnext line'),
        author: 'Rob',
        src: text('Image 1 src', 'https://via.placeholder.com/150'),
      },
      onDeleteClick: action('Delete clicked'),
      onEditClick: action('Edit clicked'),
    };

    return <ImageDetails {...props} />;
  })
  .add('without image', () => {
    const props = {
      onDeleteClick: action('Delete clicked'),
      onEditClick: action('Edit clicked'),
      image: null,
    };
    return <ImageDetails {...props} />;
  });
