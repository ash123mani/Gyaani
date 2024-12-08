import { SocketId, User as IUser, UserId, UserName } from '../../../../../shared';

export class User implements IUser {
  public userId: UserId;
  public userName: UserName;
  public socketId: SocketId;

  constructor(attrs: IUser) {
    this.userId = attrs.userId;
    this.socketId = attrs.socketId;
    this.userName = attrs.userName;
  }
}
