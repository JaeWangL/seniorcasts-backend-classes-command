import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isArray } from 'class-validator';
import { I18nService } from 'nestjs-i18n';
import { I18nLanguages } from '../i18n_constants';
import type {
  IMessage,
  IMessageOptions,
  IMessageSetOptions,
} from '../i18n_interfaces';

@Injectable()
export class MessageService {
  private readonly defaultLanguage: string;

  constructor(
    private readonly i18n: I18nService,
    private readonly configService: ConfigService
  ) {
    this.defaultLanguage = this.configService.get<string>('app.language')!;
  }

  get(key: string, options?: IMessageOptions): string | IMessage {
    const { properties, customLanguages } = options || {
      properties: undefined,
      customLanguages: undefined,
    };

    if (
      customLanguages &&
      isArray(customLanguages) &&
      customLanguages.length > 0
    ) {
      const messages: IMessage = {};
      customLanguages.forEach((customLanguage) => {
        messages[customLanguage] = this.setMessage(customLanguage, key, {
          properties,
        });
      });

      if (Object.keys(messages).length === 1) {
        return messages[customLanguages[0]];
      }

      return messages;
    }

    return this.setMessage(this.defaultLanguage, key, {
      properties,
    });
  }

  private setMessage(
    lang: string,
    key: string,
    options?: IMessageSetOptions
  ): string {
    return this.i18n.translate<string>(key, {
      lang,
      args: options && options.properties ? options.properties : undefined,
    });
  }

  getLanguages(): string[] {
    return Object.values(I18nLanguages);
  }
}
