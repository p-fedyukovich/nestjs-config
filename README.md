# NestJS Node Config Module

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

### Node Config

[Node.js Application Configuration](https://github.com/node-config/node-config) organizes hierarchical configurations
for your app deployments.

It lets you define a set of default parameters, and extend them for different deployment environments (development, qa,
staging, production, etc.).

#### Installation

To start using Node Config module, first install the required packages:

```bash
$ npm i --save config nestjs-node-config-module
```

#### Overview

To use the config module, add `ConfigModule` import:

```typescript
import { ConfigModule } from "nestjs-node-config-module";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {
}
```

Then you can inject config service:

```typescript
import { ConfigService } from "nestjs-node-config-module";

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {
  }

  getFoo(): string {
    return this.configService.get('foo');
  }
}
```

#### Options

Config module accepts optional `options` parameter, parameters are described below:

<table>
  <tr>
    <td><code>nodeEnv</code></td>
    <td>Overrides the value of NODE_ENV</td>
  </tr>  
  <tr>
    <td><code>configDir</code></td>
    <td>Contains the paths to the directories containing your configuration files.</td>
  </tr>
  <tr>
    <td><code>printConfigSources</code></td>
    <td>If true prints config source on module setup</td>
  </tr>
  <tr>
    <td><code>strictMode</code></td>
    <td>Strict mode (read more <a href="https://github.com/node-config/node-config/wiki/Environment-Variables#node_config_strict_mode" rel="nofollow" target="_blank">here</a>)</td>
  </tr>
    <td><code>configService</code></td>
    <td>Class that extends default ConfigService, you can use it to have all settings in one place</td>
  <tr>
</table>

### ConfigService

You can extend default config service with your one, for example:

```typescript
import { ConfigService } from "nestjs-node-config-module";

@Injectable()
class MyConfigService extends ConfigService {
  getFoo(): string {
    return this.get<string>('foo')
  }
}
```

Then you have to register it by passing class to Config Module: 

```typescript
import { ConfigModule } from "nestjs-node-config-module";

@Module({
  imports: [ConfigModule.forRoot({
    configService: MyConfigService
  })],
  controllers: [],
  providers: [],
})
export class AppModule {
}
```

And now it's accessible in nest IoC container: 

```typescript
import { MyConfigService } from "./my-config.service";

@Injectable()
export class AppService {
  constructor(private configService: MyConfigService) {
  }

  getFoo(): string {
    return this.configService.getFoo();
  }
}
```

NOTE: default `ConfigService` is still available and can be injected.
