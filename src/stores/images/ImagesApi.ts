import { RESOURCES, RESOURCES_URL } from '../../constants';
import { ImagesApiInterface } from '../types';

export class ImagesApi implements ImagesApiInterface {
  public fetchImages = () => fetch(`${RESOURCES_URL}${RESOURCES.images.all}`);
}
