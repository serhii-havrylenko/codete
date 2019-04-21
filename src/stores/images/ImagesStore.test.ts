import { ImagesApi } from './ImagesApi';
import { ImagesStore } from './ImagesStore';

describe('ImagesStore tests', () => {
  const modelMock = {
    images: [
      {
        id: 'id-1',
        title: 'I, the Mask',
      },
      {
        id: 'id-33',
        title: 'I, the Mask 33',
      },
      {
        id: 'id-2',
        title: 'The End',
      },
    ],
  };
  let apiMock: ImagesApi;
  let store: ImagesStore;

  beforeEach(() => {
    apiMock = {
      fetchImages: jest.fn(() => Promise.reject()),
    };
    store = new ImagesStore(apiMock, modelMock);
  });

  test('should return proper images', () => {
    expect(store.images).toEqual(modelMock.images);
  });

  test('should call fetch from API when requests', async () => {
    await store.fetchImages();

    expect(apiMock.fetchImages).toHaveBeenCalledTimes(1);
  });
});
