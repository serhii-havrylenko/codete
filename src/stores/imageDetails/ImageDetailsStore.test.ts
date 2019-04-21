import { GalleryModel } from '../../models';
import { ImageDetailsApi } from './ImageDetailsApi';
import { ImageDetailsStore } from './ImageDetailsStore';

describe('ImagesStore tests', () => {
  const modelMock = ({
    activeImageId: 'id-1',
  } as unknown) as GalleryModel;
  let apiMock: ImageDetailsApi;
  let store: ImageDetailsStore;

  beforeEach(() => {
    apiMock = {
      fetchImageDetails: jest.fn(() => Promise.reject()),
    };
    store = new ImageDetailsStore(apiMock, modelMock);
  });

  test('should return proper images', () => {
    expect(store.images).toEqual(modelMock.images);
  });

  test('should call fetch from API when requests', async () => {
    await store.fetchImages();

    expect(apiMock.fetchImageDetails).toHaveBeenCalledTimes(1);
  });
});
