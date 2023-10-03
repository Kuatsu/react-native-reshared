import { AndroidConfig, withAndroidManifest, type ConfigPlugin, type AndroidManifest } from '@expo/config-plugins';
import type { AndroidIntentFilter, ResharedConfigPluginOptions } from '../types';

interface RenderedIntentFilter {
  action: string;
  category: string;
  data: { mimeType: string }[];
  autoVerify?: boolean;
}

const renderIntentFilters = (intentFilters: RenderedIntentFilter[]) => {
  return intentFilters.map((intentFilter) => {
    return {
      $: {
        'android:autoVerify': (intentFilter.autoVerify ? 'true' : undefined) as 'true' | 'false' | undefined,
      },
      action: [
        {
          $: {
            'android:name': `${intentFilter.action}`,
          },
        },
      ],
      data: renderIntentFilterData(intentFilter.data),
      category: renderIntentFilterCategory(intentFilter.category),
    };
  });
};

const renderIntentFilterData = (data: RenderedIntentFilter['data']) => {
  return (Array.isArray(data) ? data : [data]).filter(Boolean).map((datum) => ({
    $: Object.entries(datum ?? {}).reduce((prev, [key, value]) => ({ ...prev, [`android:${key}`]: value }), {}),
  }));
};
const renderIntentFilterCategory = (category: RenderedIntentFilter['category']) => {
  return (Array.isArray(category) ? category : [category]).filter(Boolean).map((cat) => ({
    $: {
      'android:name': `${cat}`,
    },
  }));
};

const addIntentFilters = (androidManifest: AndroidManifest, filters?: AndroidIntentFilter[]) => {
  const mainActivity = AndroidConfig.Manifest.getMainActivityOrThrow(androidManifest);
  const newFilters = filters ?? ['text/*'];
  const newIntentFilters: RenderedIntentFilter[] = newFilters.map((filter) => ({
    action: 'android.intent.action.SEND',
    category: 'android.intent.category.DEFAULT',
    data: [
      {
        mimeType: filter,
      },
    ],
  }));
  const renderedNewIntentFilters = renderIntentFilters(newIntentFilters);

  // add new intent filters to the manifest
  const currentIntentFilters = mainActivity['intent-filter'] ?? [];
  mainActivity['intent-filter'] = currentIntentFilters.concat(renderedNewIntentFilters);
  return androidManifest;
};

export const withIntentFilters: ConfigPlugin<ResharedConfigPluginOptions['android']> = (pureConfig, options) => {
  return withAndroidManifest(pureConfig, (config) => {
    config.modResults = addIntentFilters(config.modResults, options?.intentFilters);
    return config;
  });
};
