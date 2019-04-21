import { RouterStore } from 'mobx-react-router';

import { GalleryModel } from '../models';
import { ImagesApi, ImagesStore } from './images';

const galleryModel = new GalleryModel();

const routingStore = new RouterStore();
const imagesStore = new ImagesStore(new ImagesApi(), galleryModel);

const stores = {
  routing: routingStore,
  images: imagesStore,
};

export default stores;
