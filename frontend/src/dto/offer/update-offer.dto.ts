import { CityName, Type, Location } from '../../types/types';

export default class UpdateOfferDTO {
  public title?: string;
  public description?: string;
  public city?: CityName;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public type?: Type;
  public bedrooms?: number;
  public maxAdults?: number;
  public price?: number;
  public goods?: string[];
  public location?: Location;
}
