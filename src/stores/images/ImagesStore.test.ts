import { GalleryModel } from '../../models';
import { ImagesApi } from './ImagesApi';
import { ImagesStore } from './ImagesStore';

describe('ImagesStore tests', () => {
  let modelMock: GalleryModel;
  let apiMock: ImagesApi;
  let store: ImagesStore;

  beforeEach(() => {
    modelMock = {
      images: [
        {
          id: '2',
          title: 'Image 2',
          created: 1555853945381,
          details: 'details',
          author: 'Rob',
          src: 'https://via.placeholder.com/150',
        },
      ],
      activeImageId: null,
      activeImage: null,
    };
    apiMock = {
      fetchImages: jest.fn().mockRejectedValue(null),
    };
    store = new ImagesStore(apiMock, modelMock);
  });

  test('should return proper images', () => {
    expect(store.images).toEqual(modelMock.images);
  });

  describe('fetchImages', () => {
    test('should call fetch from API when requests', async () => {
      await store.fetchImages();

      expect(apiMock.fetchImages).toHaveBeenCalledTimes(1);
    });

    test('should call onFetchImagesData when fetched data', async () => {
      const spy = jest.spyOn(store, 'onFetchImagesData');
      const response = ({ status: 200 } as unknown) as Response;
      apiMock.fetchImages = jest.fn().mockResolvedValueOnce(response);

      await store.fetchImages();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(response);
    });

    test('should call onFetchResults when fetched data successfully', async () => {
      const response = [{ id: 'test image' }];
      jest.spyOn(store, 'onFetchImagesData').mockResolvedValueOnce(response);
      apiMock.fetchImages = jest.fn().mockResolvedValueOnce(null);
      const spy = jest.spyOn(store, 'onFetchResults');

      await store.fetchImages();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(response);
    });

    test('should set images to null when cannot fetch', async () => {
      await store.fetchImages();
      expect(modelMock.images).toBe(null);
    });

    test('should set images to null when not successfull response', async () => {
      apiMock.fetchImages = jest.fn().mockResolvedValueOnce({ status: 404 });

      await store.fetchImages();

      expect(modelMock.images).toBe(null);
    });
  });
});
