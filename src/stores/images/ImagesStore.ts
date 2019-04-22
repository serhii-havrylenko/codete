import { action, computed } from 'mobx';

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
    return this.imagesApi
      .fetchImages()
      .then(this.onFetchImagesData)
      .then(this.onFetchResults)
      .catch(this.onFetchError);
  };

  @action public onFetchImagesData = (response: Response) => {
    if (response.status >= 400) {
      return Promise.reject();
    }

    return response.json();
  };

  @action public onFetchResults = (images: Image[]) => {
    this.model.images = images;
  };

  @action public onFetchError = () => {
    this.model.images = null;
  };
}
