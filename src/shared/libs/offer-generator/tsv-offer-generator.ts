import dayjs from 'dayjs';
import { City, MockServerData } from '../../types/index.js';
import { OfferGenerator } from './offer-generator.interface.js';
import { generateRandomValue, getRandomBoolean, getRandomItem, getRandomItems } from '../../helpers/index.js';

const Weekday = {
  FIRST: 1,
  LAST: 7
} as const;

const Rating = {
  MIN: 1,
  MAX: 5
} as const;

const Bedrooms = {
  MIN: 1,
  MAX: 8
} as const;

const MaxAdults = {
  MIN: 1,
  MAX: 10
} as const;

const Price = {
  MIN: 100,
  MAX: 1000
} as const;

const Comments = {
  MIN: 0,
  MAX: 10
} as const;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<City>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.previewImages, true).join(';');
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean();
    const rating = generateRandomValue(Rating.MIN, Rating.MAX);
    const type = getRandomItem(this.mockData.types);
    const bedrooms = generateRandomValue(Bedrooms.MIN, Bedrooms.MAX);
    const maxAdults = generateRandomValue(MaxAdults.MIN, MaxAdults.MAX);
    const price = generateRandomValue(Price.MIN, Price.MAX).toString();
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const comments = generateRandomValue(Comments.MIN, Comments.MAX);
    const name = getRandomItem(this.mockData.authors);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatarPaths);
    const userType = getRandomItem(this.mockData.userTypes);

    const date = dayjs()
      .subtract(generateRandomValue(Weekday.FIRST, Weekday.LAST), 'day')
      .toISOString();

    const user = [name, email, avatar, userType].join(';');
    const location = [city.location.latitude, city.location.longitude].join(';');

    return [
      title,
      description,
      date,
      city.name,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      user,
      comments,
      location,
    ].join('\t');
  }
}
