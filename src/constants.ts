export enum RoutesEnum {
  Images = '/images',
  ImageDetails = '/images/:id',
  FAQ = '/faq',
}

export const RESOURCES_URL = 'http://localhost:3333';
export const RESOURCES = {
  images: {
    all: '/images',
    getOne: '/images/:id',
  },
};
