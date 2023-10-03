import type { RNCloudStorageConfigPluginOptions } from './ios/utils/types';
import withRNResharedIos from './ios/withRNResharedIos';
import type { ConfigPlugin } from '@expo/config-plugins';

// TODO: Android config plugin

const withRNReshared: ConfigPlugin<RNCloudStorageConfigPluginOptions> = (config, options) =>
  withRNResharedIos(config, options);

export default withRNReshared;
