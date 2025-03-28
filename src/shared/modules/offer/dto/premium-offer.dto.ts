import { IsEnum } from 'class-validator';
import { CityName } from '../../../types/index.js';

export class PremiumOfferDTO {
  @IsEnum(CityName)
  public city!: CityName;
}
