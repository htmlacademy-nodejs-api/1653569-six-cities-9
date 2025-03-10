import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { OfferValidationMessage } from './offer-validation.messages.js';
import { CityName, Goods, Location, OfferType } from '../../../types/index.js';
import { OfferValidation } from '../offer.constant.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(OfferValidation.title.minLength, { message: OfferValidationMessage.title.minLength })
  @MaxLength(OfferValidation.title.maxLength, { message: OfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(OfferValidation.description.minLength, { message: OfferValidationMessage.description.minLength })
  @MaxLength(OfferValidation.description.maxLength, { message: OfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: OfferValidationMessage.createdDate.invalidFormat })
  public createdDate?: Date;

  @IsOptional()
  @IsEnum(CityName, { message: OfferValidationMessage.city.invalidFormat })
  public city?: CityName;

  @IsOptional()
  @IsUrl({}, { message: OfferValidationMessage.previewImage.invalidFormat })
  public previewImage?: string;

  @IsOptional()
    @IsArray({ message: OfferValidationMessage.goods.invalidFormat })
    @ArrayMinSize(OfferValidation.images.count, { message: OfferValidationMessage.images.invalidArrayCount })
    @ArrayMaxSize(OfferValidation.images.count, { message: OfferValidationMessage.images.invalidArrayCount })
    @IsUrl({}, { each: true, message: OfferValidationMessage.images.invalidFormatItem })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: OfferValidationMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsInt({ message: OfferValidationMessage.rating.invalidFormat })
  public rating?: number;

  @IsOptional()
  @IsEnum(OfferType, { message: OfferValidationMessage.type.invalidFormat })
  public type?: OfferType;

  @IsOptional()
  @IsInt({ message: OfferValidationMessage.bedrooms.invalidFormat })
  @Min(OfferValidation.bedrooms.min, { message: OfferValidationMessage.bedrooms.minValue })
  @Max(OfferValidation.bedrooms.max, { message: OfferValidationMessage.bedrooms.maxValue })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: OfferValidationMessage.maxAdults.invalidFormat })
  @Min(OfferValidation.maxAdults.min, { message: OfferValidationMessage.maxAdults.minValue })
  @Max(OfferValidation.maxAdults.max, { message: OfferValidationMessage.maxAdults.maxValue })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: OfferValidationMessage.price.invalidFormat })
  @Min(OfferValidation.price.min, { message: OfferValidationMessage.price.minValue })
  @Max(OfferValidation.price.max, { message: OfferValidationMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: OfferValidationMessage.goods.invalidFormat })
  @IsEnum(Goods, { each: true, message: OfferValidationMessage.goods.invalidFormatItem })
  public goods?: Goods[];

  @IsOptional()
  @IsInt({ message: OfferValidationMessage.commentCount.invalidFormat })
  public commentCount?: number;

  @IsOptional()
  @IsObject({ message: OfferValidationMessage.location.invalidFormat })
  public location?: Location;
}
