import { GalleryModel } from '../../models';
import { ImageDetailsApi } from './ImageDetailsApi';
import { ImageDetailsStore } from './ImageDetailsStore';

describe('ImagesStore tests', () => {
  let modelMock: GalleryModel;
  let apiMock: ImageDetailsApi;
  let store: ImageDetailsStore;

  beforeEach(() => {
    modelMock = {
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
    };
    apiMock = {
      fetchImageDetails: jest.fn().mockRejectedValue({}),
      deleteImage: jest.fn(),
      editImageDetails: jest.fn(),
    };
    store = new ImageDetailsStore(apiMock, modelMock);
  });

  test('should return proper active image ID', () => {
    expect(store.imageId).toEqual(modelMock.activeImageId);
  });

  test('should return proper active image', () => {
    expect(store.image).toEqual(modelMock.activeImage);
  });

  describe('setActiveImage', () => {
    test('should set active id', () => {
      const id = 'foooo';
      store.setActiveImage(id);
      expect(modelMock.activeImageId).toBe(id);
    });

    test('should set active image to null', () => {
      store.setActiveImage('');
      expect(modelMock.activeImage).toBe(null);
    });

    test('should call fetchImageDetails after setting active id', () => {
      const spy = jest.spyOn(store, 'fetchImageDetails').mockResolvedValue();

      store.setActiveImage('');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchImageDetails', () => {
    test('should not call fetch from API when requests no activeId ', async () => {
      modelMock.activeImageId = null;
      await store.fetchImageDetails();

      expect(apiMock.fetchImageDetails).toHaveBeenCalledTimes(0);
    });

    test('should call fetch from API when requests', async () => {
      await store.fetchImageDetails();

      expect(apiMock.fetchImageDetails).toHaveBeenCalledTimes(1);
      expect(apiMock.fetchImageDetails).toHaveBeenCalledWith(
        modelMock.activeImageId,
      );
    });

    test('should call onFetchImageDetailsData when fetched data', async () => {
      const spy = jest.spyOn(store, 'onFetchImageDetailsData');
      const response = ({ status: 200 } as unknown) as Response;
      apiMock.fetchImageDetails = jest.fn().mockResolvedValueOnce(response);

      await store.fetchImageDetails();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(response);
    });

    test('should call onFetchResults when fetched data successfully', async () => {
      const response = { id: 'test image' };
      jest
        .spyOn(store, 'onFetchImageDetailsData')
        .mockResolvedValueOnce(response);
      apiMock.fetchImageDetails = jest.fn().mockResolvedValueOnce({});
      const spy = jest.spyOn(store, 'onFetchResults');

      await store.fetchImageDetails();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(response);
    });

    test('should set active image to null when cannot fetch', async () => {
      await store.fetchImageDetails();
      expect(modelMock.activeImage).toBe(null);
    });

    test('should set active image to null when not successfull response', async () => {
      apiMock.fetchImageDetails = jest
        .fn()
        .mockResolvedValueOnce({ status: 404 });

      await store.fetchImageDetails();

      expect(modelMock.activeImage).toBe(null);
    });
  });

  describe('deleteImage', () => {
    test('should not call delete from api when active id is not defined', () => {
      modelMock.activeImageId = null;

      store.deleteImage();

      expect(apiMock.deleteImage).toHaveBeenCalledTimes(0);
    });

    test('should call delete from api with proper id', () => {
      store.deleteImage();

      expect(apiMock.deleteImage).toHaveBeenCalledTimes(1);
      expect(apiMock.deleteImage).toHaveBeenCalledWith(modelMock.activeImageId);
    });
  });

  describe('editTitle', () => {
    test('should not call edit from api when active id is not defined', () => {
      modelMock.activeImageId = null;

      store.editTitle('');

      expect(apiMock.editImageDetails).toHaveBeenCalledTimes(0);
    });

    test('should not call edit from api when active image is not defined', () => {
      modelMock.activeImage = null;

      store.editTitle('');

      expect(apiMock.editImageDetails).toHaveBeenCalledTimes(0);
    });

    test('should not call edit from api when passed empty title', () => {
      store.editTitle('');

      expect(apiMock.editImageDetails).toHaveBeenCalledTimes(0);
    });

    test('should call edit from api with proper image details', () => {
      const title = 'new title';
      store.editTitle(title);

      expect(apiMock.editImageDetails).toHaveBeenCalledTimes(1);
      expect(apiMock.editImageDetails).toHaveBeenCalledWith({
        ...modelMock.activeImage,
        title,
      });
    });
  });
});
