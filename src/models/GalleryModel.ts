import { observable } from 'mobx';

import { Image } from '../types';

export class GalleryModel {
  @observable public images: Image[] | null = null;

  @observable public activeImageId: Image['id'] | null = null;

  @observable public activeImage: Image | null = null;
}
