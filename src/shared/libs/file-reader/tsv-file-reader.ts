import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer, OfferType, UserType, Location, Goods, City, CityName } from '../../types/index.js';
import { DECIMAL_RADIX, ENCODING_DEFAULT, SEPARATOR } from '../../constant/index.js';
import { EventName } from '../../../cli/types/index.js';
import { UserWithPassword } from '../../types/user.type.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384;

  constructor(
    private readonly filename: string
  ) {
    super();
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      createdDate,
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
    ] = line.split(SEPARATOR.TAB);

    return {
      title,
      description,
      createdDate: new Date(createdDate),
      city: this.parseCityLocation(cityLocation),
      previewImage,
      images: this.parseStringToArray<string[]>(images),
      isPremium: this.parseToBoolean(isPremium),
      isFavorite: this.parseToBoolean(isFavorite),
      type: type as OfferType,
      bedrooms: this.parseStringToNumber(bedrooms),
      maxAdults: this.parseStringToNumber(maxAdults),
      price: this.parseStringToNumber(price),
      goods: this.parseStringToArray<Goods[]>(goods),
      author: this.parseAuthor(user),
      location: this.parseOfferLocation(offerLocation),
    };
  }

  private parseStringToArray<T>(value: string): T {
    return value.split(SEPARATOR.SEMICOLON) as T;
  }

  private parseStringToNumber(value: string): number {
    return Number.parseInt(value, DECIMAL_RADIX);
  }

  private parseToBoolean(value: string): boolean {
    return value === 'true';
  }

  private parseCityLocation(location: string): City {
    const [city, latitude, longitude] = location.split(SEPARATOR.SEMICOLON);
    return {
      name: city as CityName,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      }
    };
  }

  private parseOfferLocation(location: string): Location {
    const [latitude, longitude] = location.split(SEPARATOR.SEMICOLON);
    return {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };
  }

  private parseAuthor(user: string): UserWithPassword {
    const [name, email, password, avatarPath, type] = user.split(SEPARATOR.SEMICOLON);
    return {name, email, password, avatarPath, type: type as UserType};
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: ENCODING_DEFAULT,
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf(SEPARATOR.ROW)) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        await new Promise((resolve) => {
          this.emit(EventName.Line, parsedOffer, resolve);
        });
      }
    }

    this.emit(EventName.End, importedRowCount);
  }
}
