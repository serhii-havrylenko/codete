import { RESOURCES, RESOURCES_URL } from '../../constants';
import { Image } from '../../types';
import { ImageDetailsApiInterface } from '../types';

export class ImageDetailsApi implements ImageDetailsApiInterface {
  public fetchImageDetails = (id: Image['id']) => {
    const uri = RESOURCES.images.getOne.replace(':id', id);

    return fetch(`${RESOURCES_URL}${uri}`);
  };
}