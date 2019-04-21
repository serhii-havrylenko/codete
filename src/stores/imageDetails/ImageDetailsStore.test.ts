import { GalleryModel } from '../../models';
import { ImageDetailsApi } from './ImageDetailsApi';
import { ImageDetailsStore } from './ImageDetailsStore';

describe('ImagesStore tests', () => {
  const modelMock = ({
    images: [],
    activeImageId: 'id-1',
    activeImage: {
      id: '2',
      title: 'Image 2',
      created: 1555853945381,
      details: 'details',
      author: 'Rob',
      src: 'https://via.placeholder.com/150',
    },
  } as unknown) as GalleryModel;
  let apiMock: ImageDetailsApi;
  let store: ImageDetailsStore;

  beforeEach(() => {
    apiMock = {
      fetchImageDetails: jest.fn(() => Promise.reject()),
      deleteImage: jest.fn(),
      editImageDetails: jest.fn(),
    };
    store = new ImageDetailsStore(apiMock, modelMock);
  });

  test('should return proper image', () => {
    expect(store.image).toEqual(modelMock.activeImage);
  });

  test('should call fetch from API when requests', async () => {
    await store.fetchImageDetails();

    expect(apiMock.fetchImageDetails).toHaveBeenCalledTimes(1);
  });
});
