import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import { IConfigSource } from 'config';
import { NODE_CONFIG } from './config.constants';
import { ConfigOptions } from './config.interfaces';
import { ConfigService } from './config.service';

@Global()
@Module({})
export class ConfigModule {
  private static readonly LOGGER = new Logger(ConfigModule.name);

  static forRoot(options: ConfigOptions = {}): DynamicModule {
    const providers = [];

    if (options.serviceClass) {
      providers.push(
        {
          provide: options.serviceClass,
          useClass: options.serviceClass,
        },
        {
          provide: ConfigService,
          useExisting: options.serviceClass,
        },
      );
    } else {
      providers.push(ConfigService);
    }

    if (options.nodeEnv) {
      process.env.NODE_CONFIG_ENV = options.nodeEnv;
    }

    if (Array.isArray(options.configDir)) {
      process.env.NODE_CONFIG_DIR = options.configDir.join(':');
    }

    if (typeof options.configDir === 'string') {
      process.env.NODE_CONFIG_DIR = options.configDir;
    }

    if (options.strictMode) {
      process.env.NODE_CONFIG_STRICT_MODE = String(options.strictMode);
    }

    providers.push({
      provide: NODE_CONFIG,
      useFactory: () => {
        const config = require('config');

        if (options.printConfigSources) {
          const sources = config.util
            .getConfigSources()
            .map((source: IConfigSource) => source.name);
          this.LOGGER.log({
            message: 'Using config sources',
            sources,
          });
        }
        return config;
      },
    });

    return {
      module: ConfigModule,
      providers,
      exports: providers,
    };
  }
}
