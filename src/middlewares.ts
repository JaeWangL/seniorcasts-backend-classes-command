import type { NestFastifyApplication } from '@nestjs/platform-fastify';

export async function setupMiddlewaresAsync(
  app: NestFastifyApplication
): Promise<void> {
  await app.register(import('@fastify/compress'), { global: true });
  await app.register(import('@fastify/helmet'), {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  // If you are not going to use CSP at all, you can use this:
  await app.register(import('@fastify/helmet'), {
    contentSecurityPolicy: false,
  });
}
