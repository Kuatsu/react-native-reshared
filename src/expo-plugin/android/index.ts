import { withPlugins, type ConfigPlugin } from '@expo/config-plugins';

import { withBuildProperties } from './withBuildProperties';
import { withMainActivityAttributes } from './withMainActivityAttributes';
import { withIntentFilters } from './withIntentFilters';
import { withMainActivityExtension } from './withMainActivityExtension';
import type { ResharedConfigPluginOptions } from '../types';

const withRNResharedAndroid: ConfigPlugin<ResharedConfigPluginOptions['android']> = (config, options) => {
  return withPlugins(config, [
    () => withBuildProperties(config, options),
    () => withMainActivityAttributes(config, options),
    () => withIntentFilters(config, options),
    withMainActivityExtension,
  ]);
};

export default withRNResharedAndroid;
