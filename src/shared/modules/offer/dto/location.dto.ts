import { IsNumber } from 'class-validator';

export class LocationDTO {
  @IsNumber()
  public latitude!: number;

  @IsNumber()
  public longitude!: number;
}
