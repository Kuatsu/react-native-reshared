import { createRunOncePlugin, withPlugins, type ConfigPlugin } from '@expo/config-plugins';

import { withAppEntitlements } from './withAppEntitlements';
import { withShareExtensionConfig } from './withShareExtensionConfig';
import { withShareExtensionXcodeTarget } from './withShareExtensionXcodeTarget';
import type { RNCloudStorageConfigPluginOptions } from './utils/types';

let pkg: { name: string; version?: string } = {
  name: 'expo-config-plugin-ios-share-extension',
  version: 'UNVERSIONED',
};

const withRNResharedIos: ConfigPlugin<RNCloudStorageConfigPluginOptions> = createRunOncePlugin(
  (config, options) => {
    return withPlugins(config, [
      withAppEntitlements,
      withShareExtensionConfig,
      () => withShareExtensionXcodeTarget(config, options),
    ]);
  },
  pkg.name,
  pkg.version
);

export default withRNResharedIos;
