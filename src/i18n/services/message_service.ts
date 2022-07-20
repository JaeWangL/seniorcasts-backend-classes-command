import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ValidationError } from 'class-validator';
import { isArray } from 'class-validator';
import { I18nService } from 'nestjs-i18n';
import type { IErrors } from 'src/utils/error/error.interface';
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

  getRequestErrorsMessage(
    requestErrors: ValidationError[],
    customLanguages?: string[]
  ): IErrors[] {
    const messages: Array<IErrors[]> = [];

    requestErrors.forEach(async (transfomer) => {
      let { children } = transfomer;
      let constraints: string[] = Object.keys(transfomer.constraints || []);
      const errors: IErrors[] = [];
      let { property } = transfomer;
      let propertyValue: string = transfomer.value;

      if (children.length > 0) {
        while (children.length > 0) {
          for (const child of children) {
            property = `${property}.${child.property}`;

            if (child.children && child.children.length > 0) {
              children = child.children;
              break;
            } else if (child.constraints) {
              constraints = Object.keys(child.constraints);
              children = [];
              propertyValue = child.value;
              break;
            }
          }
        }
      }

      constraints.forEach(async (constraint) => {
        errors.push({
          property,
          message: (await this.get(`request.${constraint}`, {
            customLanguages,
            properties: {
              property,
              value: propertyValue,
            },
          })) as string,
        });
      });

      messages.push(errors);
    });

    return messages.flat(1);
  }

  async get(
    key: string,
    options?: IMessageOptions
  ): Promise<string | IMessage> {
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
      for (const customLanguage of customLanguages) {
        messages[customLanguage] = await this.setMessage(customLanguage, key, {
          properties,
        });
      }

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
  ): any {
    return this.i18n.translate(key, {
      lang,
      args: options && options.properties ? options.properties : undefined,
    });
  }

  getLanguages(): string[] {
    return Object.values(I18nLanguages);
  }
}
