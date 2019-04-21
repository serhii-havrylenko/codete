import { action, computed } from 'mobx';

import { GalleryModel } from '../../models';
import { Image } from '../../types';
import { ImageDetailsApiInterface } from '../types';

export class ImageDetailsStore {
  public imageApi: ImageDetailsApiInterface;

  public model: GalleryModel;

  constructor(imagesApi: ImageDetailsApiInterface, model: GalleryModel) {
    this.imageApi = imagesApi;
    this.model = model;
  }

  @computed get imageId() {
    return this.model.activeImageId;
  }

  @computed get image() {
    return this.model.activeImage;
  }

  @action public setActiveImage(id: Image['id']) {
    this.model.activeImageId = id;
    this.model.activeImage = null;

    this.fetchImageDetails();
  }

  @action public fetchImageDetails = async () => {
    const id = this.model.activeImageId;
    if (!id) {
      return;
    }

    this.imageApi
      .fetchImageDetails(id)
      .then(this.onFetchImagesData)
      .then(this.onFetchResults)
      .catch(console.log);
  };

  @action public onFetchImagesData = (response: Response) => {
    return response.json();
  };

  @action public onFetchResults = (image: Image | null) => {
    this.model.activeImage = image;
  };
}
