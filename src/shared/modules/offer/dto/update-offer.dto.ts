import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { OFFER } from '../offer.constant.js';
import { OFFER_VALIDATION_MESSAGE } from './offer-validation.messages.js';
import { Goods, OfferType } from '../../../types/index.js';
import { LocationDTO } from './location.dto.js';
import { CityDTO } from './city.dto.js';

export class UpdateOfferDTO {
  @IsOptional()
  @IsString()
  @MinLength(OFFER.TITLE_LENGTH.MIN, { message: OFFER_VALIDATION_MESSAGE.TITLE.MIN_LENGTH })
  @MaxLength(OFFER.TITLE_LENGTH.MAX, { message: OFFER_VALIDATION_MESSAGE.TITLE.MAX_LENGTH })
  public title?: string;

  @IsOptional()
  @IsString()
  @MinLength(OFFER.DESCRIPTION_LENGTH.MIN, { message: OFFER_VALIDATION_MESSAGE.DESCRIPTION.MIN_LENGTH })
  @MaxLength(OFFER.DESCRIPTION_LENGTH.MAX, { message: OFFER_VALIDATION_MESSAGE.DESCRIPTION.MAX_LENGTH })
  public description?: string;

  @IsOptional()
  @IsObject({ message: OFFER_VALIDATION_MESSAGE.CITY.INVALID_FORMAT })
  @Type(() => CityDTO)
  public city?: CityDTO;

  @IsOptional()
  @IsUrl({}, { message: OFFER_VALIDATION_MESSAGE.PREVIEW_IMAGE.INVALID_FORMAT })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: OFFER_VALIDATION_MESSAGE.IMAGES.INVALID_FORMAT })
  @ArrayMinSize(OFFER.COUNT.IMAGES, { message: OFFER_VALIDATION_MESSAGE.IMAGES.INVALID_ARRAY_COUNT })
  @ArrayMaxSize(OFFER.COUNT.IMAGES, { message: OFFER_VALIDATION_MESSAGE.IMAGES.INVALID_ARRAY_COUNT })
  @IsUrl({}, { each: true, message: OFFER_VALIDATION_MESSAGE.IMAGES.INVALID_FORMAT_ITEM })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: OFFER_VALIDATION_MESSAGE.IS_PREMIUM.INVALID_FORMAT })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(OfferType, { message: OFFER_VALIDATION_MESSAGE.TYPE.INVALID_FORMAT })
  public type?: OfferType;

  @IsOptional()
  @IsInt({ message: OFFER_VALIDATION_MESSAGE.BEDROOMS.INVALID_FORMAT })
  @Min(OFFER.BEDROOMS.MIN, { message: OFFER_VALIDATION_MESSAGE.BEDROOMS.MIN_VALUE })
  @Max(OFFER.BEDROOMS.MAX, { message: OFFER_VALIDATION_MESSAGE.BEDROOMS.MAX_VALUE })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: OFFER_VALIDATION_MESSAGE.MAX_ADULTS.INVALID_FORMAT })
  @Min(OFFER.MAX_ADULTS.MIN, { message: OFFER_VALIDATION_MESSAGE.MAX_ADULTS.MIN_VALUE })
  @Max(OFFER.MAX_ADULTS.MAX, { message: OFFER_VALIDATION_MESSAGE.MAX_ADULTS.MAX_VALUE })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: OFFER_VALIDATION_MESSAGE.PRICE.INVALID_FORMAT })
  @Min(OFFER.PRICE.MIN, { message: OFFER_VALIDATION_MESSAGE.PRICE.MIN_VALUE })
  @Max(OFFER.PRICE.MAX, { message: OFFER_VALIDATION_MESSAGE.PRICE.MAX_VALUE })
  public price?: number;

  @IsOptional()
  @IsArray({ message: OFFER_VALIDATION_MESSAGE.GOODS.INVALID_FORMAT })
  @IsEnum(Goods, { each: true, message: OFFER_VALIDATION_MESSAGE.GOODS.INVALID_FORMAT_ITEM })
  public goods?: Goods[];

  @IsOptional()
  @ValidateNested()
  @IsObject({ message: OFFER_VALIDATION_MESSAGE.LOCATION.INVALID_FORMAT })
  @Type(() => LocationDTO)
  public location?: LocationDTO;
}
