import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { Stores } from '../../stores';
import { Omit } from '../../types';
import Images, { ImagesProps } from './Images';

const ImagesContainer = inject<Stores, {}, Pick<ImagesProps, 'images'>, {}>(
  ({ images: imagesStore }: Stores) => ({
    images: imagesStore.images || [],
  }),
)(
  observer(Images as React.FunctionComponent<
    Omit<ImagesProps, 'images' | 'classes'>
  >),
);

export default ImagesContainer;
