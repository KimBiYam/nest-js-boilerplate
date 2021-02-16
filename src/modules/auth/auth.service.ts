import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { User, UserService } from 'src/modules/user';
import LoginPayload from './payload/login.payload';
import { JwtService } from '@nestjs/jwt';
import { HashUtil } from 'src/util/hashUtil.ts';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createToekn(user: User) {
    return {
      accessToken: this.jwtService.sign({ id: user.userId }),
      user,
    };
  }

  async validateUser(@Body() loginPayload: LoginPayload): Promise<any> {
    const { userId, password } = loginPayload;
    const user = await this.userService.findOneByUserId(userId);
    if (!user || !HashUtil.compare(password, user.password)) {
      throw new BadRequestException('Bad Reqeust');
    }
    return user;
  }
}
