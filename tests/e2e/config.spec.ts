import { Test } from '@nestjs/testing';
import { resolve } from 'path';
import { ConfigModule, ConfigService } from '../../lib';

describe('Config service', () => {
  let configService: ConfigService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          configDir: [
            resolve(__dirname, '..', 'config'),
            resolve(__dirname, '..', 'config1'),
          ],
        }),
      ],
    }).compile();

    configService = module.get(ConfigService, { strict: false });
  });

  it('should return foo values', () => {
    const foo = configService.get('foo');
    const foo1 = configService.get('foo1');
    expect(foo).toEqual('bar');
    expect(foo1).toEqual('bar1');
  });
});
