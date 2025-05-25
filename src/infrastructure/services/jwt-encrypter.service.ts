import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { EncrypterService } from 'src/domain/interfaces/encrypter.service.interface'

@Injectable()
export class JwtEncrypterService implements EncrypterService {
  constructor(private jwtService: JwtService) {}

  encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload)
  }
}
