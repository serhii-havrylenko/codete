import { action, computed } from 'mobx';
// import { createTransformer } from 'mobx-utils';
// import { find, intersection, map, filter, includes } from 'lodash';

import { GalleryModel } from '../../models';
import { Image } from '../../types';
import { ImagesApiInterface } from '../types';

export class ImagesStore {
  public imagesApi: ImagesApiInterface;

  public model: GalleryModel;

  constructor(imagesApi: ImagesApiInterface, model: GalleryModel) {
    this.imagesApi = imagesApi;
    this.model = model;
  }

  @computed get images() {
    return this.model.images;
  }

  @action public fetchImages = async () => {
    this.imagesApi
      .fetchImages()
      .then(this.onFetchImagesData)
      .then(this.onFetchResults)
      .catch(console.log);
  };

  @action public onFetchImagesData = (response: Response) => {
    return response.json();
  };

  @action public onFetchResults = (images: Image[]) => {
    this.model.images = images;
  };
}
