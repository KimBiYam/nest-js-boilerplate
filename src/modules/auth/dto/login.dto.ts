import { PickType } from '@nestjs/swagger';
import { User } from '../../../entities';

export class LoginDto extends PickType(User, ['userId', 'password']) {}
