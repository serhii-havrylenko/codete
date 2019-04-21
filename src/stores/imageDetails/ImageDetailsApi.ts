import { RESOURCES, RESOURCES_URL } from '../../constants';
import { Image } from '../../types';
import { ImageDetailsApiInterface } from '../types';

export class ImageDetailsApi implements ImageDetailsApiInterface {
  public fetchImageDetails = (id: Image['id']) => {
    const uri = RESOURCES.images.getOne.replace(':id', id);

    return fetch(`${RESOURCES_URL}${uri}`);
  };

  public deleteImage = (id: Image['id']) => {
    const uri = RESOURCES.images.deleteOne.replace(':id', id);

    return fetch(`${RESOURCES_URL}${uri}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  public editImageDetails = (image: Image) => {
    const uri = RESOURCES.images.editOne.replace(':id', image.id);

    return fetch(`${RESOURCES_URL}${uri}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(image),
    });
  };
}
