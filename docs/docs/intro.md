---
sidebar_position: 1
---

# Introduction

:::caution

This project is still considered unstable. The API might change drastically in new versions. Please proceed with caution and report any issues you're encountering.

:::

`react-native-reshared` allows you to receive data from other apps on both Android and iOS through a [Share Sheet](https://developer.apple.com/design/human-interface-guidelines/ios/extensions/sharing-and-actions/) or [Share Menu](https://developer.android.com/training/sharing/receive) (depending on the platform) to your React Native app. It's fully compatible with Expo using a [config plugin](https://docs.expo.dev/guides/config-plugins/).

This project is heavily based on some great, though mostly unmaintained libraries:

- [react-native-receive-sharing-intent](https://github.com/ajith-ab/react-native-receive-sharing-intent)
- [expo-config-plugin-ios-share-extension](https://github.com/timedtext/expo-config-plugin-ios-share-extension)
- [expo-share-intent-demo](https://github.com/achorein/expo-share-intent-demo)

The codebases of these libraries were used as a starting point for this project. They have been merged together, updated, cleaned up, documented and extended with new features.
