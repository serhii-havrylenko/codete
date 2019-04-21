import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { Stores } from '../../stores';
import Images, { ImageDetailsProps } from './ImageDetails';

const ImagesDetailsContainer = inject<
  Stores,
  {},
  Pick<ImageDetailsProps, 'image' | 'onDeleteClick' | 'onEditClick'>,
  {}
>(({ imageDetails: imageDetailsStore }: Stores) => {
  return {
    image: imageDetailsStore.image,
    onDeleteClick: console.log,
    onEditClick: console.log,
  };
})(observer(Images as React.FunctionComponent<{}>));

export default ImagesDetailsContainer;
