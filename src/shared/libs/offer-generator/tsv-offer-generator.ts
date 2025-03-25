import dayjs from 'dayjs';

import { City, MockServerData } from '../../types/index.js';
import { OfferGenerator } from './offer-generator.interface.js';
import { generateRandomValue, getRandomBoolean, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { SEPARATOR } from '../../constant/index.js';
import { OFFER } from '../../modules/offer/offer.constant.js';

const DURATION_TIME = 'day';

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
    const images = getRandomItems<string>(this.mockData.previewImages, true).join(SEPARATOR.SEMICOLON);
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean(false);
    const type = getRandomItem(this.mockData.types);
    const bedrooms = generateRandomValue(OFFER.BEDROOMS.MIN, OFFER.BEDROOMS.MAX);
    const maxAdults = generateRandomValue(OFFER.MAX_ADULTS.MIN, OFFER.MAX_ADULTS.MAX);
    const price = generateRandomValue(OFFER.PRICE.MIN, OFFER.PRICE.MAX).toString();
    const goods = getRandomItems<string>(this.mockData.goods).join(SEPARATOR.SEMICOLON);
    const name = getRandomItem(this.mockData.authors);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatarPaths);
    const userType = getRandomItem(this.mockData.userTypes);

    const date = dayjs()
      .subtract(generateRandomValue(WEEKDAY.FIRST, WEEKDAY.LAST), DURATION_TIME)
      .toISOString();

    const user = [name, email, avatar, userType].join(SEPARATOR.SEMICOLON);
    const location = [city.location.latitude, city.location.longitude].join(SEPARATOR.SEMICOLON);

    return [
      title,
      description,
      date,
      city.name,
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
      location,
    ].join(SEPARATOR.TAB);
  }
}
