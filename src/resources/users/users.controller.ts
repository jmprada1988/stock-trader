import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@dataui/crud';
import { User } from '@app/resources/users/entities/user.entity';

@Crud({
  model: { type: User},
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  dto: {
    create: User, update: User
  },
  serialize: {
    create: User, get: User, update: User, replace: User, getMany: User
  }
})

@Controller('users')
@ApiTags('Users')
export class UsersController implements CrudController<User>{
  constructor(public readonly service: UsersService) {}
}
