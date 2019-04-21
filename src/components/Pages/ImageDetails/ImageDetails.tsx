import { inject } from 'mobx-react';
import * as React from 'react';
import { match } from 'react-router';

import { Stores } from '../../../stores';
import { ImageDetailsContainer } from '../../ImageDetails';

interface ImageDetailsProps {
  match: match<{ id: string }>;
  imageDetails: Stores['imageDetails'];
}

@inject('imageDetails')
class ImageDetails extends React.Component<ImageDetailsProps> {
  constructor(props: ImageDetailsProps) {
    super(props);

    props.imageDetails.setActiveImage(props.match.params.id);
  }

  public render() {
    return <ImageDetailsContainer />;
  }
}

export default ImageDetails;
