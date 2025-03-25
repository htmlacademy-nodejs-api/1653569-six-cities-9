import { IsOptional, Min, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { OFFER } from '../offer.constant.js';

export class OfferCountDTO {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(OFFER.COUNT.MIN)
  public count!: number;
}
