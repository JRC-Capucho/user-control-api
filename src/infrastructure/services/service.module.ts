import { Module } from '@nestjs/common';
import { HashService } from 'src/domain/interfaces/hash.service.interface';
import { BcryptHashService } from './hash.service';

@Module({
  providers: [
    {
      provide: HashService,
      useClass: BcryptHashService,
    },
  ],
  exports: [HashService],
})
export class ServiceModule {}
