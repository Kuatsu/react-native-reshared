import { withAndroidManifest, type ConfigPlugin, type AndroidManifest } from '@expo/config-plugins';
import type { ResharedConfigPluginOptions } from '../types';

const addMainActivityAttributes = (
  androidManifest: AndroidManifest,
  attributes?: NonNullable<ResharedConfigPluginOptions['android']>['mainActivityAttributes']
) => {
  const { manifest } = androidManifest;
  if (!Array.isArray(manifest.application)) {
    throw new Error('Reshared: No application array in Android manifest found');
  }

  const application = manifest.application.find((item) => item.$['android:name'] === '.MainApplication');
  if (!application) {
    throw new Error('Reshared: No .MainApplication found in Android manifest');
  }

  if (!Array.isArray(application.activity)) {
    throw new Error('Reshared: No activity array in Android manifest found');
  }

  const activity = application.activity.find((item) => item.$['android:name'] === '.MainActivity');
  if (!activity) {
    throw new Error('Reshared: No .MainActivity found in Android manifest');
  }

  const newAttributes = attributes ?? {
    'android:launchMode': 'singleTask',
  };
  activity.$ = { ...activity.$, ...newAttributes };

  return androidManifest;
};

export const withMainActivityAttributes: ConfigPlugin<ResharedConfigPluginOptions['android']> = (
  pureConfig,
  options
) => {
  return withAndroidManifest(pureConfig, (config) => {
    config.modResults = addMainActivityAttributes(config.modResults, options?.mainActivityAttributes);
    return config;
  });
};
