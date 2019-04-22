import { mount } from 'enzyme';
import * as React from 'react';

import { Theme } from '@material-ui/core';
import ImageDetails, { styles } from './ImageDetails';

jest.mock('@material-ui/core/Card', () => ({ children, ...rest }: any) => (
  <div {...rest}>{children}</div>
));
jest.mock('@material-ui/core/CardActions', () => ({ children }: any) => (
  <div>{children}</div>
));
jest.mock(
  '@material-ui/core/CardContent',
  () => ({ children, ...rest }: any) => <div {...rest}>{children}</div>,
);
jest.mock(
  '@material-ui/core/CardHeader',
  () => ({ children, ...rest }: any) => <div {...rest}>{children}</div>,
);
jest.mock('@material-ui/core/CardMedia', () => ({ children }: any) => (
  <div>{children}</div>
));
jest.mock('@material-ui/core/Avatar', () => ({ children }: any) => (
  <div>{children}</div>
));
jest.mock('@material-ui/core/Button', () => ({ children, ...rest }: any) => (
  <button {...rest}>{children}</button>
));
jest.mock(
  '@material-ui/core/IconButton',
  () => ({ children, ...rest }: any) => <button {...rest}>{children}</button>,
);
jest.mock('@material-ui/core/TextField', () => ({ children, ...rest }: any) => (
  <input {...rest}>{children}</input>
));
jest.mock('@material-ui/core/Typography', () => ({ children }: any) => (
  <div>{children}</div>
));

describe('<ImageDetails />', () => {
  const props = {
    image: {
      id: '1',
      title: 'Image 1',
      created: 1555853943382,
      details: 'details\nnext line',
      author: 'Rob',
      src: 'https://via.placeholder.com/150',
    },
    onDeleteClick: jest.fn(),
    onEditClick: jest.fn(),
  };

  test('should render and match snapshot with image', () => {
    const wrapper = mount(<ImageDetails {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render and match snapshot without image', () => {
    const wrapper = mount(<ImageDetails {...props} image={null} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should match styles', () => {
    expect(styles(({} as unknown) as Theme)).toMatchSnapshot();
  });
});
