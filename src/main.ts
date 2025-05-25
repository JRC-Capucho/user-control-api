import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvironmentService } from './infrastructure/config/environment.service'
import { Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(EnvironmentService)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  const port = configService.get('PORT')

  const config = new DocumentBuilder()
    .setTitle('User Control')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('swagger', app, documentFactory)

  await app.listen(port)

  Logger.log(`Start server in port ${port}`)
  Logger.log(`Swagger server in path http://localhost:${port}/swagger`)
}
bootstrap()
