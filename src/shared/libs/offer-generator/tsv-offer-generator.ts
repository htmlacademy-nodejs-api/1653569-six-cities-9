import dayjs from 'dayjs';

import { City, MockServerData } from '../../types/index.js';
import { OfferGenerator } from './offer-generator.interface.js';
import { generateRandomValue, getRandomBoolean, getRandomItem, getRandomItems, getRandomItemShift } from '../../helpers/index.js';
import { SEPARATOR } from '../../constant/index.js';
import { OFFER } from '../../modules/offer/offer.constant.js';
import { CITY_LOCATION } from '../../constant/common.constant.js';

const DURATION_TIME = 'day';
const LOCATION_SHIFT = 0.01;

const WEEKDAY = {
  FIRST: 1,
  LAST: 7
} as const;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<City>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.images, true).join(SEPARATOR.SEMICOLON);
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean(false);
    const type = getRandomItem(this.mockData.types);
    const bedrooms = generateRandomValue(OFFER.BEDROOMS.MIN, OFFER.BEDROOMS.MAX);
    const maxAdults = generateRandomValue(OFFER.MAX_ADULTS.MIN, OFFER.MAX_ADULTS.MAX);
    const price = generateRandomValue(OFFER.PRICE.MIN, OFFER.PRICE.MAX).toString();
    const goods = getRandomItems<string>(this.mockData.goods).join(SEPARATOR.SEMICOLON);
    const name = getRandomItem(this.mockData.authors);
    const email = getRandomItem(this.mockData.emails);
    const password = getRandomItem(this.mockData.passwords);
    const avatar = getRandomItem(this.mockData.avatars);
    const userType = getRandomItem(this.mockData.userTypes);

    const date = dayjs()
      .subtract(generateRandomValue(WEEKDAY.FIRST, WEEKDAY.LAST), DURATION_TIME)
      .toISOString();

    const cityLocation = [
      city.name,
      CITY_LOCATION[city.name].latitude,
      CITY_LOCATION[city.name].longitude
    ].join(SEPARATOR.SEMICOLON);

    const offerLocation = [
      getRandomItemShift(city.location.latitude, LOCATION_SHIFT),
      getRandomItemShift(city.location.longitude, LOCATION_SHIFT)
    ].join(SEPARATOR.SEMICOLON);

    const user = [name, email, password, avatar, userType].join(SEPARATOR.SEMICOLON);

    return [
      title,
      description,
      date,
      cityLocation,
      previewImage,
      images,
      isPremium,
      isFavorite,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      user,
      offerLocation,
    ].join(SEPARATOR.TAB);
  }
}
