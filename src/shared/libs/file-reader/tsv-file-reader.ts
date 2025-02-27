import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { User, Offer, OfferType, CityName, UserType, Location, Goods } from '../../types/index.js';

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
      city,
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
      commentCount,
      location,
    ] = line.split('\t');

    return {
      title,
      description,
      createdDate: new Date(createdDate),
      city: city as CityName,
      previewImage,
      images: this.parseStringToArray<string[]>(images),
      isPremium: this.parseToBoolean(isPremium),
      isFavorite: this.parseToBoolean(isFavorite),
      rating: this.parseStringToNumber(rating),
      type: type as OfferType,
      bedrooms: this.parseStringToNumber(bedrooms),
      maxAdults: this.parseStringToNumber(maxAdults),
      price: this.parseStringToNumber(price),
      goods: this.parseStringToArray<Goods[]>(goods),
      author: this.parseAuthor(user),
      commentCount: this.parseStringToNumber(commentCount),
      location: this.parseLocation(location),
    };
  }

  private parseStringToArray<T>(value: string): T {
    return value.split(';') as T;
  }

  private parseStringToNumber(value: string): number {
    return Number.parseInt(value, 10);
  }

  private parseToBoolean(value: string): boolean {
    return value === 'true';
  }

  private parseLocation(location: string): Location {
    const [latitude, longitude] = location.split(';');
    return {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };
  }

  private parseAuthor(user: string): User {
    const [name, email, avatarPath, type] = user.split(';');
    return {name, email, avatarPath, type: type as UserType};
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        await new Promise((resolve) => {
          this.emit('line', parsedOffer, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
