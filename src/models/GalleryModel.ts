import { observable } from 'mobx';

import { Image } from '../types';

export class GalleryModel {
  @observable public images: Image[] | null = null;
}
