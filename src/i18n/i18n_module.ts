import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HeaderResolver, I18nJsonLoader, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { I18nLanguages } from './i18n_constants';
import { MessageService } from './services/message_service';

@Global()
@Module({
  providers: [MessageService],
  exports: [MessageService],
  imports: [
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get<string>('app.language')!,
        fallbacks: Object.values(I18nLanguages).reduce(
          (a, v) => ({ ...a, [`${v}-*`]: v }),
          {}
        ),
        loaderOptions: {
          path: path.join(__dirname, '/languages/'),
          watch: true,
        },
      }),
      loader: I18nJsonLoader,
      inject: [ConfigService],
      resolvers: [new HeaderResolver(['x-custom-lang'])],
    }),
  ],
  controllers: [],
})
export class MessageModule {}
