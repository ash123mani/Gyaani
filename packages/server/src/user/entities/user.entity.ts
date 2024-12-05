import { SocketId, User as IUser, UserId, UserName } from '@qj/shared';

export class User implements IUser {
  constructor(attrs: IUser) {
    Object.assign(this, attrs);
  }

  userId: UserId;
  socketId: SocketId;
  userName: UserName;
}
