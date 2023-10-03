import { type ConfigPlugin, withEntitlementsPlist } from '@expo/config-plugins';

import { getAppGroups } from './utils/constants';

export const withAppEntitlements: ConfigPlugin = (pureConfig) => {
  return withEntitlementsPlist(pureConfig, async (config) => {
    const appIdentifier = config.ios?.bundleIdentifier!;
    config.modResults['com.apple.security.application-groups'] = getAppGroups(appIdentifier);
    return config;
  });
};
