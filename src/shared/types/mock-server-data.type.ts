import { City, OfferType, Goods, UserType } from './index.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  cities: City[];
  previewImages: string[];
  types: OfferType[];
  goods: Goods[];
  authors: string[];
  emails: string[];
  avatarPaths: string[];
  userTypes: UserType[];
};
