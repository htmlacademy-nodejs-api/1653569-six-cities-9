import { City } from './city.type.js';
import { Goods } from './goods.enum.js';
import { OfferType } from './offer-type.enum.js';

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
  passwords: string[];
  userTypes: string[];
};
