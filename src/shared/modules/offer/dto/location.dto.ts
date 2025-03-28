import { IsLatitude, IsLongitude } from 'class-validator';

export class LocationDTO {
  @IsLatitude()
  public latitude!: number;

  @IsLongitude()
  public longitude!: number;
}
