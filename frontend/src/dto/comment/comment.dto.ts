import UserDTO from '../user/user.dto';

export default class CommentDTO {
  public id!: string;
  public comment!: string;
  public postDate!: string;
  public rating!: number;
  public user!: UserDTO;
}
