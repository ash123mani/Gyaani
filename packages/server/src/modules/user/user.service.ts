import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserId } from '../../../../shared';

@Injectable()
export class UserService {
  private users: Map<UserId, User> = new Map();

  addUser(user: User): void {
    const userExists = this.getUserById(user.userId);
    if (!userExists) {
      const newUser = new User(user);
      this.users.set(user.userId, newUser);
    }
  }

  getUserById(userId: UserId): User {
    return this.users.get(userId);
  }

  removeUserById(userId: UserId): void {
    const userExists = this.getUserById(userId);
    if (userExists) this.users.delete(userId);
  }
}
