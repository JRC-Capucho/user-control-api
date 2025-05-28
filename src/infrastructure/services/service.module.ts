import { Module } from '@nestjs/common'
import { HashService } from 'src/domain/interfaces/hash.service.interface'
import { BcryptHashService } from './bcrypt-hash.service'
import { EncrypterService } from 'src/domain/interfaces/encrypter.service.interface'
import { JwtEncrypterService } from './jwt-encrypter.service'

@Module({
  providers: [
    {
      provide: HashService,
      useClass: BcryptHashService,
    },
    {
      provide: EncrypterService,
      useClass: JwtEncrypterService,
    },
  ],
  exports: [HashService, EncrypterService],
})
export class ServiceModule {}
