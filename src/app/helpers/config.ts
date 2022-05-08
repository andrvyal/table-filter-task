export interface BaseConfig {
  apiUrl: string;
}

export interface EnvironmentConfig extends BaseConfig {
  production: boolean;
}
