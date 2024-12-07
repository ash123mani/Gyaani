import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserId } from '@qj/shared';

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
    const user = this.users.get(userId);

    if (user) return user;

    throw new NotFoundException({
      title: 'User Not Found',
      status: HttpStatus.NOT_FOUND,
      detail: `User with id '${userId}' was not found`,
    });
  }

  removeUserById(userId: UserId): void {
    const userExists = this.getUserById(userId);
    if (userExists) this.users.delete(userId);
  }
}
