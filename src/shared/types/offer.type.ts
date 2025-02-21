import { CityName } from './city-name.enum.js';
import { OfferType } from './offer-type.enum.js';
import { Goods } from './goods.enum.js';
import { User } from './user.type.js';
import { Location } from './location.type.js';

export type Offer = {
  title: string;
  description: string;
  createdDate: Date;
  city: CityName;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Goods[];
  author: User;
  commentCount: number;
  location: Location;
}
