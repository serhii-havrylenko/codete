// import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Image } from '../../types';
import Images from './Images';

storiesOf('Images', module).add('default', () => {
  const images: Image[] = [
    {
      id: '1',
      title: text('Image 1 text', 'Image 1'),
      created: 1555853943382,
      details: text('Image 1 details', 'details'),
      author: 'Rob',
      src: text('Image 1 src', 'https://via.placeholder.com/150'),
    },
    {
      id: '2',
      title: 'Image 2',
      created: 1555853945381,
      details: 'details',
      author: 'Rob',
      src: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      title: 'Image 3',
      created: 1555853913282,
      details: 'details',
      author: 'Rob',
      src: 'https://via.placeholder.com/250x150',
    },
  ];

  return <Images images={images}>Body 1</Images>;
});
