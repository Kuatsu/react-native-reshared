import withRNResharedIos from './ios';
import { createRunOncePlugin, type ConfigPlugin, withPlugins } from '@expo/config-plugins';
import withRNResharedAndroid from './android';
import type { ResharedConfigPluginOptions } from './types';

// TODO: Unversioned plugins are deprecated / regarded as legacy plugins
const pkg: { name: string; version?: string } = {
  name: 'react-native-reshared',
  version: 'UNVERSIONED',
};

const withRNReshared: ConfigPlugin<ResharedConfigPluginOptions> = createRunOncePlugin(
  (config, options) => {
    return withPlugins(config, [
      () => withRNResharedIos(config, options.ios),
      () => withRNResharedAndroid(config, options.android),
    ]);
  },
  pkg.name,
  pkg.version
);

export default withRNReshared;
