import { type ConfigPlugin, withXcodeProject } from '@expo/config-plugins';

import { getShareExtensionBundledIdentifier, shareExtensionName } from './utils/constants';
import {
  getShareExtensionEntitlementsFilePath,
  getShareExtensionInfoFilePath,
  getShareExtensionStoryboardFilePath,
  getShareExtensionViewControllerPath,
  writeShareExtensionFiles,
} from './utils/writeShareExtensionFiles';
import type { RNCloudStorageConfigPluginOptions } from './utils/types';

export const withShareExtensionXcodeTarget: ConfigPlugin<RNCloudStorageConfigPluginOptions> = (pureConfig, options) => {
  return withXcodeProject(pureConfig, async (config) => {
    if (!config.scheme || (Array.isArray(config.scheme) && !config.scheme.length)) {
      throw new Error(`Cannot configure the iOS share extension without a scheme configured in the Expo config.`);
    }
    if (!config.version) {
      throw new Error(`Cannot configure the iOS share extension without a version configured in the Expo config.`);
    }
    if (!config.ios?.bundleIdentifier || !config.ios?.buildNumber) {
      throw new Error(
        `Cannot configure the iOS share extension without an iOS bundleIdentifier and buildNumber configured in the Expo config.`
      );
    }

    const extensionName = shareExtensionName;
    const platformProjectRoot = config.modRequest.platformProjectRoot;
    const scheme = config.scheme;
    const appIdentifier = config.ios.bundleIdentifier;
    const shareExtensionIdentifier = getShareExtensionBundledIdentifier(appIdentifier);
    const currentProjectVersion = config.ios.buildNumber;
    const marketingVersion = config.version;

    const infoPlistFilePath = getShareExtensionInfoFilePath(platformProjectRoot);
    const entitlementsFilePath = getShareExtensionEntitlementsFilePath(platformProjectRoot);
    const viewControllerFilePath = getShareExtensionViewControllerPath(platformProjectRoot);
    const storyboardFilePath = getShareExtensionStoryboardFilePath(platformProjectRoot);

    // TODO: Is there a better way to handle multiple schemes?
    await writeShareExtensionFiles(
      platformProjectRoot,
      Array.isArray(scheme) ? scheme[0]! : scheme,
      appIdentifier,
      options?.activationRules
    );

    const pbxProject = config.modResults;

    const target = pbxProject.addTarget(extensionName, 'app_extension', extensionName);

    // Add a new PBXSourcesBuildPhase for our ShareViewController
    // (we can't add it to the existing one because an extension is kind of an extra app)
    pbxProject.addBuildPhase([], 'PBXSourcesBuildPhase', 'Sources', target.uuid);

    // Add a new PBXResourcesBuildPhase for the Resources used by the Share Extension
    // (MainInterface.storyboard)
    pbxProject.addBuildPhase([], 'PBXResourcesBuildPhase', 'Resources', target.uuid);

    // Create a separate PBXGroup for the shareExtension's files
    const pbxGroupKey = pbxProject.pbxCreateGroup(extensionName, extensionName);

    // Add files which are not part of any build phase (plist)
    pbxProject.addFile(infoPlistFilePath, pbxGroupKey);

    // Add source files to our PbxGroup and our newly created PBXSourcesBuildPhase
    pbxProject.addSourceFile(viewControllerFilePath, { target: target.uuid }, pbxGroupKey);

    //  Add the resource file and include it into the target PbxResourcesBuildPhase and PbxGroup
    pbxProject.addResourceFile(storyboardFilePath, { target: target.uuid }, pbxGroupKey);

    var configurations = pbxProject.pbxXCBuildConfigurationSection();
    for (var key in configurations) {
      if (typeof configurations[key].buildSettings !== 'undefined') {
        var buildSettingsObj = configurations[key].buildSettings;
        if (
          typeof buildSettingsObj.PRODUCT_NAME !== 'undefined' &&
          buildSettingsObj.PRODUCT_NAME === `"${extensionName}"`
        ) {
          buildSettingsObj.CLANG_ENABLE_MODULES = 'YES';
          buildSettingsObj.INFOPLIST_FILE = `"${infoPlistFilePath}"`;
          buildSettingsObj.CODE_SIGN_ENTITLEMENTS = `"${entitlementsFilePath}"`;
          buildSettingsObj.CODE_SIGN_STYLE = 'Automatic';
          buildSettingsObj.CURRENT_PROJECT_VERSION = `"${currentProjectVersion}"`;
          buildSettingsObj.GENERATE_INFOPLIST_FILE = 'YES';
          buildSettingsObj.MARKETING_VERSION = `"${marketingVersion}"`;
          buildSettingsObj.PRODUCT_BUNDLE_IDENTIFIER = `"${shareExtensionIdentifier}"`;
          buildSettingsObj.SWIFT_EMIT_LOC_STRINGS = 'YES';
          buildSettingsObj.SWIFT_VERSION = '5.0';
          buildSettingsObj.TARGETED_DEVICE_FAMILY = `"1,2"`;
        }
      }
    }

    return config;
  });
};
