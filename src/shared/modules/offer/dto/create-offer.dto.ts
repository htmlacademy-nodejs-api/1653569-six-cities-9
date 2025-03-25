import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsObject,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested
} from 'class-validator';

import { OFFER } from '../offer.constant.js';
import { OFFER_VALIDATION_MESSAGE } from './offer-validation.messages.js';
import { CityName, Goods, OfferType } from '../../../types/index.js';
import { LocationDTO } from './location.dto.js';

export class CreateOfferDTO {
  @IsString()
  @MinLength(OFFER.TITLE_LENGTH.MIN, { message: OFFER_VALIDATION_MESSAGE.TITLE.MIN_LENGTH })
  @MaxLength(OFFER.TITLE_LENGTH.MAX, { message: OFFER_VALIDATION_MESSAGE.TITLE.MAX_LENGTH })
  public title!: string;

  @IsString()
  @MinLength(OFFER.DESCRIPTION_LENGTH.MIN, { message: OFFER_VALIDATION_MESSAGE.DESCRIPTION.MIN_LENGTH })
  @MaxLength(OFFER.DESCRIPTION_LENGTH.MAX, { message: OFFER_VALIDATION_MESSAGE.DESCRIPTION.MAX_LENGTH })
  public description!: string;

  @IsEnum(CityName, { message: OFFER_VALIDATION_MESSAGE.CITY.INVALID_FORMAT })
  public city!: CityName;

  @IsString()
  @IsUrl({}, { message: OFFER_VALIDATION_MESSAGE.PREVIEW_IMAGE.INVALID_FORMAT })
  public previewImage!: string;

  @IsArray({ message: OFFER_VALIDATION_MESSAGE.IMAGES.INVALID_FORMAT })
  @ArrayMinSize(OFFER.COUNT.IMAGES, { message: OFFER_VALIDATION_MESSAGE.IMAGES.INVALID_ARRAY_COUNT })
  @ArrayMaxSize(OFFER.COUNT.IMAGES, { message: OFFER_VALIDATION_MESSAGE.IMAGES.INVALID_ARRAY_COUNT })
  @IsUrl({}, { each: true, message: OFFER_VALIDATION_MESSAGE.IMAGES.INVALID_FORMAT_ITEM })
  public images: string[];

  @IsBoolean({ message: OFFER_VALIDATION_MESSAGE.IS_PREMIUM.INVALID_FORMAT })
  public isPremium!: boolean;

  @IsEnum(OfferType, { message: OFFER_VALIDATION_MESSAGE.TYPE.INVALID_FORMAT })
  public type!: OfferType;

  @IsInt({ message: OFFER_VALIDATION_MESSAGE.BEDROOMS.INVALID_FORMAT })
  @Min(OFFER.BEDROOMS.MIN, { message: OFFER_VALIDATION_MESSAGE.BEDROOMS.MIN_VALUE })
  @Max(OFFER.BEDROOMS.MAX, { message: OFFER_VALIDATION_MESSAGE.BEDROOMS.MAX_VALUE })
  public bedrooms: number;

  @IsInt({ message: OFFER_VALIDATION_MESSAGE.MAX_ADULTS.INVALID_FORMAT })
  @Min(OFFER.MAX_ADULTS.MIN, { message: OFFER_VALIDATION_MESSAGE.MAX_ADULTS.MIN_VALUE })
  @Max(OFFER.MAX_ADULTS.MAX, { message: OFFER_VALIDATION_MESSAGE.MAX_ADULTS.MAX_VALUE })
  public maxAdults!: number;

  @IsInt({ message: OFFER_VALIDATION_MESSAGE.PRICE.INVALID_FORMAT })
  @Min(OFFER.PRICE.MIN, { message: OFFER_VALIDATION_MESSAGE.PRICE.MIN_VALUE })
  @Max(OFFER.PRICE.MAX, { message: OFFER_VALIDATION_MESSAGE.PRICE.MAX_VALUE })
  public price!: number;

  @IsArray({ message: OFFER_VALIDATION_MESSAGE.GOODS.INVALID_FORMAT })
  @IsEnum(Goods, { each: true, message: OFFER_VALIDATION_MESSAGE.GOODS.INVALID_FORMAT_ITEM })
  @ArrayUnique<Goods>()
  public goods: Goods[];

  public userId!: string;

  @ValidateNested()
  @IsObject({ message: OFFER_VALIDATION_MESSAGE.LOCATION.INVALID_FORMAT })
  @Type(() => LocationDTO)
  public location!: LocationDTO;
}
