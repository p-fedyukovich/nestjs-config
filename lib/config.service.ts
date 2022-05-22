import { Inject, Injectable } from '@nestjs/common';
import { IConfig, IUtil } from 'config';
import {
  DEVELOPMENT,
  NODE_CONFIG,
  NODE_ENV,
  PROD,
  PRODUCTION,
  STAGE,
  STAGING,
  TEST,
} from './config.constants';

@Injectable()
export class ConfigService implements IConfig {
  constructor(@Inject(NODE_CONFIG) private readonly config: IConfig) {}

  get<T>(setting: string): T {
    return this.config.get<T>(setting);
  }

  has(setting: string): boolean {
    return this.config.has(setting);
  }

  get util(): IUtil {
    return this.config.util;
  }

  getNodeEnv(): string {
    return this.util.getEnv(NODE_ENV) || DEVELOPMENT;
  }

  isProduction(): boolean {
    return [PROD, PRODUCTION].includes(this.getNodeEnv());
  }

  isStaging(): boolean {
    return [STAGE, STAGING].includes(this.getNodeEnv());
  }

  isTest(): boolean {
    return this.getNodeEnv() === TEST;
  }

  isDevelopment(): boolean {
    return this.getNodeEnv() === DEVELOPMENT;
  }
}
