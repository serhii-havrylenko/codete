import { RouterStore } from 'mobx-react-router';

import { GalleryModel } from '../models';
import { ImageDetailsApi, ImageDetailsStore } from './imageDetails';
import { ImagesApi, ImagesStore } from './images';

const galleryModel = new GalleryModel();

const routingStore = new RouterStore();
const imagesStore = new ImagesStore(new ImagesApi(), galleryModel);
const imageDetailssStore = new ImageDetailsStore(
  new ImageDetailsApi(),
  galleryModel,
);

const stores = {
  routing: routingStore,
  images: imagesStore,
  imageDetails: imageDetailssStore,
};

export type Stores = typeof stores;

export default stores;
