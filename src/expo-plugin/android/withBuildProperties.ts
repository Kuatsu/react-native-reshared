import { withGradleProperties, type ConfigPlugin } from '@expo/config-plugins';
import type { PropertiesItem } from '@expo/config-plugins/build/android/Properties';
import type { ResharedConfigPluginOptions } from '../types';

const addKotlinVersionBuildProperty = (properties: PropertiesItem[]): PropertiesItem[] => {
  return [
    ...properties,
    {
      type: 'property' as const,
      key: 'kotlinVersion',
      value: '1.6.10',
    },
  ];
};

export const withBuildProperties: ConfigPlugin<ResharedConfigPluginOptions['android']> = (pureConfig) => {
  return withGradleProperties(pureConfig, (config) => {
    config.modResults = addKotlinVersionBuildProperty(config.modResults);
    return config;
  });
};
