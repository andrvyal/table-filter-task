export interface BaseConfig {
  apiUrl: string;
  pageSize: number;
}

export interface EnvironmentConfig extends BaseConfig {
  production: boolean;
}
