import UserDTO from '../user/user.dto';
import { City, Location, Type } from '../../types/types';

export default class OfferDTO {
  public id!: string;
  public title!: string;
  public description!: string;
  public createdDate!: string;
  public city!: City;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public type!: Type;
  public bedrooms!: number;
  public maxAdults!: number;
  public price!: number;
  public goods!: string[];
  public commentCount!: number;
  public user!: UserDTO;
  public location!: Location;
}
