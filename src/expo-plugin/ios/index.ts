import { withPlugins, type ConfigPlugin } from '@expo/config-plugins';

import { withAppEntitlements } from './withAppEntitlements';
import { withShareExtensionConfig } from './withShareExtensionConfig';
import { withShareExtensionXcodeTarget } from './withShareExtensionXcodeTarget';
import type { ResharedConfigPluginOptions } from '../types';

const withRNResharedIos: ConfigPlugin<ResharedConfigPluginOptions['ios']> = (config, options) => {
  return withPlugins(config, [
    withAppEntitlements,
    withShareExtensionConfig,
    () => withShareExtensionXcodeTarget(config, options),
  ]);
};

export default withRNResharedIos;
