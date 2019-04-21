import { inject } from 'mobx-react';
import React from 'react';

import { ImagesStore } from '../../../stores/images';
import ImagesGrid from '../../Images';

@inject('images')
class Images extends React.Component<{ images: ImagesStore }> {
  public componentWillMount() {
    const { images } = this.props;

    images.fetchImages();
  }

  public render() {
    return <ImagesGrid />;
  }
}

export default Images;
