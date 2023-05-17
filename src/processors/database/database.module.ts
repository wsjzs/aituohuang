import { Global, Module } from '@nestjs/common'

import { ConfigModel } from '~/modules/configs/configs.model'
import { PostModel } from '~/modules/post/post.model'
import { getProviderByTypegooseClass } from '~/transformers/model.transformer'

import { UserModel } from '../../modules/user/user.model'
import { databaseProvider } from './database.provider'
import { DatabaseService } from './database.service'

const models = [UserModel, PostModel, ConfigModel].map((model) =>
  getProviderByTypegooseClass(model),
)
@Module({
  providers: [DatabaseService, databaseProvider, ...models],
  exports: [DatabaseService, databaseProvider, ...models],
})
@Global()
export class DatabaseModule {}
