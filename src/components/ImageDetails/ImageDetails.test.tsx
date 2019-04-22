import { mount } from 'enzyme';
import * as React from 'react';

import { TextField } from '@material-ui/core';
import { ImageDetailsUi } from './ImageDetails';

describe('<ImageDetailsUi />', () => {
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
    classes: {},
  };

  test('should call onDelete callback when clicked delete button', () => {
    const mockOnDeleteClick = jest.fn();
    const wrapper = mount(
      <ImageDetailsUi {...props} onDeleteClick={mockOnDeleteClick} />,
    );

    wrapper.find('button[data-test-id="delete-button"]').simulate('click');
    expect(mockOnDeleteClick).toHaveBeenCalledTimes(1);
  });

  test('should show edit menu when clicked edit button', () => {
    const wrapper = mount(<ImageDetailsUi {...props} />);

    wrapper.find('button[data-test-id="edit-button"]').simulate('click');
    expect(wrapper.instance().state).toEqual({
      edit: true,
      titleHasError: false,
    });

    expect(wrapper.find(TextField)).toHaveLength(1);
  });

  test('should hide edit menu when clicked cancel button', () => {
    const wrapper = mount(<ImageDetailsUi {...props} />);

    wrapper.find('button[data-test-id="edit-button"]').simulate('click');
    wrapper.find('button[data-test-id="cancel-button"]').simulate('click');
    expect(wrapper.instance().state).toEqual({
      edit: false,
      titleHasError: false,
    });

    expect(wrapper.find(TextField)).toHaveLength(0);
  });

  test('should mark input with error when empty and clicked save', () => {
    const wrapper = mount(<ImageDetailsUi {...props} />);

    wrapper.find('button[data-test-id="edit-button"]').simulate('click');
    ((wrapper
      .find(TextField)
      .find('input')
      .instance() as unknown) as HTMLInputElement).value = '';
    wrapper.find('button[data-test-id="save-button"]').simulate('click');

    expect(wrapper.instance().state).toEqual({
      edit: true,
      titleHasError: true,
    });
    expect(wrapper.find(TextField)).toHaveLength(1);
  });

  test('should call onEdit callbacl with proper value when empty and clicked save', () => {
    const mockOnEditClick = jest.fn();
    const wrapper = mount(
      <ImageDetailsUi {...props} onEditClick={mockOnEditClick} />,
    );

    wrapper.find('button[data-test-id="edit-button"]').simulate('click');
    ((wrapper
      .find(TextField)
      .find('input')
      .instance() as unknown) as HTMLInputElement).value = 'test1';
    wrapper.find('button[data-test-id="save-button"]').simulate('click');

    expect(wrapper.instance().state).toEqual({
      edit: false,
      titleHasError: false,
    });
    expect(wrapper.find(TextField)).toHaveLength(0);
    expect(mockOnEditClick).toHaveBeenCalledTimes(1);
    expect(mockOnEditClick).toHaveBeenCalledWith('test1');
  });
});
