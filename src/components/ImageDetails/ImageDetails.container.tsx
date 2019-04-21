import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { RoutesEnum } from '../../constants';
import { Stores } from '../../stores';
import { Image } from '../../types';
import Images, { ImageDetailsProps } from './ImageDetails';

const ImagesDetailsContainer = inject<
  Stores,
  {},
  Pick<ImageDetailsProps, 'image' | 'onDeleteClick' | 'onEditClick'>,
  {}
>(({ imageDetails: imageDetailsStore, routing }: Stores) => {
  const onDeleteClick = (id: Image['id']) => {
    imageDetailsStore.deleteImage(id);
    routing.push(RoutesEnum.Images);
  };

  return {
    image: imageDetailsStore.image,
    onDeleteClick,
    onEditClick: console.log,
  };
})(observer(Images as React.FunctionComponent<{}>));

export default ImagesDetailsContainer;
