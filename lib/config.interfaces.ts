import { IConfig } from 'config';
import { ConfigService } from './config.service';

export interface ConfigOptions {
  /**
   * Overrides the value of NODE_ENV
   */
  nodeEnv?: string;

  /**
   * Contains the paths to the directories containing your configuration files. You can pass multiple directories.
   * They can be direct paths from the root, or relative paths if they begin with ./ or ../.
   * The default NODE_CONFIG_DIR is the /config directory under the current working directory,
   * usually your application root - the value returned by process.cwd() + '/config'
   */
  configDir?: string | string[];

  /**
   * Whether print or not config sources.
   */
  printConfigSources?: boolean;

  /**
   * When strict mode is enabled, the following conditions must be true or an exception will thrown at require-time:
   *
   * * There must be an explicit config file matching `NODE_ENV` if `NODE_ENV` is set.
   * * There must be an explicit config file matching `NODE_APP_INSTANCE` if `NODE_APP_INSTANCE` is set
   * * `NODE_ENV` must not match 'default' or 'local' to avoid ambiguity.
   */
  strictMode?: boolean;

  serviceClass?: new (config: IConfig) => ConfigService;
}
