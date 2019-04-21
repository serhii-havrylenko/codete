import { Image } from '../types';

export interface ImagesApiInterface {
  fetchImages(): Promise<Response>;
}

export interface ImageDetailsApiInterface {
  fetchImageDetails(id: Image['id']): Promise<Response>;
  deleteImage(id: Image['id']): Promise<Response>;
}
