import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/service/impl/user.service';
import { JwtPayload } from '../model/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.API_KEY,
    });
  }

  async validate(payload: JwtPayload) {
    const user = this.userService.findOne({ id: payload.id });
    if (!user) throw new HttpException('User not found', 401);
    return user;
  }
}
