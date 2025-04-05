import { IsEnum, IsObject, ValidateNested } from 'class-validator';
import { CityName } from '../../../types/index.js';
import { Type } from 'class-transformer';
import { LocationDTO } from './location.dto.js';
import { OFFER_VALIDATION_MESSAGE } from './offer-validation.messages.js';

export class CityDTO {
	@IsEnum(CityName, { message: OFFER_VALIDATION_MESSAGE.TYPE.INVALID_FORMAT })
  public name!: CityName;

  @ValidateNested()
  @IsObject({message: OFFER_VALIDATION_MESSAGE.LOCATION.INVALID_FORMAT })
  @Type(() => LocationDTO)
	public location!: LocationDTO;
}
